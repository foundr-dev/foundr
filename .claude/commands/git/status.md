# /git:status

Show git status in a context-efficient format.

## Usage

```
/git:status
```

## Behavior

Run `git status --short --branch` for concise output:

```bash
git status --short --branch
```

Shows:
- Current branch and tracking info
- Staged changes (green)
- Unstaged changes (red)
- Untracked files

## Output Format

```
## main...origin/main
M  src/file.ts      # Modified and staged
 M src/other.ts     # Modified but not staged
?? new-file.ts      # Untracked
```

## Why Use This

- More concise than full `git status`
- Shows all essential information
- Reduces context usage in conversations
