# /worktree:remove

Remove a git worktree.

## Usage

```
/worktree:remove <path>
/worktree:remove ../project-feature
```

## Behavior

```bash
# Clean removal
git worktree remove <path>

# Force remove if dirty
git worktree remove --force <path>

# Clean up stale references
git worktree prune
```

## Safety

- Warns if worktree has uncommitted changes
- Use `--force` only after confirming changes are saved

## Cleanup After PR Merge

After a PR is merged:

1. Return to main repo: `cd ../project`
2. Pull latest: `git pull`
3. Remove worktree: `/worktree:remove ../project-pr-123`
4. Delete branch: `git branch -d pr-branch`

## Prune Stale Worktrees

If worktree directory was deleted manually:

```bash
git worktree prune
```

## See Also

- `/worktree:list` - List worktrees
- `/worktree:create` - Create worktree
- `complete-task` agent - Full cleanup workflow
