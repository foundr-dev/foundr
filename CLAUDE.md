<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `openspec/AGENTS.md` when the request:

- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts
- Sounds ambiguous and you need the authoritative spec before coding

Use `openspec/AGENTS.md` to learn:

- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# foundr - Claude Context

A CLI tool for scaffolding AI-assisted development workflows.

## Quick Start

```bash
bun run dev --help     # Run CLI in development
bun test               # Run tests
bun run lint           # Check code quality
/quality-check         # Run all checks
```

## Delegation Rules

**You are an orchestrator.** Delegate to specialized agents:

| Task | Agent |
|------|-------|
| Understanding code | `investigate` |
| Writing/fixing tests | `test` |
| Code review | `review` |
| Creating commits | `commit-author` |
| Debugging issues | `debug` |
| Refactoring | `refactor` |

## Tech Stack

- **Runtime**: Bun (TypeScript native)
- **CLI**: Commander.js
- **Linting**: Biome
- **Testing**: Bun test
- **Config**: YAML

## Project Structure

```
src/
├── cli/             # CLI commands
├── core/            # Core framework (types, registry)
├── adaptors/        # AI tool adaptors (Claude, OpenCode)
├── analysers/       # Project analysis
├── generators/      # File generation
└── index.ts         # Library exports

openspec/            # Spec-driven development
├── AGENTS.md        # OpenSpec workflow
├── project.md       # Project context
├── specs/           # Current specifications
└── changes/         # Proposed changes

.claude/             # Claude tooling
├── agents/          # Specialized agents
├── commands/        # Slash commands
├── registry.toon    # Component registry
└── README.md        # Tooling docs
```

## Commands

```bash
/commit              # Create conventional commit
/quality-check       # Type check + lint + test
/lint                # Run linter
/openspec:proposal   # Create change proposal
/openspec:apply      # Implement approved change
/openspec:archive    # Archive deployed change
```

## Git Workflow

- **Commit prefixes**: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `ci:`, `chore:`
- **Branch format**: `<type>--<description>`
- **Main branch**: `master`

## Git Hooks

Pre-commit and pre-push hooks enforce quality:
- Pre-commit: Type check + lint
- Pre-push: Tests

## Key Patterns

### Registry System
Single source of truth in `.claude/registry.toon` for agents, commands, skills, hooks.

### Adaptors
Abstract interfaces for AI tools in `src/adaptors/`. Each adaptor generates tool-specific files.

### Smart Defaults
Project analysis in `src/analysers/` detects languages, frameworks, CI tools to recommend configuration.

## Documentation

- [.claude/README.md](.claude/README.md) - Claude tooling
- [openspec/AGENTS.md](openspec/AGENTS.md) - OpenSpec workflow
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guide
