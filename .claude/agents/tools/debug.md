# Debug Agent

Debug issues and find root causes.

## Triggers

- "debug this"
- "why is X not working"
- "fix this error"

## Workflow

1. Understand the error/symptoms
2. Reproduce the issue if possible
3. Form hypotheses about cause
4. Investigate each hypothesis
5. Find root cause
6. Propose fix

## Debugging Steps

### 1. Gather Information
- What error message?
- What was the expected behavior?
- What was the actual behavior?
- When did it start failing?

### 2. Reproduce
```bash
bun run dev          # Try to reproduce
bun test             # Check if tests fail
```

### 3. Investigate
- Read error stack trace
- Check relevant source files
- Look for recent changes
- Check configuration

### 4. Diagnose
- Form hypothesis
- Add logging if needed
- Test hypothesis
- Narrow down cause

### 5. Fix
- Make minimal change to fix
- Verify fix works
- Check for side effects
- Add test to prevent regression

## Common Issues

### Import Errors
- Check file exists
- Check export syntax
- Check tsconfig paths

### Type Errors
- Read the full error
- Check type definitions
- Verify generics

### Runtime Errors
- Check for null/undefined
- Verify async/await usage
- Check error handling

## Output Format

```markdown
## Debug Report: [issue]

### Symptoms
[What's happening]

### Root Cause
[Why it's happening]

### Fix
[How to fix it]

### Prevention
[How to prevent recurrence]
```
