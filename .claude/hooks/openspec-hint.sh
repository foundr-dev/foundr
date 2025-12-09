#!/bin/bash
# OpenSpec Hint Hook
# Triggered on user_prompt_submit to suggest OpenSpec for changes
#
# This hook checks if the user's prompt suggests they're about to make
# significant changes and reminds them to consider using OpenSpec.

# Keywords that suggest significant changes
CHANGE_KEYWORDS=(
  "add"
  "implement"
  "create"
  "build"
  "refactor"
  "redesign"
  "architecture"
  "breaking"
  "migrate"
  "change"
  "new feature"
  "new command"
  "new agent"
)

# Keywords that suggest they're already using OpenSpec
OPENSPEC_KEYWORDS=(
  "openspec"
  "spec"
  "proposal"
  "change/"
  "changes/"
)

# Read the user's prompt from stdin
PROMPT=$(cat)
PROMPT_LOWER=$(echo "$PROMPT" | tr '[:upper:]' '[:lower:]')

# Check if already mentioning OpenSpec
for keyword in "${OPENSPEC_KEYWORDS[@]}"; do
  if [[ "$PROMPT_LOWER" == *"$keyword"* ]]; then
    # Already using OpenSpec, no hint needed
    exit 0
  fi
done

# Check for change-suggesting keywords
for keyword in "${CHANGE_KEYWORDS[@]}"; do
  if [[ "$PROMPT_LOWER" == *"$keyword"* ]]; then
    echo "---"
    echo "💡 This looks like a significant change. Consider using OpenSpec:"
    echo "   /openspec:proposal - Create a change proposal first"
    echo "   See openspec/AGENTS.md for workflow details"
    echo "---"
    exit 0
  fi
done

# No hints needed
exit 0
