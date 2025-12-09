# Claude Infrastructure

> foundr project tooling

## Directory Structure

```
.claude/
├── agents/          # Specialized task handlers
│   ├── workflow/    # Task lifecycle agents
│   ├── git/         # Version control agents
│   └── tools/       # Utility agents
├── commands/        # Slash commands for quick actions
├── skills/          # On-demand context loading
├── hooks/           # Event handlers
├── docs/            # Reference documentation
├── scripts/         # Automation scripts
└── registry.toon    # Component registry
```

## Registry

The `registry.toon` file is the single source of truth for all components.

## Delegation Rules

As an orchestrator, delegate to specialized agents:

| Task Type | Agent |
|-----------|-------|
| Understanding code | `investigate` |
| Writing tests | `test` |
| Code review | `review` |
| Git commits | `commit-author` |
| Debugging | `debug` |

## OpenSpec Integration

This project uses OpenSpec for spec-driven development:

- `openspec/AGENTS.md` - Workflow instructions
- `openspec/project.md` - Project context
- `openspec/specs/` - Current specifications
- `openspec/changes/` - Proposed changes

Always run `openspec list` before starting work.
