#!/bin/bash
# .claude/scripts/sessions/create.sh
# Create a new session context file in the main worktree
#
# Sessions persist across Claude conversations for multi-day tasks

set -euo pipefail

# Handle --help
if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  echo "usage: create.sh <branch> <title> [--task <id>] [--summary <text>]"
  echo "  Create a new session context file in the main worktree"
  echo ""
  echo "arguments:"
  echo "  branch      Git branch name"
  echo "  title       Session title"
  echo ""
  echo "options:"
  echo "  --task <id>         Task manager ID (Asana, Linear, etc.)"
  echo "  --summary <text>    Task summary text"
  echo ""
  echo "output: Created session file path"
  exit 0
fi

# Get main worktree (first in list)
MAIN_WORKTREE=$(git worktree list | head -1 | awk '{print $1}')
SESSIONS_DIR="$MAIN_WORKTREE/.claude/sessions"

# Parse arguments
BRANCH=""
TITLE=""
TASK_ID=""
SUMMARY=""

while [[ $# -gt 0 ]]; do
  case $1 in
    --task)
      TASK_ID="$2"
      shift 2
      ;;
    --summary)
      SUMMARY="$2"
      shift 2
      ;;
    *)
      if [[ -z "$BRANCH" ]]; then
        BRANCH="$1"
      elif [[ -z "$TITLE" ]]; then
        TITLE="$1"
      fi
      shift
      ;;
  esac
done

# Validate required args
if [[ -z "$BRANCH" || -z "$TITLE" ]]; then
  echo "Usage: create.sh <branch> <title> [--task <id>] [--summary <text>]" >&2
  exit 1
fi

# Ensure sessions directory exists
mkdir -p "$SESSIONS_DIR"

# Generate timestamp
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# Session file path
SESSION_FILE="$SESSIONS_DIR/$BRANCH.md"

# Check if session already exists
if [[ -f "$SESSION_FILE" ]]; then
  echo "Session already exists: $SESSION_FILE" >&2
  echo "Use 'read.sh $BRANCH' to view or 'remove.sh $BRANCH' to delete" >&2
  exit 1
fi

# Default summary if not provided
if [[ -z "$SUMMARY" ]]; then
  SUMMARY="(See task for details)"
fi

# Create session file
cat > "$SESSION_FILE" << EOF
# Session: $TITLE

- **Created**: $TIMESTAMP
- **Branch**: $BRANCH
- **Task**: ${TASK_ID:-(none)}
- **Status**: exploring

## Task Summary
$SUMMARY

## Progress
- [ ] Review task requirements
- [ ] Explore codebase
- [ ] Implement changes
- [ ] Write tests

## Key Decisions
(none yet)

## Files Modified
(none yet)

## Context Snapshots
<!-- Pre-compaction snapshots saved automatically -->

## Notes
Session started on $TIMESTAMP
EOF

echo "Created: $SESSION_FILE"
