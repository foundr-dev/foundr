# daily-sync

Morning routine - check PRs, tasks, sync branches, suggest focus.

## Triggers

- morning, daily sync, what's my status, start my day

## Behavior

1. **Check PRs**
   - My PRs: `gh pr list --author @me`
   - PRs to review: `gh pr list --search "review-requested:@me"`

2. **Check Tasks** (if task manager configured)
   - In-progress tasks
   - Blocked tasks
   - Due today

3. **Check Branches**
   - List active worktrees
   - Note branches behind main

4. **Suggest Focus**
   - Prioritize: blocked PRs > reviews > due tasks > in-progress

## Usage

```
Good morning
What's my status?
Daily sync
Start my day
```

## Output Format

```
## Daily Summary

### PRs
- Waiting for review: X
- Need your review: X

### Tasks
- In progress: X
- Due today: X
- Blocked: X

### Branches
- Need sync: X

## Suggested Focus
1. [Highest priority item]
2. [Next priority item]
3. [Third priority item]
```

## GitHub CLI Commands

```bash
# My PRs
gh pr list --author @me --json number,title,reviewDecision

# PRs requesting my review
gh pr list --search "review-requested:@me" --json number,title,author
```

## Constraints

- Read-only operation (no changes made)
- Quick overview, not detailed analysis

## See Also

- `/ship` - Ship completed work
- `start-work` - Begin work on a task
