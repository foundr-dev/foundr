# /pr:view

Show concise PR information.

## Usage

```
/pr:view <number>
/pr:view 123
```

## Behavior

Fetch and display PR details:

```bash
gh pr view <number> --json number,title,state,author,baseRefName,headRefName,reviewDecision,additions,deletions,changedFiles
```

## Output Format

```
PR #123: Title of the PR
Author: username | Base: main ← feature-branch
State: OPEN | Review: APPROVED
+100 -50 | 5 files changed

URL: https://github.com/org/repo/pull/123
```

## Fields

- **Number & Title**: PR identifier
- **Author**: Who created it
- **Base/Head**: Target and source branches
- **State**: OPEN, MERGED, CLOSED
- **Review Decision**: APPROVED, CHANGES_REQUESTED, REVIEW_REQUIRED
- **Stats**: Lines added/removed, files changed

## See Also

- `/pr:checks` - CI status
- `/pr:diff` - View changes
- `pr-reviewer` - Full review
