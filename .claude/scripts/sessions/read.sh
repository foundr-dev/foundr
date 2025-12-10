#!/bin/bash
# .claude/scripts/sessions/read.sh
# Read a session file by branch name

set -euo pipefail

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" || -z "${1:-}" ]]; then
  echo "Usage: read.sh <branch>"
  echo "  Display contents of a session file"
  exit 0
fi

BRANCH="$1"
MAIN_WORKTREE=$(git worktree list | head -1 | awk '{print $1}')
SESSION_FILE="$MAIN_WORKTREE/.claude/sessions/$BRANCH.md"

if [[ ! -f "$SESSION_FILE" ]]; then
  echo "Session not found: $BRANCH" >&2
  echo "Use 'list.sh' to see available sessions" >&2
  exit 1
fi

cat "$SESSION_FILE"
