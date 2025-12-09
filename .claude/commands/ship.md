# /ship

Commit, push, and create a pull request in one command.

## Usage

```
/ship
/ship [task-id]
```

## Behavior

1. **Quality Checks**
   - Run lint
   - Run type check
   - Run tests

2. **Commit**
   - Stage changes
   - Generate conventional commit message
   - Include attribution footer

3. **Push**
   - Push to origin with tracking
   - Use --force-with-lease if rebased

4. **Create PR**
   - Generate title from branch/commits
   - Generate description with summary
   - Link to task if ID provided

5. **Update Task** (if task manager configured)
   - Move to "In Review" section
   - Add PR link as comment

## Output

Returns the PR URL for easy access.

## Prerequisites

- On a feature branch (not main)
- All quality checks must pass

## See Also

- `/commit` - Just commit without PR
- `ship` agent - More detailed workflow
- `complete-task` agent - After PR is merged
