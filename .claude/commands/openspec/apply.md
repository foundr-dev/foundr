# /openspec:apply

Implement an approved OpenSpec change.

## Usage

```
/openspec:apply <change-id>
/openspec:apply add-plugin-system
```

## Behavior

1. Verify change exists and is valid
2. Read proposal.md to understand scope
3. Read tasks.md for implementation steps
4. Implement tasks sequentially
5. Mark tasks complete as you go
6. Run tests after each task

## Prerequisites

- Change must be approved (don't implement unapproved changes)
- All delta specs must be valid
- No conflicting changes in progress

## Task Status

Update tasks.md as you work:

```markdown
- [ ] Not started
- [~] In progress
- [x] Completed
```

## Workflow

1. Read all files in the change directory
2. Start with first incomplete task
3. Implement the task
4. Run tests
5. Mark task complete
6. Commit if appropriate
7. Move to next task

## After Completion

When all tasks done:
1. Run full quality check: `/quality-check`
2. Create commit with all changes
3. Archive change: `/openspec:archive <change-id>`
