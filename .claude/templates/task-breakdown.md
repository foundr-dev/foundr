# Task Breakdown Template

Structured framework for breaking complex tasks into manageable pieces.

## When to Use

- Large features (estimated >4 hours work)
- Multi-file changes
- Cross-module work
- Unclear scope or requirements
- Used by `plan-task` and `task-breakdown` agents

## Template

```markdown
# Task: [Task Name]

**Ticket**: [task-id]
**Type**: feature | fix | improvement | refactor
**Complexity**: simple | moderate | complex

## Summary
[1-2 sentence description of what needs to be done]

## Acceptance Criteria
- [ ] [Criterion 1 - specific, measurable]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

---

## Phase 1: [Phase Name] (e.g., Setup/Exploration)

**Goal**: [What this phase achieves]

### Tasks

task[N]{id,description,files,depends,verify}:
  1.1,[Task description],`path/to/file.ts`,-,[How to verify]
  1.2,[Task description],`path/to/file.ts`,1.1,[How to verify]

### Checkpoint
- [ ] [Phase completion criteria]

---

## Phase 2: [Phase Name] (e.g., Implementation)

**Goal**: [What this phase achieves]

### Tasks

task[N]{id,description,files,depends,verify}:
  2.1,[Task description],`path/to/file.ts`,1.x,[How to verify]
  2.2,[Task description],`path/to/file.ts`,2.1,[How to verify]

### Checkpoint
- [ ] [Phase completion criteria]

---

## Phase 3: [Phase Name] (e.g., Testing/Validation)

**Goal**: [What this phase achieves]

### Tasks

task[N]{id,description,files,depends,verify}:
  3.1,[Task description],`path/to/file.ts`,2.x,[How to verify]

### Checkpoint
- [ ] [Phase completion criteria]

---

## Dependencies

### External
- [ ] [API endpoint, design, approval needed]

### Internal
- [ ] [Other tasks, modules, files that must exist]

## Specs Required
- `openspec/specs/[name]/spec.md` - [why needed]

## Risks & Blockers

risk[N]{issue,mitigation}:
  [Potential issue],[How to handle]

## Notes
[Any additional context, decisions, or considerations]
```

## Quick Reference

### Phase Types

- **Setup** - Environment, exploration: read files, check deps, understand context
- **Data Layer** - API, state, hooks: hooks, API calls, state management
- **UI** - Components, styling: components, layouts, interactions
- **Integration** - Wiring together: connect components, data flow
- **Testing** - Verification: unit, integration, E2E tests
- **Polish** - Refinement: accessibility, performance, edge cases

### Dependency Notation

- `-` = No dependencies (can start immediately)
- `1.1` = Depends on specific task
- `1.x` = Depends on all phase 1 tasks
- `2.1, 2.3` = Depends on multiple specific tasks

### Verification Examples

- "Hook returns data" - API integration works
- "Component renders" - No errors, shows UI
- "Tests pass" - All tests green
- "Lint clean" - No ESLint errors

## Integration with Workflow

1. **plan-task agent** creates breakdown for unclear tasks
2. **task-breakdown agent** helps split complex features
3. **execute-task agent** uses breakdown as execution guide

Each phase maps to the stage workflow:

- Phase 1 → ANALYSE
- Phase 2-3 → EXECUTE
- Final Phase → VALIDATE
