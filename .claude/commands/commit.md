# /commit

Create a conventional commit for staged changes.

## Usage

```
/commit
/commit fix: resolve login issue
```

## Behavior

1. Check for staged changes (`git diff --staged`)
2. If no staged changes, show status and ask what to stage
3. Analyze changes to determine appropriate commit type
4. Generate or use provided commit message
5. Create commit with attribution footer

## Commit Format

```
<type>(<scope>): <description>

<body>

🤖 Generated with Claude Code
```

## Types

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code restructuring
- `test:` - Tests
- `ci:` - CI/CD changes
- `chore:` - Maintenance

## Delegate To

Uses `commit-author` agent for complex commits.
