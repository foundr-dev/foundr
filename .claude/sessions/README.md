# Sessions

Session files preserve task context across Claude conversations.

## Purpose

When working on multi-day tasks or complex features, session files capture:
- Current progress
- Key decisions made
- Files modified
- Context needed to resume

## File Format

Session files are named `{branch-name}.md`:

```markdown
# Session: feat--user-auth

**Created**: 2025-01-15 10:30
**Task**: Implement user authentication
**Status**: implementing

## Progress

- [x] Set up auth provider
- [x] Create login component
- [ ] Add logout functionality
- [ ] Write tests

## Key Decisions

- Using JWT tokens (not sessions) for stateless auth
- Storing refresh token in httpOnly cookie

## Context

The auth flow follows OAuth 2.0 PKCE pattern.
See `src/auth/provider.ts` for the main implementation.

## Files Modified

- `src/auth/provider.ts` - Main auth provider
- `src/components/Login.tsx` - Login form
```

## Commands

Use the session scripts in `src/scripts/sessions/`:

```bash
# List all sessions with status
bun run src/scripts/sessions/list.ts

# Read a specific session
bun run src/scripts/sessions/read.ts feat--user-auth

# Create a new session
bun run src/scripts/sessions/create.ts feat--user-auth

# Cleanup orphaned sessions (branch no longer exists)
bun run src/scripts/sessions/cleanup.ts --dry-run
bun run src/scripts/sessions/cleanup.ts
```

## Session Statuses

- **CURRENT** - Session matches current git branch
- **ACTIVE** - Session's branch still exists
- **ORPHAN** - Session's branch was deleted

## Conversation vs Session

| Need | Solution |
|------|----------|
| Continue recent conversation | `claude --continue` |
| Pick specific past conversation | `claude --resume` |
| Start fresh with task context | `/resume` command |
| Task spans multiple days | `/resume` command |

## Integration

- `/resume` command invokes the `resume-session` skill
- `start-work` agent creates session files automatically
- `complete-task` agent cleans up session files
