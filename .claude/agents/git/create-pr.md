# create-pr

Create a pull request with proper formatting.

## Triggers

- create pr, open pr, pull request

## Behavior

1. **Pre-flight Checks**
   - Verify on feature branch (not main)
   - Check for uncommitted changes
   - Verify branch is pushed to remote

2. **Generate PR Content**
   - Title from branch name or commits
   - Summary of changes
   - Link to task (if provided)

3. **Create PR**
   ```bash
   gh pr create --base main --title "Title" --body "Description"
   ```

4. **Output**
   - PR URL
   - PR number

## Usage

```
Create a PR for this work
Open a pull request
Create PR for task 123
```

## PR Template

```markdown
## Summary
<Brief description of changes>

## Changes
- Change 1
- Change 2

## Testing
- [ ] Tests pass
- [ ] Manual testing done

## Task
<Link to task if provided>
```

## Options

- Link to task management (if configured)
- Draft PR: `gh pr create --draft`
- Assign reviewers: `gh pr create --reviewer @user`

## See Also

- `ship` agent - Full commit + push + PR workflow
- `/pr:view` - View PR details
- `pr-reviewer` - Review PRs
