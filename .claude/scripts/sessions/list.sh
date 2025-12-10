#!/bin/bash
# .claude/scripts/sessions/list.sh
# List all session files with their status
#
# Usage: list.sh [--orphans-only] [--json] [--quiet]
#
# Output: STATUS BRANCH TASK CREATED
# Status: ACTIVE (branch exists) | ORPHAN (branch gone) | CURRENT (current branch)

set -euo pipefail

MAIN_WORKTREE=$(git worktree list | head -1 | awk '{print $1}')
SESSIONS_DIR="$MAIN_WORKTREE/.claude/sessions"
CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || echo "")

ORPHANS_ONLY=false
JSON_OUTPUT=false
QUIET=false

while [[ $# -gt 0 ]]; do
  case $1 in
    --orphans-only) ORPHANS_ONLY=true; shift ;;
    --json) JSON_OUTPUT=true; shift ;;
    --quiet|-q) QUIET=true; shift ;;
    --help|-h)
      echo "Usage: list.sh [--orphans-only] [--json] [--quiet]"
      echo ""
      echo "Options:"
      echo "  --orphans-only  Only show sessions where branch no longer exists"
      echo "  --json          Output as JSON array"
      echo "  --quiet         Only output branch names"
      exit 0
      ;;
    *) shift ;;
  esac
done

# Check if sessions directory exists
if [[ ! -d "$SESSIONS_DIR" ]]; then
  if $JSON_OUTPUT; then
    echo "[]"
  elif ! $QUIET; then
    echo "No sessions found (directory doesn't exist)"
  fi
  exit 0
fi

# Count sessions
SESSION_COUNT=$(find "$SESSIONS_DIR" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')

if [[ "$SESSION_COUNT" -eq 0 ]]; then
  if $JSON_OUTPUT; then
    echo "[]"
  elif ! $QUIET; then
    echo "No sessions found"
  fi
  exit 0
fi

# Function to check if branch exists
branch_exists() {
  local branch="$1"
  # Check local branches
  if git branch --list "$branch" | grep -q .; then
    return 0
  fi
  # Check worktrees
  if git worktree list | grep -q "\[$branch\]"; then
    return 0
  fi
  return 1
}

# Function to extract field from session file
extract_field() {
  local file="$1"
  local field="$2"
  grep -E "^\- \*\*$field\*\*:" "$file" 2>/dev/null | sed "s/.*\*\*$field\*\*: //" || echo ""
}

# Build output
if $JSON_OUTPUT; then
  echo "["
  FIRST=true
fi

for session in "$SESSIONS_DIR"/*.md; do
  [[ -f "$session" ]] || continue

  BRANCH=$(basename "$session" .md)
  TASK=$(extract_field "$session" "Task")
  CREATED=$(extract_field "$session" "Created")
  STATUS_FIELD=$(extract_field "$session" "Status")

  # Determine status
  if [[ "$BRANCH" == "$CURRENT_BRANCH" ]]; then
    STATUS="CURRENT"
  elif branch_exists "$BRANCH"; then
    STATUS="ACTIVE"
  else
    STATUS="ORPHAN"
  fi

  # Filter if orphans-only
  if $ORPHANS_ONLY && [[ "$STATUS" != "ORPHAN" ]]; then
    continue
  fi

  if $QUIET; then
    echo "$BRANCH"
  elif $JSON_OUTPUT; then
    if ! $FIRST; then echo ","; fi
    FIRST=false
    printf '  {"branch": "%s", "status": "%s", "task": "%s", "created": "%s", "task_status": "%s"}' \
      "$BRANCH" "$STATUS" "$TASK" "$CREATED" "$STATUS_FIELD"
  else
    printf "%-8s %-40s %-15s %s\n" "$STATUS" "$BRANCH" "$TASK" "$CREATED"
  fi
done

if $JSON_OUTPUT; then
  echo ""
  echo "]"
fi
