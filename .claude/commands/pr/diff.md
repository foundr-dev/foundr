# /pr:diff

Show PR changes in concise format.

## Usage

```
/pr:diff <number>
/pr:diff 123
```

## Behavior

Fetch and display PR diff:

```bash
gh pr diff <number>
```

## Output

Shows unified diff of all changes in the PR.

## Options

For large PRs, limit output:
```bash
gh pr diff <number> --name-only  # Just file names
```

## See Also

- `/pr:view` - PR overview
- `/pr:checks` - CI status
- `pr-reviewer` - Full review
