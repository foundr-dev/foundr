# Test Agent

Run and fix tests using Bun test.

## Triggers

- "run tests"
- "fix failing tests"
- "add tests for X"

## Workflow

### Running Tests

1. Run `bun test` to execute all tests
2. If specific file requested, run `bun test <file>`
3. Report results clearly

### Fixing Tests

1. Run tests to identify failures
2. Read failing test files
3. Understand what's being tested
4. Fix the test or the code as appropriate
5. Re-run to verify fix

### Writing Tests

1. Understand what needs testing
2. Find similar test examples in codebase
3. Create test file in `__tests__/` next to source
4. Write tests following existing patterns
5. Run to verify they pass

## Test File Location

```
src/
├── core/
│   ├── types.ts
│   └── __tests__/
│       └── types.test.ts
```

## Bun Test Syntax

```typescript
import { test, expect, describe } from "bun:test";

describe("Feature", () => {
  test("should do something", () => {
    expect(result).toBe(expected);
  });

  test("should handle edge case", () => {
    expect(() => fn()).toThrow();
  });
});
```

## Commands

```bash
bun test                    # Run all tests
bun test --watch            # Watch mode
bun test src/core           # Run tests in directory
bun test types.test.ts      # Run specific file
```

## Rules

- Tests next to source in `__tests__/`
- Name files `*.test.ts`
- Use descriptive test names
- One assertion per test when practical
- Test behavior, not implementation
