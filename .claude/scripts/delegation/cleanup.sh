#!/bin/bash
# .claude/scripts/delegation/cleanup.sh
# Clean up delegation sessions
#
# Usage: cleanup.sh [--completed] [--stale <hours>] [--session <id>] [--all]

set -euo pipefail

SESSIONS_DIR=".tmp/sessions"

CLEAN_COMPLETED=false
STALE_HOURS=0
SPECIFIC_SESSION=""
CLEAN_ALL=false

while [[ $# -gt 0 ]]; do
  case $1 in
    --completed) CLEAN_COMPLETED=true; shift ;;
    --stale)
      STALE_HOURS="$2"
      shift 2
      ;;
    --session)
      SPECIFIC_SESSION="$2"
      shift 2
      ;;
    --all) CLEAN_ALL=true; shift ;;
    --help|-h)
      echo "Usage: cleanup.sh [--completed] [--stale <hours>] [--session <id>] [--all]"
      echo ""
      echo "Options:"
      echo "  --completed       Remove sessions with status 'completed'"
      echo "  --stale <hours>   Remove sessions older than N hours"
      echo "  --session <id>    Remove specific session by ID"
      echo "  --all             Remove all delegation sessions"
      exit 0
      ;;
    *) shift ;;
  esac
done

if [[ ! -d "$SESSIONS_DIR" ]]; then
  echo "No delegation sessions found"
  exit 0
fi

# Remove specific session
if [[ -n "$SPECIFIC_SESSION" ]]; then
  SESSION_PATH="$SESSIONS_DIR/$SPECIFIC_SESSION"
  if [[ -d "$SESSION_PATH" ]]; then
    rm -rf "$SESSION_PATH"
    echo "Removed: $SPECIFIC_SESSION"
  else
    echo "Session not found: $SPECIFIC_SESSION" >&2
    exit 1
  fi
  exit 0
fi

# Remove all
if $CLEAN_ALL; then
  COUNT=$(find "$SESSIONS_DIR" -mindepth 1 -maxdepth 1 -type d | wc -l | tr -d ' ')
  rm -rf "$SESSIONS_DIR"/*
  echo "Removed $COUNT delegation session(s)"
  exit 0
fi

# Clean by criteria
REMOVED=0
NOW=$(date +%s)

for session_dir in "$SESSIONS_DIR"/*/; do
  [[ -d "$session_dir" ]] || continue

  MANIFEST="$session_dir/manifest.json"
  [[ -f "$MANIFEST" ]] || continue

  SESSION_ID=$(basename "$session_dir")
  SHOULD_REMOVE=false

  # Check completed status
  if $CLEAN_COMPLETED; then
    STATUS=$(jq -r '.status' "$MANIFEST")
    if [[ "$STATUS" == "completed" ]]; then
      SHOULD_REMOVE=true
    fi
  fi

  # Check staleness
  if [[ "$STALE_HOURS" -gt 0 ]]; then
    CREATED=$(jq -r '.created' "$MANIFEST")
    CREATED_TS=$(date -j -f "%Y-%m-%dT%H:%M:%SZ" "$CREATED" +%s 2>/dev/null || date -d "$CREATED" +%s 2>/dev/null || echo "0")
    AGE_HOURS=$(( (NOW - CREATED_TS) / 3600 ))

    if [[ "$AGE_HOURS" -gt "$STALE_HOURS" ]]; then
      SHOULD_REMOVE=true
    fi
  fi

  if $SHOULD_REMOVE; then
    rm -rf "$session_dir"
    echo "Removed: $SESSION_ID"
    REMOVED=$((REMOVED + 1))
  fi
done

if [[ $REMOVED -eq 0 ]]; then
  echo "No sessions to clean up"
else
  echo "Removed $REMOVED delegation session(s)"
fi
