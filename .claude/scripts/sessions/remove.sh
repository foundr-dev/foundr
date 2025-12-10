#!/bin/bash
# .claude/scripts/sessions/remove.sh
# Remove a session file by branch name

set -euo pipefail

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" || -z "${1:-}" ]]; then
  echo "Usage: remove.sh <branch>"
  echo "  Remove a session file"
  exit 0
fi

BRANCH="$1"
MAIN_WORKTREE=$(git worktree list | head -1 | awk '{print $1}')
SESSION_FILE="$MAIN_WORKTREE/.claude/sessions/$BRANCH.md"

if [[ ! -f "$SESSION_FILE" ]]; then
  echo "Session not found: $BRANCH" >&2
  exit 1
fi

rm "$SESSION_FILE"
echo "Removed: $SESSION_FILE"
