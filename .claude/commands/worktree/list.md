# /worktree:list

List git worktrees with branch info and status.

## Usage

```
/worktree:list
```

## Behavior

```bash
git worktree list
```

## Output Format

```
worktrees (3):
  /path/to/project          main      abc1234 [current]
  /path/to/project-feature  feature-x def5678
  /path/to/project-pr-123   pr-branch ghi9012
```

## Fields

- **Path**: Worktree directory location
- **Branch**: Checked out branch
- **Hash**: Current commit (short)
- **Current**: Indicates active worktree

## See Also

- `/worktree:create` - Create new worktree
- `/worktree:remove` - Remove worktree
- `worktree` agent - Worktree management
