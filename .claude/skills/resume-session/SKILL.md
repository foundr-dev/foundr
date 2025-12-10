---
name: resume-session
description: Resume incomplete work from a previous Claude session using saved context
allowed-tools: [Read, Bash, Glob]
---

<objective>
Detect and resume incomplete work by loading session files that preserve task context across Claude sessions.
</objective>

<when_invoked>
- User mentions resuming, continuing, or picking up previous work
- User asks "what was I working on?" or similar
- Detecting a worktree with an associated session file
- After switching to a feature branch with incomplete work
</when_invoked>

<process>
1. **List sessions**: Check `.claude/sessions/` for saved context
2. **Match context**: If on a branch, check for `.claude/sessions/{branch}.md`
3. **Load session**: Read session file to understand task state
4. **Present status**: Show progress, remaining work, key decisions
5. **Offer next action**: Suggest continuing implementation or completing task
</process>

<output_format>
```toon
session{branch,status,created}:
  feat--user-auth,implementing,2025-01-15

progress{done,remaining}:
  3,5

next_action:
  Continue implementing login component (task 4 of 8)
```
</output_format>

<session_file_format>
Session files in `.claude/sessions/{branch}.md`:

```markdown
# Session: {branch}

**Created**: YYYY-MM-DD HH:MM
**Task**: [description or ticket reference]
**Status**: planning | implementing | testing | reviewing

## Progress

- [x] Completed task 1
- [x] Completed task 2
- [ ] Current task
- [ ] Remaining task

## Key Decisions

- Decision 1: [what was decided and why]
- Decision 2: [what was decided and why]

## Context

[Important context for resuming work]

## Files Modified

- `path/to/file.ts` - [what was changed]
```
</session_file_format>

<conversation_vs_session>
| Need | Use |
|------|-----|
| Continue recent Claude conversation | `claude --continue` |
| Pick specific past conversation | `claude --resume` |
| Start fresh with task context | `/resume` → this skill |
| Task spans multiple days | `/resume` → this skill |
</conversation_vs_session>

<success_criteria>
- User's previous context restored
- Clear understanding of what was completed and what remains
- Actionable next step identified
</success_criteria>
