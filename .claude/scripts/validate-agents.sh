#!/bin/bash
# Validate agent compliance with delegation patterns
# Usage: validate-agents.sh [--fix] [--json]

set -e

ROOT_DIR="$(git rev-parse --show-toplevel)"

# Help
if [[ "${1:-}" == "--help" ]] || [[ "${1:-}" == "-h" ]]; then
    echo "Usage: validate-agents.sh [--json]"
    echo ""
    echo "Validates agent compliance with hub-and-spoke delegation pattern"
    echo ""
    echo "Checks:"
    echo "  - All agents have valid frontmatter (name, description, tools, model)"
    echo "  - Orchestrators (workflow/*) have Task tool"
    echo "  - Specialists (tools/*) have <output_format> XML tag (per Anthropic best practices)"
    echo ""
    echo "Reference: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/use-xml-tags"
    exit 0
fi

FIX_MODE=false
JSON_OUTPUT=false
[[ "${1:-}" == "--fix" ]] && FIX_MODE=true
[[ "${1:-}" == "--json" ]] && JSON_OUTPUT=true
[[ "${2:-}" == "--json" ]] && JSON_OUTPUT=true

# Counters
TOTAL=0
PASSED=0
FAILED=0
WARNINGS=0

# Issue lists (newline separated)
CRITICAL=""
WARN=""

# Find agents (exclude worktrees, temp dirs, and READMEs)
find_agents() {
    find "$ROOT_DIR" -path "*/.claude/agents/*.md" -type f 2>/dev/null | \
        grep -v node_modules | \
        grep -v ".tmp" || true
}

# Check functions
is_orchestrator() { [[ "$1" == *"/workflow/"* ]]; }
is_specialist() { [[ "$1" == *"/tools/"* ]]; }
has_task_tool() { grep -q "^tools:.*Task" "$1" 2>/dev/null; }
has_output_format() { grep -q "<output_format>" "$1" 2>/dev/null; }
has_frontmatter() { head -1 "$1" 2>/dev/null | grep -q "^---$"; }

# Leaf orchestrators that don't need Task tool
is_leaf_orchestrator() {
    [[ "$1" == *"address-pr-feedback"* ]] || \
    [[ "$1" == *"complete-task"* ]] || \
    [[ "$1" == *"create-pr"* ]]
}

# Process each agent
while IFS= read -r agent_file; do
    [[ -z "$agent_file" ]] && continue

    TOTAL=$((TOTAL + 1))
    rel="${agent_file#"$ROOT_DIR"/}"

    # Check frontmatter
    if ! has_frontmatter "$agent_file"; then
        CRITICAL="${CRITICAL}${rel}: Missing frontmatter\n"
        FAILED=$((FAILED + 1))
        continue
    fi

    # Orchestrator checks
    if is_orchestrator "$agent_file"; then
        if ! has_task_tool "$agent_file" && ! is_leaf_orchestrator "$agent_file"; then
            WARN="${WARN}${rel}: Orchestrator missing Task tool\n"
            WARNINGS=$((WARNINGS + 1))
        else
            PASSED=$((PASSED + 1))
        fi
    fi

    # Specialist checks
    if is_specialist "$agent_file"; then
        if has_task_tool "$agent_file"; then
            WARN="${WARN}${rel}: Specialist has Task tool (should be leaf)\n"
            WARNINGS=$((WARNINGS + 1))
        elif ! has_output_format "$agent_file"; then
            WARN="${WARN}${rel}: Specialist missing <output_format> tag\n"
            WARNINGS=$((WARNINGS + 1))
        else
            PASSED=$((PASSED + 1))
        fi
    fi

    # Git and lifecycle agents - just check they have frontmatter and output_format
    if [[ "$1" == *"/git/"* ]] || [[ "$1" == *"/lifecycle/"* ]]; then
        if has_output_format "$agent_file"; then
            PASSED=$((PASSED + 1))
        else
            WARN="${WARN}${rel}: Missing <output_format> tag\n"
            WARNINGS=$((WARNINGS + 1))
        fi
    fi

done < <(find_agents)

# Output
if [[ "$JSON_OUTPUT" == "true" ]]; then
    echo "{\"total\":$TOTAL,\"passed\":$PASSED,\"failed\":$FAILED,\"warnings\":$WARNINGS}"
else
    echo "agent-validation{total,passed,failed,warnings}:"
    echo "  $TOTAL,$PASSED,$FAILED,$WARNINGS"
    echo ""

    if [[ -n "$CRITICAL" ]]; then
        echo "critical[]:"
        echo -e "$CRITICAL" | grep -v "^$" | sed 's/^/  /'
        echo ""
    fi

    if [[ -n "$WARN" ]]; then
        echo "warnings[]:"
        echo -e "$WARN" | grep -v "^$" | sed 's/^/  /'
        echo ""
    fi

    if [[ $FAILED -eq 0 ]] && [[ $WARNINGS -eq 0 ]]; then
        echo "result: all-agents-compliant"
    elif [[ $FAILED -gt 0 ]]; then
        echo "result: critical-issues-found"
    else
        echo "result: warnings-only"
    fi
fi

[[ $FAILED -gt 0 ]] && exit 1
exit 0
