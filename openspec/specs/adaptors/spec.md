# Adaptors Specification

Adaptors translate foundr's abstract patterns into tool-specific configurations.

## Adaptor Interface

```typescript
interface AIToolAdaptor {
  name: string;
  version: string;

  // Directory structure
  configDir: string;           // e.g., '.claude', '.opencode'
  agentFormat: 'markdown' | 'yaml' | 'json';

  // Detection
  detect(projectRoot: string): boolean;
  getExistingConfig(projectRoot: string): Config | null;

  // Generation
  generateAgentFile(agent: AgentDefinition): string;
  generateCommandFile(command: CommandDefinition): string;
  generateSkillFile(skill: SkillDefinition): string;
  generateContextFile(config: FoundrConfig, analysis: ProjectAnalysis | null): string;

  // Validation
  validate(projectRoot: string): ValidationResult;
}
```

## Built-in Adaptors

### Claude Code Adaptor

**Config Directory:** `.claude/`
**Context File:** `CLAUDE.md`
**Agent Format:** Markdown

**Directory Structure:**
```
.claude/
├── registry.yaml
├── README.md
├── agents/
│   ├── git/
│   └── tools/
├── commands/
├── skills/
├── hooks/
└── docs/
```

**Detection:**
- `.claude/` directory exists
- `CLAUDE.md` exists
- Claude Code settings present

**Agent File Format:**
```markdown
# Agent Name

Description of what the agent does.

## Triggers
- keyword1
- keyword2

## Workflow
1. Step one
2. Step two

## Tools
- Tool1
- Tool2
```

### OpenCode Adaptor

**Config Directory:** `.opencode/`
**Context File:** `AGENTS.md`
**Agent Format:** Markdown (different structure)

**Directory Structure:**
```
.opencode/
├── config.yaml
└── agents/

AGENTS.md (root level)
```

**Detection:**
- `.opencode/` directory exists
- `AGENTS.md` exists

**AGENTS.md Format:**
```markdown
# Agents

## agent-name

Description of the agent.

**Triggers**: keyword1, keyword2

### Workflow
1. Step one
2. Step two
```

### Generic Adaptor

**Config Directory:** `.ai-dev/`
**Context File:** `AI-CONTEXT.md`
**Agent Format:** Markdown

For AI assistants without specific tooling support.

**Directory Structure:**
```
.ai-dev/
├── agents/
├── commands/
└── workflows/

AI-CONTEXT.md (root level)
```

## Adaptor Selection

```typescript
function selectAdaptors(config: FoundrConfig): AIToolAdaptor[] {
  const adaptors: AIToolAdaptor[] = [];

  if (config.aiTools.includes('claude')) {
    adaptors.push(new ClaudeAdaptor());
  }

  if (config.aiTools.includes('opencode')) {
    adaptors.push(new OpenCodeAdaptor());
  }

  if (config.aiTools.includes('generic')) {
    adaptors.push(new GenericAdaptor());
  }

  return adaptors;
}
```

## Generation Flow

```
┌─────────────┐    ┌──────────────┐    ┌─────────────────┐
│   foundr    │───▶│   Template   │───▶│    Adaptor      │
│   config    │    │   Engine     │    │   Transform     │
└─────────────┘    └──────────────┘    └─────────────────┘
                                              │
                         ┌────────────────────┼────────────────────┐
                         ▼                    ▼                    ▼
                   ┌──────────┐         ┌──────────┐         ┌──────────┐
                   │  Claude  │         │ OpenCode │         │ Generic  │
                   │  Files   │         │  Files   │         │  Files   │
                   └──────────┘         └──────────┘         └──────────┘
```

## Template Variables

Templates can use these variables:

| Variable | Description |
|----------|-------------|
| `{{projectName}}` | Project name from package.json |
| `{{projectType}}` | Detected project type |
| `{{languages}}` | Detected languages |
| `{{frameworks}}` | Detected frameworks |
| `{{services}}` | Services (for monorepos) |
| `{{gitBranch}}` | Main git branch |
| `{{aiTools}}` | Configured AI tools |
| `{{specSystem}}` | Configured spec system |

## Validation

Each adaptor validates:

1. **Structure** - Required directories exist
2. **Registry** - Valid and references existing files
3. **Agents** - Have required sections
4. **Commands** - Have required sections
5. **Consistency** - No orphaned files

## Adding New Adaptors

To add support for a new AI tool:

1. Implement the `AIToolAdaptor` interface
2. Register in `adaptors/index.ts`
3. Add detection logic
4. Create file format templates
5. Add to CLI options

```typescript
// adaptors/my-tool.ts
export class MyToolAdaptor implements AIToolAdaptor {
  name = 'my-tool';
  version = '1.0.0';
  configDir = '.my-tool';
  agentFormat = 'yaml' as const;

  detect(projectRoot: string): boolean {
    return existsSync(join(projectRoot, '.my-tool'));
  }

  // ... implement other methods
}
```

## Future Adaptors

Planned adaptor support:

- **Cursor** - Cursor IDE integration
- **Continue** - Continue.dev integration
- **Aider** - Aider CLI integration
- **Cody** - Sourcegraph Cody integration

Community contributions welcome via plugin system.
