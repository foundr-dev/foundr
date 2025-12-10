#!/bin/bash
# .claude/scripts/delegation/list.sh
# List active delegation sessions

set -euo pipefail

SESSIONS_DIR=".tmp/sessions"

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  echo "Usage: list.sh [--json]"
  echo "  List active delegation sessions"
  exit 0
fi

JSON_OUTPUT=false
[[ "${1:-}" == "--json" ]] && JSON_OUTPUT=true

if [[ ! -d "$SESSIONS_DIR" ]]; then
  if $JSON_OUTPUT; then
    echo "[]"
  else
    echo "No delegation sessions found"
  fi
  exit 0
fi

if $JSON_OUTPUT; then
  echo "["
  FIRST=true
fi

for manifest in "$SESSIONS_DIR"/*/manifest.json; do
  [[ -f "$manifest" ]] || continue

  SESSION_ID=$(basename "$(dirname "$manifest")")
  TASK_SLUG=$(jq -r '.task_slug' "$manifest")
  STATUS=$(jq -r '.status' "$manifest")
  CREATED=$(jq -r '.created' "$manifest")

  if $JSON_OUTPUT; then
    if ! $FIRST; then echo ","; fi
    FIRST=false
    jq -c '.' "$manifest"
  else
    printf "%-24s %-30s %-10s %s\n" "$SESSION_ID" "$TASK_SLUG" "$STATUS" "$CREATED"
  fi
done

if $JSON_OUTPUT; then
  echo "]"
fi
