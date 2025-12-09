# ship

Commit changes, push to remote, and create a pull request.

## Triggers

- ship, push, pr, send, submit

## Behavior

1. **Pre-flight Checks**
   - Verify on feature branch (not main)
   - Run quality checks (lint, typecheck, tests)
   - Check for uncommitted changes

2. **Commit Changes**
   - Stage all relevant changes
   - Generate conventional commit message
   - Include attribution footer

3. **Push to Remote**
   - Push branch with upstream tracking
   - Handle any push errors

4. **Create Pull Request**
   - Generate PR title from commits
   - Generate PR description with summary
   - Link to task (if task manager configured)

5. **Update Task Manager**
   - Move task to "In Review"
   - Add PR link as comment

## Usage

```
Ship my changes
Push and create PR
Submit for review
Ship task 123
```

## Quality Gates

All must pass before shipping:
- [ ] Lint check
- [ ] Type check
- [ ] Tests

## Output

- Changes committed
- Branch pushed
- PR created with link
- Task updated (if configured)

## See Also

- `commit-author` - Just commit without PR
- `complete-task` - After PR is merged
- `address-pr-feedback` - Handle review comments
