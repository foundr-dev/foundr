# pr-reviewer

Conduct PR reviews with inline comments.

## Triggers

- review pr, review pull request, check this pr

## Behavior

1. **Fetch PR Details**
   - `gh pr view <number>` - get PR info
   - `gh pr diff <number>` - get changes

2. **Analyze Changes**
   - Review each file changed
   - Check against project patterns
   - Identify potential issues

3. **Categorize Findings**
   - 🔴 **CRITICAL**: Security, bugs, breaking changes
   - 🟡 **WARNING**: Error handling, performance, patterns
   - 🔵 **SUGGESTION**: Refactoring, clarity

4. **Provide Feedback**
   - Specific line references
   - Actionable fix suggestions
   - Use `gh pr comment` or `gh pr review`

## Usage

```
Review PR #123
Check this pull request
Review the changes in PR 456
```

## Output Format

```
## PR Review: #123

### 🔴 Critical (X)
- `file:line` - Issue description

### 🟡 Warning (X)
- `file:line` - Issue description

### 🔵 Suggestion (X)
- `file:line` - Issue description

**Recommendation**: Approve / Request Changes / Comment
```

## GitHub CLI Commands

```bash
gh pr view 123                    # View PR details
gh pr diff 123                    # View diff
gh pr review 123 --approve        # Approve
gh pr review 123 --request-changes -b "reason"
gh pr comment 123 --body "comment"
```

## See Also

- `code-reviewer` - Review local changes
- `/pr:view` - Quick PR overview
