# CLI Specification

The foundr CLI is the primary interface for initializing and managing AI development infrastructure.

## Commands

### `foundr init`

Initialize foundr in a project directory.

**Options:**
- `--yes, -y` - Accept all defaults without prompting
- `--preset <name>` - Use a specific preset (minimal, standard, full)
- `--analyze/--no-analyze` - Enable/disable project analysis

**Workflow:**
1. Analyse project (unless `--no-analyze`)
2. Display detected information
3. Generate recommendation
4. Prompt for confirmation (unless `--yes`)
5. Generate infrastructure files
6. Display created files

**Output Files:**
- `foundr.yaml` - Configuration file
- `CLAUDE.md` - Project context for AI assistants
- `.claude/` - Claude Code infrastructure
- `AGENTS.md` - OpenCode configuration (if enabled)

### `foundr validate`

Validate the current foundr installation.

**Options:**
- `--fix` - Attempt to auto-fix issues

**Checks:**
- `foundr.yaml` exists and is valid
- `CLAUDE.md` exists
- `.claude/` directory structure is correct
- `registry.yaml` exists and is valid
- All referenced files exist

**Exit Codes:**
- `0` - All checks passed
- `1` - Errors found

### `foundr update`

Update foundr infrastructure to latest patterns.

**Options:**
- `--preview` - Show changes without applying
- `--force` - Skip confirmation

**Workflow:**
1. Check current version
2. Fetch latest patterns
3. Generate diff
4. Prompt for confirmation
5. Apply updates
6. Update version manifest

### `foundr add <type> <name>`

Add a new component to the project.

**Types:**
- `agent` - Add a new agent
- `command` - Add a new slash command
- `skill` - Add a new skill
- `hook` - Add a new hook

**Options:**
- `--template <name>` - Use a specific template
- `--path <path>` - Override default path

## Configuration

### `foundr.yaml`

```yaml
version: "1.0.0"
aiTools:
  - claude
  - opencode
specSystem: openspec
taskManager: null
preset: standard
projectType: cli-tool
teamSize: solo
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `version` | string | yes | Config schema version |
| `aiTools` | string[] | yes | Enabled AI tools |
| `specSystem` | string | no | Spec system (openspec, speckit, null) |
| `taskManager` | string | no | Task management integration |
| `preset` | string | yes | Infrastructure preset |
| `projectType` | string | yes | Project type |
| `teamSize` | string | yes | Team size category |

## Presets

### minimal

- CLAUDE.md only
- No agents or commands
- Basic .claude/ structure

### standard

- Full agent set (git, tools)
- Essential commands
- Registry
- Documentation

### full

- All agents
- All commands
- Skills
- Hooks
- Mental model commands

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | Validation/execution error |
| 2 | Configuration error |
| 130 | User cancelled (Ctrl+C) |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `FOUNDR_CONFIG` | Override config file path |
| `FOUNDR_NO_COLOR` | Disable colored output |
| `FOUNDR_DEBUG` | Enable debug logging |
