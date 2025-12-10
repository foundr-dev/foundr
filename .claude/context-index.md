# Context Index

Quick lookup for specs and context files by task type.

## Priority Levels

```toon
priority{level,meaning,action}:
  critical → "MUST load before ANY implementation" → "Fail if not loaded"
  high → "Load for complex tasks and delegation" → "Warn if skipped"
  medium → "Reference as needed" → "Optional"
  low → "Specialized use cases" → "On demand"
```

## Quick Map

### Critical (MUST load - fail without)

```toon
critical_specs{name,path,triggers,depends_on}:
  code-style → "openspec/specs/code-style/spec.md" → "implement,refactor,patterns,naming" → "none"
```

### High (load for complex tasks)

```toon
high_specs{name,path,triggers,depends_on}:
  delegation → ".claude/templates/delegation-handoff.md" → "delegate,Task tool,subagent" → "context-bundles"
  context-bundles → ".claude/docs/context-bundles.md" → "session,context,bundle,handoff,delegate" → "none"
  breakdown → ".claude/templates/task-breakdown.md" → "breakdown,complex,phases" → "none"
  research → ".claude/skills/research-and-plan/SKILL.md" → "research,plan,complex,hypothesis" → "none"
```

### Medium (reference as needed)

```toon
medium_specs{name,path,triggers}:
  git → ".claude/docs/git.md" → "commit,branch,rebase,PR,merge"
  worktree → ".claude/docs/worktree.md" → "parallel,worktree,isolation"
  context → ".claude/docs/context-handling.md" → "session,handoff,context,bundle"
```

### Claude Standards (for tooling development)

```toon
claude_specs{name,path,triggers,depends_on}:
  doc-spec → ".claude/docs/doc-spec.md" → "format,size,toon,structure" → "none"
  hooks → ".claude/docs/hooks.md" → "hook,automation,event" → "doc-spec"
```

## Loading Instructions

**MANDATORY: Before any implementation task:**

1. Identify task type from triggers in Quick Map
2. Load ALL critical specs that match task keywords
3. Load dependencies (check `depends_on` column)
4. Include spec paths in delegation prompts

**Validation**: Agents MUST confirm specs loaded before execution.

## Spec Dependencies

```toon
task_specs{task,required_specs}:
  "delegation" → "delegation + context-bundles"
  "complex task" → "research + breakdown"
  "claude tooling" → "doc-spec + relevant feature doc"
```

## By Keyword

- delegate, subagent, Task tool → `delegation-handoff.md`
- session, context, bundle → `context-handling.md`
- Claude tooling, agents, scripts → `docs/` directory
- decide, tradeoff, prioritise → `/consider:*` commands
