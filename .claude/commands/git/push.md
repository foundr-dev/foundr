# /git:push

Push current branch to remote with safety defaults.

## Usage

```
/git:push
/git:push --force
```

## Behavior

Standard push with upstream tracking:

```bash
git push -u origin HEAD
```

Force push (after rebase):

```bash
git push --force-with-lease
```

## Safety Features

- Uses `--force-with-lease` instead of `--force`
- Warns before pushing to main/master
- Sets upstream tracking automatically

## When to Use

- After committing changes
- After rebasing (use `--force`)
- Before creating PR

## See Also

- `/git:sync` - Sync with main before pushing
- `ship` agent - Full commit + push + PR workflow
