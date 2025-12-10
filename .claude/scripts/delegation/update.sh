#!/bin/bash
# .claude/scripts/delegation/update.sh
# Update a delegation session's status or add findings

set -euo pipefail

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  echo "Usage: update.sh <session-id> [--status <status>] [--findings <text>]"
  echo ""
  echo "Update delegation session metadata"
  exit 0
fi

SESSION_ID="${1:-}"
if [[ -z "$SESSION_ID" ]]; then
  echo "Error: session-id required" >&2
  exit 1
fi
shift

SESSION_DIR=".tmp/sessions/$SESSION_ID"
MANIFEST="$SESSION_DIR/manifest.json"

if [[ ! -f "$MANIFEST" ]]; then
  echo "Session not found: $SESSION_ID" >&2
  exit 1
fi

NEW_STATUS=""
FINDINGS=""

while [[ $# -gt 0 ]]; do
  case $1 in
    --status)
      NEW_STATUS="$2"
      shift 2
      ;;
    --findings)
      FINDINGS="$2"
      shift 2
      ;;
    *) shift ;;
  esac
done

# Update timestamp
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# Update manifest
if [[ -n "$NEW_STATUS" ]]; then
  jq --arg status "$NEW_STATUS" --arg time "$TIMESTAMP" \
    '.status = $status | .last_activity = $time' "$MANIFEST" > "$MANIFEST.tmp"
  mv "$MANIFEST.tmp" "$MANIFEST"
fi

# Append findings to context
if [[ -n "$FINDINGS" ]]; then
  echo "" >> "$SESSION_DIR/context.md"
  echo "## Finding ($TIMESTAMP)" >> "$SESSION_DIR/context.md"
  echo "$FINDINGS" >> "$SESSION_DIR/context.md"
fi

echo "Updated: $SESSION_ID"
