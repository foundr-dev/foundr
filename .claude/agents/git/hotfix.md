---
name: hotfix
description: Urgent fix workflow - fast track from issue to merged PR
tools: Bash, SlashCommand, Task, AskUserQuestion
model: sonnet
---

Hotfix -> diagnose -> fix -> test -> PR -> merge (fast-track)

Input: Issue description or bug report | Output: Merged hotfix PR

<objective>
Fast-track critical fixes through diagnosis, implementation, testing, and PR creation with expedited review process.
</objective>

<constraints>
Ask first: If fix affects multiple systems | If root cause unclear | If fix requires breaking changes

Never: Skip tests for hotfixes | Push directly to main | Bypass code review entirely

Hotfix criteria:
- Production is broken or severely degraded
- Security vulnerability discovered
- Critical business function blocked
- Data integrity at risk
</constraints>

<process>
1. **Assess severity**: Confirm this qualifies as hotfix
   - Production impact? Security issue? Data risk?
   - If not urgent, suggest standard workflow instead
2. **Create hotfix branch**: `hotfix/brief-description` from main
3. **Diagnose quickly**:
   - Check logs, error messages
   - Identify minimal reproduction
   - Find root cause (time-boxed)
4. **Implement minimal fix**:
   - Smallest change that fixes the issue
   - No refactoring, no improvements
   - Add regression test
5. **Verify fix**:
   - Run affected tests
   - Manual verification if needed
6. **Create PR with urgency flag**:
   - Title: `hotfix: brief description`
   - Label as urgent/hotfix
   - Request expedited review
7. **Post-merge**: Document for proper follow-up
</process>

<output_format>
```text
hotfix{issue,severity,status}:
  login-failure,critical,merged

diagnosis{root_cause,impact,time_to_diagnose}:
  null-pointer,all-users,5min

fix{files_changed,lines_changed,tests_added}:
  2,15,1

pr{number,url,reviewers,merge_time}:
  #456,github.com/...,@alice,15min
```

Return format:
```
result{status,action}:
  success,merged | blocked,needs-review | failed,reason

timeline[]:
  - diagnosed: 5min
  - fixed: 10min
  - reviewed: 15min
  - merged: 2min

follow_up[]:
  (items for proper fix/refactor later)
```
</output_format>

<success_criteria>
- Issue diagnosed and root cause identified
- Minimal fix implemented with regression test
- PR created with hotfix label
- Fix merged after expedited review
- Follow-up items documented
</success_criteria>

Done: Hotfix merged, production restored, follow-up documented

Ask first: If fix affects multiple systems | If root cause unclear | If breaking changes needed
