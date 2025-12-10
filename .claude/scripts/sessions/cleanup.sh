#!/bin/bash
# .claude/scripts/sessions/cleanup.sh
# Clean up orphaned or stale session files
#
# Usage: cleanup.sh [--orphans] [--stale <days>] [--dry-run]

set -euo pipefail

MAIN_WORKTREE=$(git worktree list | head -1 | awk '{print $1}')
SESSIONS_DIR="$MAIN_WORKTREE/.claude/sessions"

CLEAN_ORPHANS=false
STALE_DAYS=0
DRY_RUN=false

while [[ $# -gt 0 ]]; do
  case $1 in
    --orphans) CLEAN_ORPHANS=true; shift ;;
    --stale)
      STALE_DAYS="$2"
      shift 2
      ;;
    --dry-run) DRY_RUN=true; shift ;;
    --help|-h)
      echo "Usage: cleanup.sh [--orphans] [--stale <days>] [--dry-run]"
      echo ""
      echo "Options:"
      echo "  --orphans       Remove sessions where branch no longer exists"
      echo "  --stale <days>  Remove sessions older than N days"
      echo "  --dry-run       Show what would be removed without removing"
      exit 0
      ;;
    *) shift ;;
  esac
done

if [[ "$CLEAN_ORPHANS" == "false" && "$STALE_DAYS" -eq 0 ]]; then
  echo "Error: Specify --orphans and/or --stale <days>" >&2
  exit 1
fi

if [[ ! -d "$SESSIONS_DIR" ]]; then
  echo "No sessions directory found"
  exit 0
fi

# Function to check if branch exists
branch_exists() {
  local branch="$1"
  if git branch --list "$branch" | grep -q .; then
    return 0
  fi
  if git worktree list | grep -q "\[$branch\]"; then
    return 0
  fi
  return 1
}

REMOVED=0

for session in "$SESSIONS_DIR"/*.md; do
  [[ -f "$session" ]] || continue

  BRANCH=$(basename "$session" .md)
  SHOULD_REMOVE=false

  # Check orphan status
  if $CLEAN_ORPHANS && ! branch_exists "$BRANCH"; then
    SHOULD_REMOVE=true
    REASON="orphan"
  fi

  # Check staleness
  if [[ "$STALE_DAYS" -gt 0 ]]; then
    # Get file modification time
    if [[ "$(uname)" == "Darwin" ]]; then
      FILE_AGE=$(( ($(date +%s) - $(stat -f %m "$session")) / 86400 ))
    else
      FILE_AGE=$(( ($(date +%s) - $(stat -c %Y "$session")) / 86400 ))
    fi

    if [[ "$FILE_AGE" -gt "$STALE_DAYS" ]]; then
      SHOULD_REMOVE=true
      REASON="stale (${FILE_AGE}d old)"
    fi
  fi

  if $SHOULD_REMOVE; then
    if $DRY_RUN; then
      echo "Would remove: $BRANCH ($REASON)"
    else
      rm "$session"
      echo "Removed: $BRANCH ($REASON)"
    fi
    REMOVED=$((REMOVED + 1))
  fi
done

if [[ $REMOVED -eq 0 ]]; then
  echo "No sessions to clean up"
else
  if $DRY_RUN; then
    echo "Would remove $REMOVED session(s)"
  else
    echo "Removed $REMOVED session(s)"
  fi
fi
