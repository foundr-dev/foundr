# rebase-helper

Safely rebase branches onto main with conflict handling.

## Triggers

- rebase, sync branch, update branch

## Behavior

1. **Pre-flight Check**
   - `git status` - check for uncommitted changes
   - If dirty: suggest commit or stash first

2. **Preview**
   - Show commits to be rebased
   - Show how far behind main
   - Ask for confirmation before proceeding

3. **Execute Rebase**
   - `git fetch origin`
   - `git rebase origin/main`

4. **Handle Conflicts**
   - If conflicts: delegate to `conflict-resolver` agent
   - Guide through resolution process

5. **Complete**
   - `git push --force-with-lease`
   - Confirm success

## Usage

```
Rebase my branch onto main
Sync this branch with main
Update my branch
```

## Safety Features

- Never rebase with uncommitted changes
- Always uses `--force-with-lease` not `--force`
- Confirms before starting and before force-pushing

## Abort

If rebase becomes too complex:
```bash
git rebase --abort
```
Then suggest merge instead.

## See Also

- `conflict-resolver` - For handling conflicts
- `/git:sync` - Quick sync command
