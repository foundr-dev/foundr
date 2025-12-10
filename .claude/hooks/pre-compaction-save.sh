#!/bin/bash
# .claude/hooks/pre-compaction-save.sh
# Hook: Stop (fires when Claude is about to stop)
#
# Reminds Claude to save context before the conversation compacts.
# This hook detects when context is getting large and suggests saving.
#
# Exit codes:
#   0 - Success, continue (with optional hint)
#   1 - Error
#   2 - Block (not used here)

set -euo pipefail

# Get repo root
REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
SESSIONS_DIR="$REPO_ROOT/.claude/sessions"

# Get current branch
BRANCH=$(git branch --show-current 2>/dev/null || echo "")

# Check if we have an active session for this branch
if [[ -n "$BRANCH" && -f "$SESSIONS_DIR/$BRANCH.md" ]]; then
  # Hint to save context before stopping
  cat << 'EOF'
hint: Active session detected. Before ending, consider saving useful context:

To save a context snapshot (preserves decisions, findings, progress):
```bash
.claude/scripts/sessions/snapshot.sh --auto << 'SNAPSHOT'
{
  "progress": "Summary of what was accomplished",
  "decisions": ["Key decision 1", "Key decision 2"],
  "files": ["path/to/modified/file.ts"],
  "findings": ["Important discovery"],
  "next_steps": "What to do next time"
}
SNAPSHOT
```

This helps preserve context that would otherwise be lost during compaction.
EOF
fi

exit 0
