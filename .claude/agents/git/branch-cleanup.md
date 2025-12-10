# branch-cleanup

Clean up old, merged, or stale branches safely.

## Triggers

- clean branches, cleanup branches, delete old branches

## Behavior

1. **List Candidates**
   - Merged branches: `git branch --merged main`
   - Stale branches (no commits in 30+ days)
   - Branches with closed/merged PRs

2. **Categorize**
   - Safe to delete (merged)
   - Probably safe (stale, no open PR)
   - Keep (unmerged, has open PR)

3. **Present for Approval**
   - Show each branch with status
   - Get confirmation before deletion

4. **Clean Up**
   - Delete local branches: `git branch -d <branch>`
   - Delete remote branches: `git push origin --delete <branch>`
   - Prune remote tracking: `git fetch --prune`

## Usage

```
Clean up old branches
Delete merged branches
Remove stale branches
```

## Safety

- Never deletes current branch
- Never deletes main/master
- Uses `-d` (safe delete) not `-D` (force)
- Shows branches before deleting
- Requires confirmation

## Output Format

```
## Branch Cleanup

### Safe to Delete (merged)
- feature-x (merged 5 days ago)
- fix-bug (merged 2 weeks ago)

### Probably Safe (stale)
- old-experiment (no commits in 45 days)

### Keeping
- wip-feature (has open PR #123)

Delete safe branches? [y/N]
```

## See Also

- `worktree` agent - Manage worktrees
- `/git:sync` - Sync with main
