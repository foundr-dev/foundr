# /pr:checks

Show CI check status for a PR.

## Usage

```
/pr:checks <number>
/pr:checks 123
```

## Behavior

Fetch and display CI status:

```bash
gh pr checks <number>
```

## Output Format

```
PR #123 CI Status

✓ build (passed)
✓ lint (passed)
✓ test (passed)
✗ deploy-preview (failed)
○ security-scan (pending)

Overall: 3 passed, 1 failed, 1 pending
```

## Status Icons

- ✓ Passed
- ✗ Failed
- ○ Pending
- ⊘ Skipped

## Common Checks

- **build**: Compilation/build step
- **lint**: Code style/quality
- **test**: Unit/integration tests
- **typecheck**: Type checking
- **deploy-preview**: Preview deployment

## Troubleshooting Failures

For failed checks:
```bash
gh run view <run-id> --log-failed
```

## See Also

- `/pr:view` - PR overview
- `pr-reviewer` - Full review
