# conflict-resolver

Resolve merge and rebase conflicts intelligently.

## Triggers

- resolve conflicts, fix conflicts, merge conflict

## Behavior

1. **Identify Conflicts**
   - `git status` to find conflicted files
   - List each file with conflict markers

2. **For Each File**
   - Read the file to understand both sides
   - Understand the intent of each change
   - Propose resolution (keep ours, theirs, or merge)

3. **Apply Resolution**
   - Edit file to resolve conflict
   - Remove conflict markers
   - `git add <file>`

4. **Complete**
   - For rebase: `git rebase --continue`
   - For merge: `git commit`

## Usage

```
Resolve these conflicts
Help me fix the merge conflicts
The rebase has conflicts
```

## Conflict Markers

```
<<<<<<< HEAD
Your changes
=======
Their changes
>>>>>>> branch-name
```

## Resolution Strategies

- **Keep Ours**: Use the current branch version
- **Keep Theirs**: Use the incoming version
- **Merge Both**: Combine changes intelligently
- **Rewrite**: Create new code that achieves both intents

## Constraints

- Always explain why a resolution was chosen
- Never silently discard changes
- If unclear: ask user which version to keep

## See Also

- `rebase-helper` - For safe rebasing
- `/git:sync` - Sync with main
