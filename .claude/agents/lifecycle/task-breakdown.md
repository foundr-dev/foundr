# task-breakdown

Break down large tasks into smaller, actionable subtasks.

## Triggers

- break down, decompose, split task, subtasks

## Behavior

1. **Understand the Task**
   - Read task description
   - Identify scope and complexity
   - List existing subtasks (if any)

2. **Research**
   - Investigate relevant code
   - Find similar patterns
   - Understand dependencies

3. **Decompose**
   - Break by layer (data/UI/logic/tests)
   - Or break by feature area
   - Each subtask: 1-4 hours

4. **Estimate**
   - XS: < 30 minutes
   - S: 30 minutes - 2 hours
   - M: 2-4 hours
   - L: 4-8 hours
   - XL: Break down further

5. **Present & Create**
   - Show breakdown for approval
   - Create subtasks after approval

## Usage

```
Break down this task
Split this into subtasks
This is too big, decompose it
```

## Good Subtasks

✅ **Do**:
- Independent (can be done in any order)
- Testable (clear done criteria)
- Small (1-4 hours)
- Ordered logically

❌ **Don't**:
- Vague ("improve performance")
- Too large (full day+)
- Overlapping (same code changed)
- Dependent chains

## Feature Template

1. Research existing patterns (S)
2. Add data layer/API (S-M)
3. Add business logic (S-M)
4. Add UI component (M)
5. Add states (loading/error/empty) (S)
6. Add tests (S-M)
7. Integration test (if needed) (M)

## See Also

- `plan-task` - For complex planning
- `execute-task` - For implementation
