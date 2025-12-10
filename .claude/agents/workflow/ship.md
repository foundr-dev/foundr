---
name: ship
description: Commit changes, create PR, and update Asana in one workflow
tools: Bash, SlashCommand, Task
model: sonnet
---

Pre-flight → commit → push → PR → update task

Input: Task ID (optional) | Output: PR URL

<objective>
Commit changes, push to remote, and create a pull request with proper linking to task management.
</objective>

<process>
## 1. PRE-FLIGHT CHECKS

- Verify on feature branch (not main)
- Run quality checks:
  - `bun test` - all pass
  - `bun lint` - no errors
- Check for uncommitted changes

**On failure**: STOP, report issue, get approval to continue

## 2. COMMIT CHANGES

- Stage all relevant changes
- Delegate to `commit-author` agent for message
- Include attribution footer

## 3. PUSH TO REMOTE

```bash
git push -u origin HEAD
```

Handle push errors:
- Behind remote → rebase first
- Protected branch → verify correct branch

## 4. CREATE PULL REQUEST

```bash
gh pr create --base main --title "<title>" --body "<body>"
```

PR body includes:
- Summary of changes
- Test plan
- Link to task (if provided)

## 5. UPDATE TASK (if configured)

- Move task to "In Review"
- Add PR link as comment
</process>

<output_format>
```text
ship{branch,commits,pr}:
  <branch>,<count>,#<number>
```

Return format:
```
result{status,action}:
  success,continue | blocked,needs-input | failed,reason

pr_url:
  https://github.com/...
```
</output_format>

<delegation>
- `commit-author` - Generate commit message
</delegation>

<anti_patterns>
**NEVER:**
- Ship without running quality checks
- Ship from main branch
- Skip commit message review

**ALWAYS:**
- Run tests before shipping
- Create PR with proper description
- Link to task if ID provided
</anti_patterns>

<success_criteria>
- Quality checks pass
- Changes committed
- Branch pushed
- PR created with link
- Task updated (if configured)
</success_criteria>

Done: PR created at <url>, task updated

Ask first: If quality checks fail | Commit message approval
