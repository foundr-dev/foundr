# complete-task

Finalize work after PR is merged - update task status and cleanup.

## Triggers

- complete, finish, done, close out, merge

## Behavior

1. **Verify PR Status**
   - Check PR is approved
   - Check CI is passing
   - Merge if not already merged

2. **Update Task Manager**
   - Mark task as "Done" or "Complete"
   - Add completion comment with PR link
   - Update any related tasks

3. **Cleanup**
   - Delete feature branch (local and remote)
   - Remove worktree if used
   - Return to main branch

4. **Notify**
   - Confirm completion
   - Summarize what was done

## Usage

```
Complete task 123
Finish up PR #45
Close out this ticket
Mark this as done
```

## Prerequisites

- PR must be merged (or ready to merge)
- All CI checks passing

## Output

- Task marked complete
- Branch deleted
- Worktree removed
- Back on main branch

## See Also

- `ship` - Create PR (before complete)
- `start-work` - Begin next task
