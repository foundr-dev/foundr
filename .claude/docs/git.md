# Git Conventions

Reference for git workflows and conventions.

## Branch Naming

Format: `<type>--<description>`

Examples:
- `feat--user-authentication`
- `fix--login-redirect`
- `docs--readme-update`

## Commit Prefixes

| Prefix | Use |
|--------|-----|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `improvement:` | Enhancement to existing feature |
| `docs:` | Documentation only |
| `style:` | Formatting, no code change |
| `refactor:` | Code change, no feature/fix |
| `perf:` | Performance improvement |
| `test:` | Adding/fixing tests |
| `build:` | Build system changes |
| `ci:` | CI configuration |
| `chore:` | Other changes |

## Commands

Most git operations: use git directly (Claude knows git natively).

**Slash commands** (add value over raw git):

- `/git:status` - concise status output
- `/git:push` - safe push with defaults
- `/git:sync` - fetch + rebase onto main
- `/commit` - AI-assisted commit message

**PR commands**:

- `/pr:view <n>` - PR overview
- `/pr:diff <n>` - PR changes
- `/pr:checks <n>` - CI status

## Agents

For complex workflows, delegate to specialized agents:

- `commit-author` - conventional commits
- `rebase-helper` - safe rebasing
- `conflict-resolver` - merge/rebase conflicts
- `pr-reviewer` - review PRs

## GitHub CLI

```bash
gh pr create --base main      # Create PR
gh pr view <n>                # View PR
gh pr merge <n>               # Merge PR
gh pr checks <n>              # Check CI status
```

## Rebasing

Keep branches up to date:

```bash
git fetch origin
git rebase origin/main
git push --force-with-lease
```

Or use `/git:sync` command.

## Safety Rules

- Use `--force-with-lease` not `--force`
- Don't push directly to main
- Commit before rebasing
- Review changes before committing

## See Also

- [Worktrees](./worktree.md)
