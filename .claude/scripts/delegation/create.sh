#!/bin/bash
# .claude/scripts/delegation/create.sh
# Create a delegation session for subagent context bundling
#
# Delegation sessions are ephemeral (.tmp/) - for passing context to subagents
# within a single Claude conversation. For cross-session persistence, use sessions/

set -euo pipefail

TASK_SLUG=""
TASK_ID=""
BRANCH=""

while [[ $# -gt 0 ]]; do
  case $1 in
    --task)
      TASK_ID="$2"
      shift 2
      ;;
    --branch)
      BRANCH="$2"
      shift 2
      ;;
    --help|-h)
      echo "Usage: create.sh <task-slug> [--task <id>] [--branch <name>]"
      echo ""
      echo "Creates ephemeral delegation session in .tmp/sessions/"
      echo "For agent-to-agent context passing within a conversation."
      exit 0
      ;;
    *)
      TASK_SLUG="$1"
      shift
      ;;
  esac
done

if [[ -z "$TASK_SLUG" ]]; then
  echo "Error: task-slug required" >&2
  echo "Usage: create.sh <task-slug> [--task <id>] [--branch <name>]" >&2
  exit 1
fi

# Default branch to current
if [[ -z "$BRANCH" ]]; then
  BRANCH=$(git branch --show-current 2>/dev/null || echo "N/A")
fi

# Generate session ID: YYYYMMDD-HHMMSS-random
SESSION_ID=$(date +%Y%m%d-%H%M%S)-$(openssl rand -hex 2)
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# Create session directory
SESSION_DIR=".tmp/sessions/$SESSION_ID"
mkdir -p "$SESSION_DIR"

# Create manifest
cat > "$SESSION_DIR/manifest.json" << EOF
{
  "session_id": "$SESSION_ID",
  "task_slug": "$TASK_SLUG",
  "task_id": ${TASK_ID:+\"$TASK_ID\"}${TASK_ID:-null},
  "branch": "$BRANCH",
  "status": "active",
  "created": "$TIMESTAMP",
  "last_activity": "$TIMESTAMP",
  "files": ["context.md"]
}
EOF

# Create context template (Toon format, 50-150 lines target)
cat > "$SESSION_DIR/context.md" << EOF
# Context: $TASK_SLUG

session{id,task,branch}:
  $SESSION_ID,${TASK_ID:-none},$BRANCH

## Request
(1-2 sentence task description)

## Specs
specs[]:
  path/to/spec.md

## Files
modify[]{path,action}:
  path/to/file.ts,what-to-change

reference[]{path,why}:
  path/to/example.ts,pattern-to-follow

## Constraints
constraints[]:
  (limitations or requirements)

## Expected Return
Return Toon format:
\`\`\`
result{status,action}:
  success,continue | blocked,needs-input | failed,reason

findings[]:
  (discoveries)

files_modified[]{path,change}:
  (what changed)
\`\`\`
EOF

echo "$SESSION_ID"
