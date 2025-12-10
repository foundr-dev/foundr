#!/usr/bin/env bash
# Bash Failure Detection Hook (PostToolUse)
# Detects when bash commands fail and provides helpful context.
#
# Input: JSON via $1 with tool_input and tool_output
# Output: JSON with systemMessage if failure detected

set -e

INPUT="$1"
[[ -z "$INPUT" ]] && exit 0

# Parse exit code - look for exit_code in the JSON
EXIT_CODE=$(echo "$INPUT" | grep -o '"exit_code":[0-9]*' | grep -o '[0-9]*' 2>/dev/null || echo "0")

# Exit silently if success
[[ "$EXIT_CODE" == "0" ]] && exit 0

# Parse command and stderr
COMMAND=$(echo "$INPUT" | grep -o '"command":"[^"]*"' | sed 's/"command":"//;s/"$//' 2>/dev/null || echo "")
STDERR=$(echo "$INPUT" | grep -o '"stderr":"[^"]*"' | sed 's/"stderr":"//;s/"$//' 2>/dev/null || echo "")

SUGGESTIONS=""

# Permission denied
if [[ "$STDERR" == *"Permission denied"* ]]; then
  SUGGESTIONS="${SUGGESTIONS}  - Check file permissions or try with appropriate access\n"
fi

# Command not found
if [[ "$STDERR" == *"command not found"* ]] || [[ "$STDERR" == *"not found"* ]]; then
  CMD_NAME=$(echo "$COMMAND" | cut -d' ' -f1)
  SUGGESTIONS="${SUGGESTIONS}  - Ensure '${CMD_NAME}' is installed and in PATH\n"
fi

# Git errors
if [[ "$COMMAND" == "git "* ]]; then
  if [[ "$STDERR" == *"not a git repository"* ]]; then
    SUGGESTIONS="${SUGGESTIONS}  - Initialize git repository with 'git init'\n"
  fi
  if [[ "$STDERR" == *"nothing to commit"* ]]; then
    SUGGESTIONS="${SUGGESTIONS}  - No changes to commit - this may be expected\n"
  fi
  if [[ "$STDERR" == *"conflict"* ]]; then
    SUGGESTIONS="${SUGGESTIONS}  - Resolve merge conflicts before continuing\n"
  fi
fi

# npm/bun errors
if [[ "$COMMAND" == *"npm "* ]] || [[ "$COMMAND" == *"bun "* ]]; then
  if [[ "$STDERR" == *"ENOENT"* ]]; then
    SUGGESTIONS="${SUGGESTIONS}  - Check that the file or package exists\n"
  fi
  if [[ "$STDERR" == *"peer dep"* ]]; then
    SUGGESTIONS="${SUGGESTIONS}  - Peer dependency issue - may need manual resolution\n"
  fi
fi

# TypeScript errors
if [[ "$STDERR" == *"error TS"* ]]; then
  SUGGESTIONS="${SUGGESTIONS}  - TypeScript compilation errors detected\n"
fi

# Output message if any suggestions
if [[ -n "$SUGGESTIONS" ]]; then
  # Truncate command if too long
  if [[ ${#COMMAND} -gt 100 ]]; then
    COMMAND="${COMMAND:0:100}..."
  fi

  MESSAGE="Command failed (exit ${EXIT_CODE}):\nCommand: ${COMMAND}\n\nSuggestions:\n${SUGGESTIONS}"
  # Escape for JSON
  MESSAGE=$(echo -e "$MESSAGE" | sed 's/"/\\"/g' | tr '\n' ' ' | sed 's/  */ /g')
  echo "{\"systemMessage\": \"$MESSAGE\"}"
fi
