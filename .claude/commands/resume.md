---
description: Resume work from a previous session
---

# /resume

Resume work from a saved session context.

**Usage**: `/resume [branch]`

<process>
1. List available sessions: `.claude/scripts/sessions/list.sh`
2. If branch specified, read that session
3. If no branch, show list and let user choose
4. Load session context including:
   - Task summary
   - Progress so far
   - Key decisions
   - Files modified
   - Context snapshots
5. Offer to clean up orphaned sessions
</process>

<output_format>
```
sessions[]{status,branch,task,created}:
  CURRENT,feat--add-auth,123456,2025-01-15T10:30:00Z
  ACTIVE,fix--login-bug,789012,2025-01-14T09:00:00Z
  ORPHAN,old-branch,(none),2025-01-10T08:00:00Z

Select session to resume (or 'cleanup' to remove orphans):
```
</output_format>

## Commands

```bash
# List all sessions
.claude/scripts/sessions/list.sh

# Read specific session
.claude/scripts/sessions/read.sh <branch>

# Clean up orphans
.claude/scripts/sessions/cleanup.sh --orphans
```

## Example

```
/resume feat--add-auth

Loading session: feat--add-auth

# Session: Add user authentication

- **Created**: 2025-01-15T10:30:00Z
- **Branch**: feat--add-auth
- **Task**: 1234567890
- **Status**: implementing

## Task Summary
Implement OAuth2 authentication with Auth0

## Progress
- [x] Set up auth context
- [ ] Finish login component
- [ ] Add tests

## Context Snapshots
### Snapshot: 2025-01-15T14:00:00Z
**Progress**: OAuth provider configured, login flow working
**Decisions**: Using refresh tokens in httpOnly cookies
...

Ready to continue from where you left off.
```
