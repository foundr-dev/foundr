---
name: hook-builder
description: Create Claude Code hooks from natural language descriptions with proper configuration
allowed-tools: [Read, Write, Edit, Bash, AskUserQuestion]
---

Gather requirements → Generate hook → Configure settings.json → Test

<when_invoked>
- User asks to create a hook or automation
- User wants to validate, log, or block tool calls
- User describes event-driven behaviour
</when_invoked>

<process>
### 1. GATHER

Ask clarifying questions:
- **Event**: PreToolUse | PostToolUse | UserPromptSubmit | Stop | SessionStart | SubagentStop
- **Trigger**: Which tool(s)? Bash | Write | Edit | Task | all
- **Action**: validate | log | block | hint | modify
- **Condition**: always | pattern match | condition

### 2. DESIGN

Determine hook type:
- **Command hooks**: Fast validation (<100ms), file/path checks, pattern matching, logging
- **Prompt hooks**: Complex decisions, semantic analysis, context-aware responses

### 3. GENERATE

Create script at `src/scripts/hooks/<name>.ts` using template from `references/templates.md`

### 4. CONFIGURE

Add to `.claude/settings.json`:
```json
{
  "hooks": {
    "<EventType>": [{
      "matcher": "<tool-pattern>",
      "hooks": [{"type": "command", "command": "$HOME/.bun/bin/bun run \"$(git rev-parse --show-toplevel)/src/scripts/hooks/<name>.ts\""}]
    }]
  }
}
```

Matcher patterns: `"Bash"` (exact) | `"Write|Edit"` (multiple) | `"mcp__.*"` (MCP) | `".*"` (all)

### 5. TEST

1. Make executable: Already TypeScript, just needs bun
2. Test with debug: `claude --debug`
3. Verify exit codes work (0=success, 1=error, 2=block)
</process>

<constraints>
- Exit codes: 0=success, 1=error, 2=block
- Keep hooks fast (<100ms)
- Prefer hints over blocks (blocking frustrates workflow)
- Handle missing input with nullish coalescing
- Use TypeScript for all hooks in this repo
</constraints>

<references>
See `references/templates.md` for:
- Validation hook (PreToolUse)
- Logging hook (PostToolUse)
- Hint hook (UserPromptSubmit)
- Safety hook (PreToolUse - Bash)
</references>

<success_criteria>
- Hook script created in TypeScript
- Configured in settings.json
- Exit codes work correctly
- Registered in registry.toon
</success_criteria>

Done: Hook created, configured in settings.json, tested

Ask first: hook type (command/prompt) | which events to handle | blocking vs hints
