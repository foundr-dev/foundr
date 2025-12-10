# Delegation Handoff Template

When delegating work to subagents via `Task()`, use this structured format to ensure proper context transfer.

## CRITICAL: Context Loading Rules

**These rules are NON-NEGOTIABLE:**

1. **MUST load context files before any execution** - Never skip for efficiency
2. **MUST tell subagents to load context** - Include spec paths in every delegation
3. **NEVER assume subagents have context** - They start fresh, explicit is required

## Template

```text
## Request Summary
[1-2 sentence description of what needs to be done]

## Specs (CRITICAL - MUST load before ANY execution)
⚠️ Read these specs FIRST. Do NOT proceed without loading them:
- `openspec/specs/[spec-name]/spec.md` - [why this spec is relevant]
- [additional specs as needed]

## Files to Modify
- `path/to/file.ts` - [what changes]
- [additional files as needed]

## Progress Checklist
- [ ] Load specs listed above
- [ ] [Step 1]
- [ ] [Step 2]
- [ ] [Step 3]

## Context
Ticket: [task ID if available]
Constraints: [any limitations or requirements]
Related: [PRs, previous work, dependencies]
```

## Example Usage

```typescript
Task({
  subagent_type: "test",
  prompt: `
## Request Summary
Add unit tests for the new useData hook.

## Specs (CRITICAL - MUST load before ANY execution)
⚠️ Read these specs FIRST. Do NOT proceed without loading them:
- \`openspec/specs/testing/spec.md\` - Testing patterns
- \`openspec/specs/code-style/spec.md\` - Code patterns

## Files to Modify
- \`src/hooks/__tests__/useData.test.ts\` - Create new test file

## Progress Checklist
- [ ] Load specs (FIRST - do not skip)
- [ ] Create test file with proper setup
- [ ] Test loading state
- [ ] Test success state with mock data
- [ ] Test error state
- [ ] Verify all tests pass

## Context
Related: PR #123 added the hook
  `
})
```

## Why This Matters

**Subagents start with ZERO context.** They cannot see:

- Previous conversation history
- Files you've already read
- Specs you've already loaded
- Any decisions or context from parent agent

Structured handoffs ensure:

- Subagent loads the right specs independently (CRITICAL)
- Clear scope prevents scope creep
- Progress tracking enables proper handback
- File references prevent wrong-file edits
