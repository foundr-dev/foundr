# Doc Spec

Reading order: doc-spec -> features -> tools -> skills -> hooks

**Scope**: These rules apply to **Claude-read documentation** (`.claude/` files: agents, commands, scripts, docs). Human-readable docs may use tables and other formats for readability.

## Format Rules

- **No tables** -> use lists or Toon format
- **No directory trees** -> Claude explores with Glob
- **One example per pattern** - more wastes tokens
- **Workflow at top**: `A -> B -> C`
- **Inline alternatives**: `a | b | c`

## Toon Format

Structured output: `category[count]{fields}:` with indented values

```text
repo{branch,tracking,ahead}:
  main,origin/main,2

failed[3]{suite,test,error}:
  test_api.py,test_login,AssertionError
  test_api.py,test_logout,Timeout
```

Benefits: scannable, parseable, minimal tokens, consistent

## Size Targets (characters)

Tokens = characters / 4. Character count is a better proxy than line count.

- **Agents**: 700-4000 chars (~175-1000 tokens)
  - Delegation agents (simple workflow): 700-1200 chars
  - Implementation agents (multi-step): 1500-4000 chars
- **Commands**: 100-1500 chars (~25-375 tokens) - script wrappers can be minimal
- **Docs**: 2000-6000 chars (~500-1500 tokens)
- **Skills**: 1000-3000 chars (~250-750 tokens)

Measure completeness, not size. Concise > padded. Instructional content > format overhead.

## Agent Requirements

- **Frontmatter**: name, description (verb-first), tools (scoped), model
- **Body**: workflow -> input/output -> steps -> done criteria -> ask-first rules
- **Model**: See Model Selection below

## Model Selection

Choose the right model for the task complexity:

```toon
model{name,use_for,cost}:
  haiku -> "single-file ops, simple queries, fast iteration" -> lowest
  sonnet -> "multi-file changes, complex logic, most agents" -> medium
  opus -> "critical decisions, architectural work, code review" -> highest
```

**Selection criteria**:

- **haiku**: Read-only ops, single file edits, simple formatting, quick lookups
- **sonnet**: Default for most agents. Multi-file changes, test writing, refactoring
- **opus**: Architectural decisions, security-sensitive code, complex debugging, PR reviews

**Escalation**: Start with lower model, escalate if quality issues or complex reasoning needed.

## Prompt Optimisation

Structure prompts for model effectiveness:

- **Critical rules first**: Put MUST/NEVER rules in first 15% of prompt
- **Max 4 levels nesting**: Deeper nesting loses context; flatten or split
- **40-50% instruction ratio**: Balance instructions vs examples/context
- **Single source of truth**: Define once, reference by ID (e.g., "see Delegation Triggers")
- **3-tier priority**: MUST (non-negotiable) > SHOULD (preferred) > MAY (optional)

**Conflict resolution**: When rules conflict, higher tier wins. If same tier, more specific wins.

## Context Efficiency

Goal: useful information, no repetition, minimal context

- Use slash commands over MCP tools where possible
- Empty output = success (implicit, zero context)
- Truncate long values (100-150 chars)
- Limit lists (show 10, "... and N more")
- Filter before output (only errors, only changes)
- Routing hints over exhaustive lists

## Parallel Execution

Claude can execute multiple tool calls in a single response. Use this for independent operations.

**When to parallelise**:

- Multiple file reads with no dependencies
- Independent API calls
- Concurrent agent delegations (via multiple Task tool calls)
- Simultaneous search/grep operations

**Pattern**: Issue all independent calls in same message block. Claude batches tool_use, receives all tool_result together.

```text
# Good: Parallel (independent)
[Task: investigate-api] + [Task: investigate-ui] + [Task: investigate-tests]

# Bad: Sequential (when independent)
[Task: investigate-api] -> wait -> [Task: investigate-ui] -> wait -> [Task: investigate-tests]
```

**Dependencies**: If operation B needs result from A, call sequentially. Never guess parameters.

**Agent prompt pattern**: Include in orchestrator agents:

```text
Parallelise independent delegations. When delegating to multiple specialists
with no dependencies, issue all Task calls in a single response.
```

## Script Conventions

- Exit codes: 0 success | 1 error | 2 block
- Error format: `echo "error: description"` then `echo "fix: suggestion"`
- Always support `--help`
- Use Toon format for output
