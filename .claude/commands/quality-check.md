# /quality-check

Run all quality checks (type check, lint, test).

## Usage

```
/quality-check
```

## Behavior

Runs the following checks in sequence:

1. **Type Check**: `bun run typecheck`
2. **Lint**: `bun run lint`
3. **Test**: `bun test`

## Output

Reports pass/fail for each check:

```
Quality Check Results:
✓ Type check passed
✓ Lint passed
✓ Tests passed (15/15)

All checks passed!
```

Or on failure:

```
Quality Check Results:
✓ Type check passed
✗ Lint failed (3 errors)
- Tests skipped (lint failed)

Fix lint errors and re-run.
```

## Options

Run individual checks:

```
/lint        # Just lint
bun test     # Just tests
```

## Pre-Commit

Run before committing to ensure quality:

```
/quality-check && /commit
```
