# worktree

Manage git worktrees for parallel development.

## Triggers

- worktree, parallel work, multiple branches

## What Are Worktrees?

Git worktrees let you check out multiple branches simultaneously in separate directories. Useful for:
- Reviewing PRs while keeping your work intact
- Working on multiple features in parallel
- Quick hotfixes without stashing

## Behavior

### Create Worktree

```bash
# Create worktree for a branch
git worktree add ../project-feature feature-branch

# Create worktree with new branch
git worktree add -b new-feature ../project-new-feature main
```

### List Worktrees

```bash
git worktree list
```

### Remove Worktree

```bash
# Remove worktree directory
git worktree remove ../project-feature

# Force remove if dirty
git worktree remove --force ../project-feature

# Prune stale entries
git worktree prune
```

## Usage

```
Create a worktree for PR review
Set up parallel work on feature X
List my worktrees
Clean up old worktrees
```

## Conventions

- Name worktrees: `<project>-<feature>` or `<project>-pr-<number>`
- Place worktrees as siblings to main repo
- Clean up after merging/closing PRs

## Workflow: PR Review

1. Create worktree: `git worktree add ../project-pr-123 pr-branch`
2. cd to worktree, review code
3. Return to main repo
4. Clean up: `git worktree remove ../project-pr-123`

## See Also

- `/git:sync` - Sync branch with main
- `pr-reviewer` - Review PRs
