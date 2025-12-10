# Research and Plan Templates

## RESEARCH.md Template

```markdown
# Research: [Topic]

**Question**: What exactly are we trying to understand?

**Date**: YYYY-MM-DD
**Status**: investigating | complete

## Methodology

1. [Step taken]
2. [Step taken]

## Evidence

### Source 1: [description]

```
[relevant code/logs/data]
```

Location: `file:line`
Observation: [what this tells us]

### Source 2: [description]

...

## Hypotheses

hypothesis{id,description,confidence,evidence}:
  H1 → "[description]" → high|medium|low → "[supporting evidence]"
  H2 → "[description]" → high|medium|low → "[supporting evidence]"

## Next Steps

- [ ] [verification step]
- [ ] [verification step]
```

## FINDINGS.md Template

```markdown
# Findings: [Topic]

**Date**: YYYY-MM-DD
**Research**: [link to RESEARCH.md]

## Summary

[One paragraph summary of findings]

## Root Cause

[Clear statement of root cause or key insight]

**Confidence**: high | medium | low
**Evidence**: [key evidence supporting this]

## Supporting Evidence

evidence{finding,source,weight}:
  "[finding]" → "file:line" → strong|moderate|weak

## Recommendations

1. **[Action]** - [why this addresses root cause]
2. **[Action]** - [why this helps]

## Open Questions

- [Any remaining uncertainties]
```

## PLAN.md Template

```markdown
# Plan: [Feature/Fix Name]

**Date**: YYYY-MM-DD
**Based on**: [link to FINDINGS.md or ticket]
**Complexity**: simple | moderate | complex

## Objective

[Single sentence describing what success looks like]

## Phases

### Phase 1: [Name] (e.g., Setup/Foundation)

**Goal**: [What this phase achieves]

tasks[]{id,task,file,done_criteria}:
  1.1 → "[task description]" → "`path/file.ts`" → "[how to verify]"
  1.2 → "[task description]" → "`path/file.ts`" → "[how to verify]"

### Phase 2: [Name] (e.g., Implementation)

**Goal**: [What this phase achieves]

tasks[]{id,task,file,done_criteria}:
  2.1 → "[task description]" → "`path/file.ts`" → "[how to verify]"

### Phase 3: [Name] (e.g., Validation)

**Goal**: [What this phase achieves]

tasks[]{id,task,file,done_criteria}:
  3.1 → "[task description]" → "`path/file.ts`" → "[how to verify]"

## Success Criteria

- [ ] [Measurable criterion 1]
- [ ] [Measurable criterion 2]
- [ ] [Measurable criterion 3]

## Risks

risks{risk,likelihood,impact,mitigation}:
  "[risk description]" → low|medium|high → low|medium|high → "[mitigation]"

## Dependencies

- [ ] [External dependency - API, design, approval]
- [ ] [Internal dependency - other task, module]

## Notes

[Any additional context, decisions made, or considerations]
```
