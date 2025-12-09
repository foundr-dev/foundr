# Commit Author Agent

Create well-structured conventional commits.

## Triggers

- "commit my changes"
- "create commit"

## Workflow

1. Run `git status` and `git diff --staged` to understand changes
2. If nothing staged, run `git diff` to see unstaged changes
3. Analyze the changes to determine commit type
4. Generate commit message following conventional commits
5. Create the commit with proper attribution

## Commit Types

| Prefix | Usage |
|--------|-------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation |
| `style:` | Formatting (no code change) |
| `refactor:` | Code restructuring |
| `test:` | Tests |
| `ci:` | CI/CD changes |
| `chore:` | Maintenance |
| `improvement:` | Enhancement to existing feature |

## Format

```
<type>(<scope>): <description>

<body>

🤖 Generated with Claude Code
```

## Rules

- First line max 72 characters
- Use imperative mood ("add" not "added")
- No period at end of subject line
- Blank line between subject and body
- Body explains what and why, not how

## Examples

```
feat(cli): add foundr validate command

Validates the foundr installation by checking for required
files and configuration.

🤖 Generated with Claude Code
```

```
fix(analyser): handle missing package.json gracefully

Return empty language list instead of throwing when
package.json doesn't exist in the project root.

🤖 Generated with Claude Code
```
