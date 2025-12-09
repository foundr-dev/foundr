# Project Context

## Purpose

foundr - A CLI tool and library for scaffolding AI-assisted development workflows. Packages battle-tested patterns into a reusable, tool-agnostic system for Claude Code, OpenCode, and other AI assistants.

## Tech Stack

- **Runtime**: Bun (TypeScript native, single executable compilation)
- **CLI Framework**: Commander.js
- **Config Format**: YAML
- **Templating**: Handlebars
- **Linting**: Biome
- **Testing**: Bun test

## Project Structure

```text
src/
├── cli/                 # CLI commands
│   ├── index.ts         # Entry point
│   └── commands/        # Individual commands
├── core/                # Core framework
│   ├── types.ts         # Type definitions
│   ├── registry/        # Registry parsing/validation
│   └── recommendation.ts # Config recommendations
├── adaptors/            # AI tool adaptors
│   ├── claude/          # Claude Code adaptor
│   ├── opencode/        # OpenCode adaptor
│   └── generic/         # Generic markdown adaptor
├── analysers/           # Project analysis
├── generators/          # File generation
├── integrations/        # Task manager plugins
├── spec-systems/        # Spec system adaptors
└── templates/           # User-facing templates
```

## Key Concepts

- **Registry**: YAML-based single source of truth for agents, commands, skills, hooks
- **Adaptors**: Support different AI tools with common interface
- **Plugins**: Extensible system for task managers, language packs
- **Presets**: minimal, standard, full configurations
- **Smart Defaults**: Project analysis to recommend configuration

## Important Constraints

- Bun-first (use Bun APIs over Node when available)
- Multi-tool from day 1 (Claude + OpenCode)
- Plugin architecture for all integrations
- Semantic versioning for updates

## Git Workflow

- Commit prefixes: `feat:`, `fix:`, `improvement:`, `test:`, `refactor:`, `docs:`, `ci:`, `chore:`
- Branch format: `<type>--<description>`
- Main branch: `master`

## Detailed Specifications

For detailed conventions and patterns, see the specs in `openspec/specs/`:

- **[CLI](./specs/cli/spec.md)** - Command structure, options, output format
- **[Registry](./specs/registry/spec.md)** - Registry format, validation rules
- **[Adaptors](./specs/adaptors/spec.md)** - AI tool adaptor interface
- **[Plugins](./specs/plugins/spec.md)** - Plugin system architecture

## Spec Writing Guidelines

Every proposal MUST include:

1. **Acceptance Scenarios** - WHEN/THEN format, testable
2. **Constraints** - What NOT to do
3. **Edge Cases** - Invalid inputs, missing config, network failures
4. **CLI Examples** - Exact command invocations and expected output
5. **File Locations** - Exact paths for new files
6. **Similar Code Analysis** - DRY check before implementing
