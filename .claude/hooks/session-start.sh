#!/usr/bin/env bash
# Session Start Hook
# Validates environment and shows welcome message when Claude session starts.
#
# Output: JSON with systemMessage field

set -e

ERRORS=""
FIXES=""

# Check bun
if ! command -v bun &>/dev/null && [[ ! -x "$HOME/.bun/bin/bun" ]]; then
  ERRORS="${ERRORS}[MISSING] bun CLI not found\n"
  FIXES="${FIXES}  Fix: Install from https://bun.sh\n\n"
fi

# Check git
if ! command -v git &>/dev/null; then
  ERRORS="${ERRORS}[MISSING] git CLI not found\n"
  FIXES="${FIXES}  Fix: Install from https://git-scm.com/downloads\n\n"
fi

# Check gh CLI
if ! command -v gh &>/dev/null; then
  ERRORS="${ERRORS}[MISSING] gh CLI not found\n"
  FIXES="${FIXES}  Fix: Install from https://cli.github.com then run: gh auth login\n\n"
elif ! gh auth status &>/dev/null 2>&1; then
  ERRORS="${ERRORS}[MISSING] gh CLI not authenticated\n"
  FIXES="${FIXES}  Fix: Run: gh auth login\n\n"
fi

# Check node_modules
if [[ ! -d "node_modules" ]]; then
  ERRORS="${ERRORS}[MISSING] Dependencies not installed\n"
  FIXES="${FIXES}  Fix: Run: bun install\n\n"
fi

# Build output message
if [[ -n "$ERRORS" ]]; then
  MSG="⚠️  ENVIRONMENT SETUP REQUIRED  ⚠️\n"
  MSG="${MSG}========================================\n\n"
  MSG="${MSG}${ERRORS}\n${FIXES}"
  MSG="${MSG}========================================\n"
  MSG="${MSG}Run 'bun install' to set up dependencies"
else
  # Environment OK - show welcome
  MSG="========================================\n"
  MSG="${MSG}  foundr - AI Development Infrastructure\n"
  MSG="${MSG}========================================\n\n"
  MSG="${MSG}Quick Start:\n"

  # Check if we're at repo root
  if [[ -f "CLAUDE.md" ]] || [[ -d "src/" ]]; then
    MSG="${MSG}  /commit        - Create conventional commit\n"
    MSG="${MSG}  /ship          - Commit, push, and create PR\n"
    MSG="${MSG}  /resume        - Resume from saved session\n"
    MSG="${MSG}  /save-context  - Save context before compaction\n"
  else
    MSG="${MSG}  cd to repo root for full functionality\n"
  fi

  MSG="${MSG}\n"
  MSG="${MSG}Run /help for all available commands.\n"
  MSG="${MSG}========================================"
fi

# Escape for JSON and output (BSD/macOS compatible)
MSG=$(echo -e "$MSG" | sed 's/"/\\"/g' | awk '{printf "%s\\n", $0}' | sed 's/\\n$//')
echo "{\"systemMessage\": \"$MSG\"}"
