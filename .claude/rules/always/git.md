# Git Conventions

**Branch**: `master` | **Naming**: `<type>--<desc>` | **Co-author**: auto-added by hook

## Branch Types

- `feat--` - New features
- `fix--` - Bug fixes
- `improvement--` - Enhancements
- `refactor--` - Code restructuring
- `docs--` - Documentation
- `test--` - Test additions/changes

## Commit Prefixes

- `feat:` - New feature
- `fix:` - Bug fix
- `improvement:` - Enhancement
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code restructuring
- `test:` - Test additions
- `build:` - Build system
- `ci:` - CI configuration
- `chore:` - Maintenance

## Safety

- Use `--force-with-lease` not `--force`
- Prefer `git stash` before `git reset --hard`
- Use `-d` not `-D` for branch deletion
- Create PRs instead of pushing directly to master
