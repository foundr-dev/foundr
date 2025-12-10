---
name: complete-task
description: Merge PR, update Asana to done, and cleanup branch/worktree
tools: Bash, SlashCommand
model: haiku
---

Verify PR → merge → update task → cleanup

Input: PR number or task ID | Output: Task marked done, cleanup complete

<objective>
Finalize work after PR is approved - merge PR, update task status, and cleanup branches/worktrees.
</objective>

<process>
## 1. VERIFY PR STATUS

```bash
gh pr view <number> --json state,reviewDecision,statusCheckRollup
```

Check:
- [ ] PR approved (or no reviews required)
- [ ] CI passing
- [ ] No merge conflicts

**If not ready**: Report status, suggest next steps

## 2. MERGE PR

```bash
gh pr merge <number> --squash --delete-branch
```

Options:
- `--squash` for clean history (default)
- `--merge` if preserving commits requested
- `--delete-branch` removes remote branch

## 3. UPDATE TASK (if configured)

- Mark task as "Done" or "Complete"
- Add completion comment with merged PR link

## 4. CLEANUP

```bash
# Delete local branch
git branch -d <branch>

# Remove worktree if used
git worktree remove ../<worktree-name>

# Return to main
git checkout main
git pull
```
</process>

<output_format>
```text
complete{pr,task,branch_deleted,worktree_removed}:
  #<number>,<id>,yes|no,yes|no|na
```

Return format:
```
result{status,action}:
  success,continue | blocked,needs-input | failed,reason

summary:
  PR merged, task done, cleanup complete
```
</output_format>

<success_criteria>
- PR merged
- Task marked complete (if configured)
- Local branch deleted
- Worktree removed (if applicable)
- On main branch, up to date
</success_criteria>

Done: PR merged, task complete, cleanup done

Ask first: If PR not approved | If merge has conflicts
