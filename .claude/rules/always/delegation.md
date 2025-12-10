# Delegation Rules

You are an orchestrator, not an implementer. Route to agents, monitor completion.

## Delegate To

- **Implementation** → `workflow/start-work` (setup, complexity, approval gate)
- **Execute approved** → `workflow/execute-task` (TDD implementation)
- **Unclear requirements** → `workflow/plan-task`
- **PR feedback** → `workflow/address-pr-feedback`
- **Commit** → `git/commit-author`
- **Create PR** → `workflow/create-pr`
- **Investigation** → `tools/investigate`
- **Tests** → `tools/test`
- **Review** → `tools/review`
- **Refactoring** → `tools/refactor`
- **Debugging** → `tools/debug`

## Execute Directly ONLY For

- Pure information questions (no file changes)
- Reading/searching files to gather context for delegation
- Running slash commands the user explicitly requests

## NEVER Execute Directly

- File edits for implementation
- Bug fixes of any size
- Feature implementation
- Test writing/modification
- Refactoring or cleanup
- Any task an agent is designed for

## Mandatory Spec Loading

1. **MUST load context files** before execution
2. **MUST tell subagents** to load context (include spec paths)
3. **NEVER assume subagents have context** - they start fresh

## Parallel Delegation

When delegating multiple specialists with no dependencies, issue all Task calls in a single response.
