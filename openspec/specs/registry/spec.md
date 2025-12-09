# Registry Specification

The registry is the single source of truth for all Claude Code components (agents, commands, skills, hooks).

## File Format

The registry uses YAML format for broad compatibility.

### Location

`.claude/registry.yaml`

### Schema

```yaml
version: "1.0.0"
preset: standard

agents:
  <agent-id>:
    path: string          # Relative path from .claude/
    triggers: string[]    # Keywords that activate this agent
    requires: string[]    # Dependencies (optional)
    description: string   # Brief description

commands:
  <command-id>:
    path: string
    triggers: string[]
    description: string

skills:
  <skill-id>:
    path: string
    triggers: string[]
    description: string

hooks:
  <hook-id>:
    path: string
    event: string         # Event type (user_prompt_submit, etc.)
    description: string
```

## Component Types

### Agents

Specialized task handlers invoked via the Task tool.

**Required Fields:**
- `path` - Path to agent markdown file
- `description` - What the agent does

**Optional Fields:**
- `triggers` - Keywords for automatic selection
- `requires` - Other agents this depends on

**Example:**
```yaml
agents:
  commit-author:
    path: agents/git/commit-author.md
    triggers:
      - commit
      - message
      - conventional
    description: Create well-structured conventional commits
```

### Commands

Slash commands for quick actions.

**Required Fields:**
- `path` - Path to command markdown file
- `description` - What the command does

**Optional Fields:**
- `triggers` - Alternative invocations

**Example:**
```yaml
commands:
  commit:
    path: commands/commit.md
    triggers:
      - commit
    description: Create conventional commit
```

### Skills

On-demand context loaders.

**Required Fields:**
- `path` - Path to skill directory (containing SKILL.md)
- `triggers` - Keywords that suggest loading this skill
- `description` - What context the skill provides

**Example:**
```yaml
skills:
  bun-patterns:
    path: skills/bun-patterns/SKILL.md
    triggers:
      - bun
      - runtime
      - api
    description: Bun runtime patterns and APIs
```

### Hooks

Event handlers for automation.

**Required Fields:**
- `path` - Path to hook script
- `event` - Event type to listen for
- `description` - What the hook does

**Supported Events:**
- `user_prompt_submit` - User submits a prompt
- `pre_tool_use` - Before a tool is executed
- `session_start` - Claude session starts

**Example:**
```yaml
hooks:
  openspec-hint:
    path: hooks/openspec-hint.sh
    event: user_prompt_submit
    description: Suggest OpenSpec for significant changes
```

## TOON Format (Alternative)

For projects using TOON format (like Grid Insights), the registry can alternatively be stored as `registry.toon`:

```toon
agent{id,path,triggers,requires,description}:
  commit-author,agents/git/commit-author.md,"commit message",none,Create conventional commits

command{id,path,triggers,description}:
  commit,commands/commit.md,"commit",Create conventional commit
```

## Validation Rules

1. **Unique IDs** - No duplicate IDs within a component type
2. **Valid paths** - All referenced files must exist
3. **Required fields** - All required fields must be present
4. **Valid events** - Hook events must be recognized

## Registry Operations

### Parse

```typescript
function parseRegistry(content: string): Registry
```

Parse YAML content into a Registry object.

### Serialize

```typescript
function serializeRegistry(registry: Registry, version?: string): string
```

Serialize a Registry object to YAML.

### Merge

```typescript
function mergeRegistries(base: Registry, override: Registry): Registry
```

Merge two registries, with override taking precedence.

### Validate

```typescript
function validateRegistry(registry: Registry): { valid: boolean; errors: string[] }
```

Validate a registry for common issues.

## File Structure

```
.claude/
├── registry.yaml          # Component registry
├── agents/
│   ├── git/
│   │   └── commit-author.md
│   └── tools/
│       ├── investigate.md
│       └── test.md
├── commands/
│   ├── commit.md
│   └── quality-check.md
├── skills/
│   └── bun-patterns/
│       └── SKILL.md
└── hooks/
    └── openspec-hint.sh
```
