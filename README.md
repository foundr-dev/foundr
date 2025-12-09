# foundr

> Forge your AI development workflow

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Bun](https://img.shields.io/badge/runtime-Bun-f9f1e1.svg)](https://bun.sh)

**foundr** is an open-source scaffolding tool for AI-assisted development workflows. It packages battle-tested patterns into a reusable, tool-agnostic system that works with Claude Code, OpenCode, and other AI assistants.

## Features

- **Multi-Tool Support** - Works with Claude Code, OpenCode, and generic AI assistants from day one
- **Spec System Agnostic** - Supports OpenSpec, SpecKit, or no spec system
- **Tech Stack Agnostic** - Adapts to any language or framework
- **Smart Defaults** - Analyses your project and recommends configuration
- **Versionable** - Update your AI infrastructure when foundr updates
- **Plugin Architecture** - Extend with community adaptors and integrations

## Quick Start

```bash
# Install globally
bun add -g foundr

# Or with npm
npm install -g foundr

# Initialize in your project
cd your-project
foundr init
```

## What `foundr init` Does

```
$ foundr init

Analysing your repository...

Detected:
  ├─ Structure: Monorepo (3 services)
  ├─ Languages: TypeScript (60%), Python (40%)
  ├─ Git: master branch, conventional commits
  ├─ CI: GitHub Actions
  └─ PM Tools: Asana (detected config)

Recommended Configuration:

  AI Tools:        Claude Code + OpenCode
  Spec System:     OpenSpec
  Task Manager:    Asana
  Preset:          standard

Accept recommended configuration? [Y/n/customize]
> Y

Generating foundr infrastructure...
  ├─ Created .claude/README.md
  ├─ Created .claude/registry.yaml
  ├─ Created .claude/agents/... (12 agents)
  ├─ Created .claude/commands/... (24 commands)
  ├─ Created CLAUDE.md
  └─ Created service-specific configs

Done! Run `foundr validate` to check your setup.
```

## CLI Commands

| Command | Description |
|---------|-------------|
| `foundr init` | Scaffold AI infrastructure with smart defaults |
| `foundr validate` | Validate your installation |
| `foundr update` | Update to latest patterns |
| `foundr diff` | Preview changes before updating |
| `foundr plugins` | Manage plugins and adaptors |

## Presets

Choose your level of infrastructure:

| Preset | What's Included |
|--------|-----------------|
| **minimal** | CLAUDE.md + basic structure |
| **standard** | Full agent set, commands, skills (recommended) |
| **full** | Everything + mental models, lifecycle agents |

## Supported AI Tools

- **Claude Code** - Full support with agents, commands, skills, hooks
- **OpenCode** - AGENTS.md format, compatible patterns
- **Generic** - Pure markdown for any AI assistant

## Supported Integrations

### Task Management
- Asana (built-in)
- GitHub Issues (built-in)
- Community plugins: Jira, Linear, Notion, etc.

### Spec Systems
- OpenSpec
- SpecKit
- None (documentation-only)

## Plugin Architecture

Extend foundr with community plugins:

```bash
# Search for plugins
foundr plugins search jira

# Install a plugin
foundr plugins add foundr-plugin-linear

# Create your own
foundr plugins create my-plugin --type task-manager
```

## What's Included

### Workflow Agents
Automated task lifecycle: `start-work`, `execute-task`, `ship`, `complete-task`

### Git Agents
Version control helpers: `commit-author`, `rebase-helper`, `conflict-resolver`

### Lifecycle Agents
Developer routines: `daily-sync`, `standup`, `task-picker`, `sprint-planner`

### Commands
Quick actions: `/commit`, `/ship`, `/morning`, `/pr:view`, `/asana:task`

### Skills
On-demand context loading for testing, patterns, troubleshooting

### Hooks
Automated event handlers for session start, prompt submission, tool use

## Documentation

- [Getting Started](docs/getting-started.md)
- [Configuration](docs/configuration.md)
- [Plugin Development](docs/plugins.md)
- [Template Reference](docs/templates.md)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

## License

MIT - see [LICENSE](LICENSE)

---

**foundr** - Forge your AI development workflow
