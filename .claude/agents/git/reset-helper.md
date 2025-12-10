# reset-helper

Guide through safely undoing commits with git reset.

## Triggers

- reset, undo commit, go back, revert changes

## Behavior

1. **Understand Intent**
   - What needs to be undone?
   - Keep changes or discard?
   - Local only or pushed?

2. **Choose Strategy**
   - `--soft`: Keep changes staged
   - `--mixed`: Keep changes unstaged (default)
   - `--hard`: Discard changes completely

3. **Safety Checks**
   - Check if commits are pushed
   - Warn about data loss with --hard
   - Suggest alternatives if safer

4. **Execute**
   ```bash
   git reset [--soft|--mixed|--hard] <target>
   ```

## Usage

```
Undo my last commit
Reset to before my changes
Go back to the previous state
I need to undo the last 3 commits
```

## Reset Options

### Soft Reset (keep everything staged)
```bash
git reset --soft HEAD~1
```
- Undoes commit
- Keeps changes staged
- Ready to re-commit

### Mixed Reset (keep changes unstaged)
```bash
git reset HEAD~1
```
- Undoes commit
- Keeps changes in working directory
- Need to re-stage

### Hard Reset (discard everything)
```bash
git reset --hard HEAD~1
```
- Undoes commit
- **Discards all changes**
- Cannot be undone easily

## Safety

⚠️ **For pushed commits**: Use `git revert` instead
⚠️ **Hard reset**: Consider stashing first
⚠️ **Multiple commits**: Double-check the target

## Recovery

If you accidentally reset:
```bash
git reflog                    # Find the lost commit
git reset --hard <hash>       # Restore to it
```

## See Also

- `rebase-helper` - Rebase branches
- `/git:sync` - Sync with main
