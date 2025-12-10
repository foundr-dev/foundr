---
description: Save current context to session before compaction
---

# /save-context

Save valuable context from this conversation to the session file.

**When to use**: Before conversation compacts, when switching tasks, or when taking a break.

<process>
1. Check if session exists for current branch
2. If no session, offer to create one
3. Gather context:
   - Progress summary (what was accomplished)
   - Key decisions made
   - Files modified
   - Important findings
   - Next steps
4. Save snapshot to session file
</process>

<output_format>
```bash
.claude/scripts/sessions/snapshot.sh --auto << 'SNAPSHOT'
{
  "progress": "<summary>",
  "decisions": ["<decision1>", "<decision2>"],
  "files": ["<file1>", "<file2>"],
  "findings": ["<finding1>"],
  "next_steps": "<next>"
}
SNAPSHOT
```
</output_format>

## Example

```
/save-context

Saving context for branch: feat--add-auth

Progress: Implemented OAuth2 login flow with Auth0
Decisions: Using refresh tokens in httpOnly cookies
Files: src/auth/provider.tsx, src/hooks/useAuth.ts
Findings: Existing session hook can be reused
Next: Add logout functionality and tests

✓ Context saved to .claude/sessions/feat--add-auth.md
```
