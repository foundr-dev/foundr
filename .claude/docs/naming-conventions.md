# Naming Conventions

Choose style -> apply consistently -> check cross-references

## Slash Commands

Colon style (`/namespace:action`) - simple read/CRUD: `/worktree:list` | `/git:status` | `/pr:view`

Dash style (`/action-noun`) - complex multi-step: `/worktree-create` | `/validate-repo`

Top-level - workflow commands: `/commit` | `/ship` | `/complete` | `/start`

## Files

Scripts organised in subdirs: `scripts/git/status.sh` | `scripts/worktree/list.sh`

Agent files use dashes: `complete-task.md` | `start-work.md`

Command files match command name: `/worktree:list` -> `worktree/list.md`

## Branches

Double-dash separator: `fix--docker-frontend-vite-schema` | `improvement--git-scripts` | `feat--new-dashboard`

## Directories

Lowercase with dashes: `.claude/scripts/git/` | `src/components/chart-axis-provider/`

## Cross-Reference Rule

When command references script:

- Command: `/worktree:audit` (colon for user-facing)
- Script: `worktree-audit.sh` (dash for filename)
- Reference in command file: `bash "$(git rev-parse --show-toplevel)/.claude/scripts/worktree-audit.sh"`
