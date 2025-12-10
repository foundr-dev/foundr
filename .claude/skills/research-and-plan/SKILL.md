---
name: research-and-plan
description: Structured research and planning for complex tasks - routes to workflows based on intent, creates .planning/ artifacts
allowed-tools: [Read, Grep, Glob, Write, Bash, Task, AskUserQuestion]
---

<when_invoked>
- Complex bug with unclear root cause
- Feature requiring architectural decisions
- Task touching multiple systems
- User explicitly requests research/planning phase
</when_invoked>

<intake>
Determine user intent and route to appropriate workflow:

```toon
routing{intent_keywords,workflow}:
  "unclear cause, debug, investigate" → workflows/research.md
  "plan, design, architect, implement" → workflows/plan.md
  "both, full, complete" → workflows/research.md then workflows/plan.md
```
</intake>

<complexity_assessment>
```toon
complexity{level,indicators,action}:
  simple → "obvious fix, single file, config/typo" → skip to execution
  complex → "unclear cause, multiple systems, architectural" → run workflows
```
</complexity_assessment>

<process>
1. Assess complexity using criteria above
2. If simple: skip research, proceed to execution
3. If complex: route to appropriate workflow(s)
4. Load workflow file and follow its process
5. Create artifacts in `.planning/`
6. Present for approval before handoff
</process>

<artifacts>
```toon
planning_dir{file,purpose}:
  .planning/RESEARCH.md → "investigation questions, evidence, hypotheses"
  .planning/FINDINGS.md → "conclusions, root cause, recommendations"
  .planning/PLAN.md → "phased implementation steps"
```
</artifacts>

<references>
- `workflows/research.md` - Research workflow (investigate → gather evidence → document)
- `workflows/plan.md` - Planning workflow (define objective → phase tasks → document)
- `references/templates.md` - Artifact templates (RESEARCH.md, FINDINGS.md, PLAN.md)
</references>

<success_criteria>
- Complexity correctly assessed
- Appropriate workflow(s) executed
- Artifacts created in `.planning/`
- Plan approved before handoff
</success_criteria>

Done: Research/planning complete, artifacts in `.planning/`, ready for execution

Ask first: complexity assessment | plan approval | OpenSpec vs direct execution
