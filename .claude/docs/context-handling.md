# Context Handling

Three layers of context management for AI-assisted development.

## Overview

```text
Layer 1: Delegation (ephemeral)   → Agent-to-agent within conversation
Layer 2: Sessions (persistent)    → Cross-conversation task continuity
Layer 3: Snapshots (pre-compact)  → Preserve insights before summarization
```

## Layer 1: Delegation Context

**Purpose**: Pass context between agents during a single conversation.

**Location**: `.tmp/sessions/{session-id}/` (gitignored, ephemeral)

**When to use**:
- Multi-step tasks requiring shared context
- Complex investigations with accumulated findings
- Chained agent delegations

**Scripts**:
```bash
.claude/scripts/delegation/create.sh <task-slug>  # Create session
.claude/scripts/delegation/list.sh                 # List active
.claude/scripts/delegation/update.sh <id>          # Update status
.claude/scripts/delegation/cleanup.sh --stale 24   # Clean old
```

**Context file format** (Toon):
```text
# Context: implement-auth

session{id,task,branch}:
  20250115-143052-a7f2,123456,feat--auth

## Request
Implement OAuth2 login flow

## Files
modify[]{path,action}:
  src/auth/provider.tsx,add-oauth-provider

## Expected Return
result{status,action}:
  success,continue | blocked,needs-input | failed,reason
```

## Layer 2: Session Persistence

**Purpose**: Resume work across Claude conversations (multi-day tasks).

**Location**: `.claude/sessions/{branch}.md` (committed, persistent)

**When to use**:
- Multi-day tasks
- Returning to work after interruption
- Handing off context to future sessions

**Scripts**:
```bash
.claude/scripts/sessions/create.sh <branch> <title>  # Create
.claude/scripts/sessions/list.sh                      # List all
.claude/scripts/sessions/read.sh <branch>             # Read
.claude/scripts/sessions/remove.sh <branch>           # Remove
.claude/scripts/sessions/cleanup.sh --orphans         # Clean orphans
```

**Session file format**:
```markdown
# Session: Add user authentication

- **Created**: 2025-01-15T10:30:00Z
- **Branch**: feat--add-auth
- **Task**: 1234567890
- **Status**: implementing

## Task Summary
Brief description

## Progress
- [x] Completed item
- [ ] Pending item

## Key Decisions
- Decision 1 and rationale

## Files Modified
- path/to/file.ts - what changed

## Context Snapshots
<!-- Pre-compaction saves -->

## Notes
Additional context
```

## Layer 3: Pre-Compaction Snapshots

**Purpose**: Save valuable context before conversation compaction loses detail.

**Location**: Appended to session file under "Context Snapshots"

**When to use**:
- Before conversation gets summarized (large context)
- When switching tasks mid-conversation
- Taking a break from work

**Commands**:
- `/save-context` - Save current context to session
- `/resume` - Resume from saved session

**Script**:
```bash
# Interactive mode
.claude/scripts/sessions/snapshot.sh

# Auto mode (from Claude)
.claude/scripts/sessions/snapshot.sh --auto << 'EOF'
{
  "progress": "What was accomplished",
  "decisions": ["Decision 1", "Decision 2"],
  "files": ["modified/file.ts"],
  "findings": ["Important discovery"],
  "next_steps": "What to do next"
}
EOF
```

**Snapshot format** (appended to session):
```markdown
### Snapshot: 2025-01-15T14:00:00Z

**Progress**: OAuth provider configured, login flow working

**Decisions**:
  - Using refresh tokens in httpOnly cookies

**Files Modified**:
  - src/auth/provider.tsx

**Findings**:
  - Existing session hook can be reused

**Next Steps**: Add logout functionality and tests
```

## Workflow Integration

### Starting Work

```bash
# Create session when starting task
.claude/scripts/sessions/create.sh feat--task-name "Task title" --task 123456
```

### During Work

```bash
# Create delegation context for complex investigations
SESSION_ID=$(.claude/scripts/delegation/create.sh "investigate-issue")
# Pass session ID to subagents for shared context
```

### Before Compaction

```bash
# Save context snapshot
/save-context
# Or manually:
.claude/scripts/sessions/snapshot.sh
```

### Resuming

```bash
# List available sessions
/resume
# Or resume specific branch
/resume feat--task-name
```

### Completing

```bash
# Session auto-removed by complete-task agent
# Or manually:
.claude/scripts/sessions/remove.sh feat--task-name
```

## Best Practices

1. **Create sessions early** - Start tasks with a session for continuity
2. **Save context frequently** - Don't wait until compaction warning
3. **Update progress** - Keep session file current with checkboxes
4. **Document decisions** - Future you will thank present you
5. **Clean up** - Remove sessions after task completion
6. **Use delegation for complexity** - Chain agents with shared context

## Hook Configuration

Add to `.claude/settings.json` to enable pre-compaction hints:

```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": ".*",
        "hooks": [{ "type": "command", "command": ".claude/hooks/pre-compaction-save.sh" }]
      }
    ]
  }
}
```

## See Also

- [resume-sessions.md](resume-sessions.md) - Detailed resume workflow
- [context-bundles.md](context-bundles.md) - Delegation context details
- [claude/hooks.md](claude/hooks.md) - Hook system reference
