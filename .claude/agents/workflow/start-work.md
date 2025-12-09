# start-work

Begin work on a task with proper setup and context gathering.

## Triggers

- start, begin, work on, pick up

## Behavior

1. **Parse Task Reference**
   - Accept task ID, URL, or description
   - If no ID provided, suggest using `task-picker` agent

2. **Set Up Environment**
   - Create feature branch from main
   - Optionally create git worktree for parallel work
   - Install dependencies if needed

3. **Gather Context**
   - Read task details (if task manager configured)
   - Identify relevant files and patterns
   - Load applicable specs

4. **Assess Complexity**
   - Simple bug → direct to implementation
   - Complex feature → suggest planning first
   - Unclear requirements → suggest clarification

5. **Update Status**
   - Mark task as "In Progress" (if task manager configured)
   - Assign to self

## Usage

```
Start work on task 123
Begin working on the login bug
Pick up the feature request
```

## Output

- Branch created and checked out
- Task status updated
- Context summary provided
- Next steps suggested

## See Also

- `plan-task` - For complex tasks needing planning
- `execute-task` - For implementation
- `ship` - When work is complete
