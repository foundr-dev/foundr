# /lint

Run Biome linter and optionally fix issues.

## Usage

```
/lint           # Check only
/lint --fix     # Auto-fix issues
```

## Behavior

### Check Mode (default)
```bash
bun run lint
```

Reports lint errors without modifying files.

### Fix Mode
```bash
bun run lint:fix
```

Automatically fixes fixable issues.

## Common Issues

### Import Order
Biome enforces import ordering. Use `--fix` to auto-sort.

### Unused Variables
Remove or prefix with `_` if intentionally unused.

### Type Issues
May need manual fixes - check Biome output.

## Configuration

Lint rules defined in `biome.json`.
