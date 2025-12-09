# Git Worktrees

Git worktrees let you check out multiple branches simultaneously in separate directories.

## When to Use

- Reviewing PRs while keeping your work intact
- Working on multiple features in parallel
- Quick hotfixes without stashing
- Testing different branches simultaneously

## Basic Commands

### Create Worktree

```bash
# For existing branch
git worktree add ../project-feature feature-branch

# Create new branch at same time
git worktree add -b new-feature ../project-new-feature main
```

### List Worktrees

```bash
git worktree list
```

### Remove Worktree

```bash
# Clean removal
git worktree remove ../project-feature

# Force remove if dirty
git worktree remove --force ../project-feature

# Clean up stale references
git worktree prune
```

## Naming Convention

Place worktrees as siblings to main repo:

```
repos/
├── project/              # Main repo
├── project-feature/      # Feature worktree
├── project-pr-123/       # PR review worktree
└── project-hotfix/       # Hotfix worktree
```

## Workflows

### PR Review

1. Create worktree: `git worktree add ../project-pr-123 pr-branch`
2. Change to worktree: `cd ../project-pr-123`
3. Review, test, comment
4. Return: `cd ../project`
5. Cleanup: `git worktree remove ../project-pr-123`

### Parallel Development

1. Main work in `project/`
2. Hotfix in `project-hotfix/`
3. Each has independent working directory
4. Share git history and objects

## Best Practices

- Clean up worktrees after PRs are merged
- Use descriptive names
- Run `git worktree prune` periodically
- Don't forget which worktree you're in

## See Also

- [Git Conventions](./git.md)
- `worktree` agent
