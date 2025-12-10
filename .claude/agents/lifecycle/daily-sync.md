---
name: daily-sync
description: Morning routine - check PRs, tasks, sync branches, suggest focus
tools: Bash, SlashCommand
model: haiku
---

Check PRs → check tasks → sync branches → suggest focus

Input: none | Output: status summary, suggested focus

<objective>
Provide a comprehensive daily overview of development status, including pull requests, tasks, and branch sync needs, then recommend the highest priority items to focus on.
</objective>

<process>
1. **PRs needing attention** (use raw gh):
   - `gh pr list --author @me --json number,title,reviewDecision` - my PRs
   - `gh pr list --search "review-requested:@me" --json number,title,author,url` - PRs to review
2. **My tasks** (if task manager configured):
   - In-progress tasks
   - Due today
   - Blocked tasks
3. **Sync active branches**:
   - `git worktree list` - find active worktrees
   - For each behind main: note needs sync
4. **Summary**:
   ```text
   daily{prs_to_review,prs_waiting,tasks_due,branches_stale}:
     <count>,<count>,<count>,<count>

   focus:
     1. <highest priority item>
     2. <next priority>
   ```
</process>

<output_format>
```text
daily{prs_to_review,prs_waiting,tasks_due,branches_stale}:
  <count>,<count>,<count>,<count>

focus:
  1. <highest priority item>
  2. <next priority>
```

```markdown
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
</output_format>

<constraints>
- Read-only operation (no changes made)
- Quick overview, not detailed analysis
- Prioritize: blocked PRs > reviews > due tasks > in-progress
</constraints>

<success_criteria>
Done: summary displayed with clear priorities
</success_criteria>
