# Context Bundle Schema

Standardized context object for all subagent delegations.

## Schema

```toon
context{field,required,description}:
  source → yes → "Entry point: ticket|pr|branch|manual"
  type → yes → "Task type: bug|feature|review|feedback|hotfix"
  summary → yes → "1-2 sentence description"
  specs → yes → "Array of spec paths to load"
  files → no → "Array of files to modify/review"
  planning → no → "Path to .planning/ if research was done"
  reference → no → "External reference: ticket ID, PR number, or branch"
  constraints → no → "Limitations, deadlines, requirements"
```

## Entry Point Mapping

```toon
entry_point{source,creates_bundle,research_phase}:
  /start <ticket-id> → "ticket" → yes → "if complex"
  /start --create → "manual" → yes → "if complex"
  /review <pr> → "pr" → yes → "no (review only)"
  /feedback <pr> → "pr" → yes → "if complex feedback"
  hotfix → "ticket|manual" → yes → "no (urgent)"
  direct execution → "branch" → optional → "if requested"
```

## Bundle Creation

**With ticket**:

```bash
.claude/scripts/delegation/create.sh "task-name" --ticket <id>
```

**Without ticket (PR-based)**:

```bash
.claude/scripts/delegation/create.sh "pr-123-feedback" --pr 123
```

**Without ticket (manual)**:

```bash
.claude/scripts/delegation/create.sh "task-name" --source manual --type feature
```

## Prompt Builder Pattern

When delegating to subagents, build the prompt with this structure:

```markdown
<context>
source: [ticket|pr|branch|manual]
type: [bug|feature|review|feedback|hotfix]
reference: [ticket ID, PR #, or branch name]
</context>

<specs_required>
MUST load before execution:
- `openspec/specs/[name]/spec.md` - [relevance]
</specs_required>

<task>
[Clear task description]
</task>

<files>
- `path/to/file.ts` - [what to do]
</files>

<planning>
[If .planning/ exists, reference key findings]
</planning>

<checklist>
- [ ] Load specs
- [ ] [Step 1]
- [ ] [Step 2]
</checklist>
```

## Approval Gates

All entry points should have explicit approval before execution:

```toon
approval_gates{entry_point,before_research,before_execute}:
  start-work → "complexity assessment" → "plan review"
  address-pr-feedback → "no" → "changes summary"
  review-pr → "no" → "review submission"
  hotfix → "task creation" → "ship confirmation"
```

## Return Format

Subagents return to orchestrator in this format:

```toon
result{status,action,details}:
  success → "continue" → "summary of what was done"
  blocked → "needs-input" → "what's needed"
  failed → "abort|retry" → "error details"

files_modified[]{path,change}:
  "path/to/file.ts" → "added tests"

next_steps[]:
  "suggested next action"
```
