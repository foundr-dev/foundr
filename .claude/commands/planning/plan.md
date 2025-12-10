# /planning:plan

Create an executable implementation plan with phased tasks.

## Usage

```
/planning:plan <feature or fix description>
/planning:plan add dark mode toggle to settings
/planning:plan refactor authentication to use JWT
```

## Behavior

1. **Check Context**
   - Use findings from `/planning:research` if available
   - Otherwise, do quick investigation

2. **Define Objective**
   - Clear goal statement
   - Success criteria

3. **Identify Scope**
   - Files to modify
   - Systems affected
   - Dependencies

4. **Create Phases**
   - Break into 2-3 phases
   - Max 2-3 tasks per phase
   - Each task should be completable in 1-4 hours

5. **Define Risks**
   - What could go wrong
   - Mitigation strategies

6. **Present for Approval**
   - Show plan before implementation
   - Allow adjustments

## Output Format

```
## Plan: <Title>

### Objective
<Clear goal statement>

### Success Criteria
- [ ] Criterion 1
- [ ] Criterion 2

### Phase 1: <Name>
1. Task 1 (estimate)
2. Task 2 (estimate)

### Phase 2: <Name>
1. Task 1 (estimate)
2. Task 2 (estimate)

### Risks
- Risk 1: Mitigation
- Risk 2: Mitigation
```

## After Approval

- Significant changes → `/openspec:proposal`
- Simple changes → Direct to implementation

## See Also

- `/planning:research` - Research first
- `plan-task` agent - For complex planning
