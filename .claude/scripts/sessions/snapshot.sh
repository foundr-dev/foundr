#!/bin/bash
# .claude/scripts/sessions/snapshot.sh
# Save a context snapshot to the current session before compaction
#
# Called by the pre-compaction hook to preserve valuable context that
# would otherwise be lost during conversation summarization.
#
# Usage: snapshot.sh [--branch <name>] [--auto]
#
# The snapshot captures:
# - Key decisions made
# - Files modified
# - Important findings
# - Current progress
# - Blockers or next steps

set -euo pipefail

MAIN_WORKTREE=$(git worktree list | head -1 | awk '{print $1}')
SESSIONS_DIR="$MAIN_WORKTREE/.claude/sessions"
BRANCH=""
AUTO_MODE=false

while [[ $# -gt 0 ]]; do
  case $1 in
    --branch)
      BRANCH="$2"
      shift 2
      ;;
    --auto)
      AUTO_MODE=true
      shift
      ;;
    --help|-h)
      echo "Usage: snapshot.sh [--branch <name>] [--auto]"
      echo ""
      echo "Save context snapshot to session file before compaction."
      echo ""
      echo "Options:"
      echo "  --branch <name>  Specify branch (default: current branch)"
      echo "  --auto           Auto-mode: read snapshot data from stdin"
      echo ""
      echo "In auto mode, expects JSON on stdin with:"
      echo "  decisions: array of key decisions"
      echo "  files: array of modified files"
      echo "  findings: array of important discoveries"
      echo "  progress: current progress summary"
      echo "  next_steps: what to do next"
      exit 0
      ;;
    *) shift ;;
  esac
done

# Get current branch if not specified
if [[ -z "$BRANCH" ]]; then
  BRANCH=$(git branch --show-current 2>/dev/null || echo "")
fi

if [[ -z "$BRANCH" ]]; then
  echo "Error: Could not determine branch. Use --branch to specify." >&2
  exit 1
fi

SESSION_FILE="$SESSIONS_DIR/$BRANCH.md"

if [[ ! -f "$SESSION_FILE" ]]; then
  echo "No session found for branch: $BRANCH" >&2
  echo "Create one with: sessions/create.sh $BRANCH 'Title'" >&2
  exit 1
fi

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

if $AUTO_MODE; then
  # Read JSON from stdin and format snapshot
  INPUT=$(cat)

  # Parse JSON fields (using jq if available, fallback to basic parsing)
  if command -v jq &> /dev/null; then
    DECISIONS=$(echo "$INPUT" | jq -r '.decisions // [] | .[]' 2>/dev/null | sed 's/^/  - /')
    FILES=$(echo "$INPUT" | jq -r '.files // [] | .[]' 2>/dev/null | sed 's/^/  - /')
    FINDINGS=$(echo "$INPUT" | jq -r '.findings // [] | .[]' 2>/dev/null | sed 's/^/  - /')
    PROGRESS=$(echo "$INPUT" | jq -r '.progress // "(none)"' 2>/dev/null)
    NEXT_STEPS=$(echo "$INPUT" | jq -r '.next_steps // "(none)"' 2>/dev/null)
  else
    # Fallback: treat input as raw text
    DECISIONS=""
    FILES=""
    FINDINGS=""
    PROGRESS="$INPUT"
    NEXT_STEPS="(see progress)"
  fi

  # Create snapshot entry
  SNAPSHOT="
### Snapshot: $TIMESTAMP

**Progress**: $PROGRESS

**Decisions**:
${DECISIONS:-  (none)}

**Files Modified**:
${FILES:-  (none)}

**Findings**:
${FINDINGS:-  (none)}

**Next Steps**: $NEXT_STEPS
"

else
  # Interactive mode - prompt for input
  echo "Creating context snapshot for session: $BRANCH"
  echo ""

  read -p "Progress summary: " PROGRESS
  read -p "Key decisions (comma-separated): " DECISIONS_RAW
  read -p "Files modified (comma-separated): " FILES_RAW
  read -p "Important findings (comma-separated): " FINDINGS_RAW
  read -p "Next steps: " NEXT_STEPS

  # Format lists
  DECISIONS=$(echo "$DECISIONS_RAW" | tr ',' '\n' | sed 's/^ */  - /' | grep -v '^  - $')
  FILES=$(echo "$FILES_RAW" | tr ',' '\n' | sed 's/^ */  - /' | grep -v '^  - $')
  FINDINGS=$(echo "$FINDINGS_RAW" | tr ',' '\n' | sed 's/^ */  - /' | grep -v '^  - $')

  SNAPSHOT="
### Snapshot: $TIMESTAMP

**Progress**: ${PROGRESS:-(none)}

**Decisions**:
${DECISIONS:-  (none)}

**Files Modified**:
${FILES:-  (none)}

**Findings**:
${FINDINGS:-  (none)}

**Next Steps**: ${NEXT_STEPS:-(none)}
"
fi

# Append snapshot to session file under Context Snapshots section
if grep -q "## Context Snapshots" "$SESSION_FILE"; then
  # Append after the Context Snapshots header
  # Using awk to insert after the header
  awk -v snapshot="$SNAPSHOT" '
    /^## Context Snapshots/ { print; print snapshot; next }
    { print }
  ' "$SESSION_FILE" > "$SESSION_FILE.tmp"
  mv "$SESSION_FILE.tmp" "$SESSION_FILE"
else
  # Add Context Snapshots section
  echo "" >> "$SESSION_FILE"
  echo "## Context Snapshots" >> "$SESSION_FILE"
  echo "$SNAPSHOT" >> "$SESSION_FILE"
fi

echo "Snapshot saved to: $SESSION_FILE"
