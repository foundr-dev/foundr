#!/usr/bin/env bash
# Git Safety Hints Hook (PreToolUse)
# Suggests safer git practices before potentially destructive commands.
#
# Input: JSON via $1 with tool_input.command
# Output: JSON with systemMessage if safety hint needed

set -e

# Parse command from JSON input
COMMAND=$(echo "$1" | grep -o '"command":"[^"]*"' | sed 's/"command":"//;s/"$//' 2>/dev/null || echo "")

# Exit silently if no command or not a git command
[[ -z "$COMMAND" ]] && exit 0
[[ "$COMMAND" != *"git "* ]] && exit 0

HINTS=""

# Force push without lease
if [[ "$COMMAND" == *"--force"* ]] && [[ "$COMMAND" != *"--force-with-lease"* ]]; then
  HINTS="${HINTS}  - Consider using --force-with-lease instead of --force for safer force pushing\n"
fi

# git reset --hard
if [[ "$COMMAND" == *"reset"* ]] && [[ "$COMMAND" == *"--hard"* ]]; then
  HINTS="${HINTS}  - git reset --hard discards uncommitted changes. Consider stashing first: git stash\n"
fi

# git clean without dry-run
if [[ "$COMMAND" == *"clean"* ]] && [[ "$COMMAND" != *"-n"* ]] && [[ "$COMMAND" != *"--dry-run"* ]]; then
  HINTS="${HINTS}  - Consider running with -n (dry-run) first to preview files that will be deleted\n"
fi

# git branch -D (force delete)
if [[ "$COMMAND" == *"branch"* ]] && [[ "$COMMAND" == *"-D"* ]]; then
  HINTS="${HINTS}  - Using -D force deletes branch regardless of merge status. Use -d for safer deletion\n"
fi

# git push to main/master
if [[ "$COMMAND" == *"push"* ]] && { [[ "$COMMAND" == *"main"* ]] || [[ "$COMMAND" == *"master"* ]]; }; then
  HINTS="${HINTS}  - Pushing directly to main/master. Consider creating a PR instead for code review\n"
fi

# Output hint if any
if [[ -n "$HINTS" ]]; then
  MESSAGE="Git Safety Hints:\n${HINTS}"
  # Escape for JSON
  MESSAGE=$(echo -e "$MESSAGE" | sed 's/"/\\"/g' | tr '\n' ' ' | sed 's/  */ /g')
  echo "{\"systemMessage\": \"$MESSAGE\"}"
fi
