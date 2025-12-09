# /git:sync

Fetch latest changes and rebase current branch onto main.

## Usage

```
/git:sync
/git:sync --push
```

## Behavior

1. Fetch latest from origin
2. Rebase current branch onto origin/main
3. Optionally push with --force-with-lease

```bash
# Basic sync
git fetch origin
git rebase origin/main

# With push
git fetch origin
git rebase origin/main
git push --force-with-lease
```

## Options

- `--push` - Push after successful rebase

## Conflict Handling

If conflicts occur:
1. Resolve conflicts in each file
2. Stage resolved files: `git add <file>`
3. Continue rebase: `git rebase --continue`
4. Or abort: `git rebase --abort`

## When to Use

- Before creating a PR (sync with latest main)
- Before starting new work
- When PR has conflicts with main

## See Also

- `rebase-helper` agent - For guided conflict resolution
- `/git:status` - Check current state
