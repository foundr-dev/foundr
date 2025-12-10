# /worktree:create

Create a new git worktree.

## Usage

```
/worktree:create <branch> [path]
/worktree:create feature-x
/worktree:create feature-x ../project-feature
```

## Behavior

```bash
# With auto-generated path
git worktree add ../project-<branch> <branch>

# With specified path
git worktree add <path> <branch>

# Create new branch from main
git worktree add -b <branch> <path> main
```

## Options

- **branch**: Branch to checkout (or create with -b)
- **path**: Optional, defaults to `../<project>-<branch>`

## Conventions

Place worktrees as siblings to main repo:

```
repos/
├── project/              # Main repo
├── project-feature/      # Feature worktree
└── project-pr-123/       # PR review worktree
```

## Examples

```bash
# Checkout existing branch
/worktree:create feature-auth

# Create new branch and worktree
/worktree:create fix-bug-123

# PR review worktree
/worktree:create pr-456 ../project-pr-456
```

## See Also

- `/worktree:list` - List worktrees
- `/worktree:remove` - Remove worktree
