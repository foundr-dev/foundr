# Planning Workflow

Review findings → Define objective → Phase tasks → Identify risks → Document

<objective>
Create executable implementation plan with clear phases and success criteria.
</objective>

<mental_models>
Apply during planning:
- `/consider:pareto` - Focus on 20% delivering 80% value
- `/consider:tradeoffs` - Make tradeoffs explicit
- `/consider:yagni` - Don't build what's not needed
- `/consider:reversibility` - Match decision speed to reversibility
- `/consider:inversion` - Identify what would guarantee failure
</mental_models>

<process>
1. **Review** - Read `.planning/FINDINGS.md` if exists
2. **Define objective** - Single clear sentence of what success looks like
3. **Apply Pareto** - Identify vital few changes for maximum impact
4. **Phase tasks** - Break into phases (max 2-3 tasks each)
5. **Identify risks** - Use inversion to find failure modes
6. **Define criteria** - Measurable success criteria
7. **Document** - Write plan to `.planning/PLAN.md`
</process>

<output>
Create **`.planning/PLAN.md`**:

```markdown
# Plan: [Feature/Fix Name]

## Objective
[Single sentence goal]

## Phases

### Phase 1: [Name]
tasks[]{task,file,done_criteria}:
  "[task]" → "[file]" → "[criteria]"

### Phase 2: [Name]
...

## Success Criteria
- [Measurable criterion 1]
- [Measurable criterion 2]

## Risks
risks{risk,mitigation}:
  "[risk]" → "[mitigation]"
```
</output>

<verification>
Before completing:
- [ ] Objective is single, clear sentence
- [ ] Phases have max 2-3 tasks each
- [ ] Each task has done criteria
- [ ] Risks identified with mitigations
- [ ] Success criteria are measurable
</verification>

<handoff>
After plan approval:
- If significant change → `/openspec:proposal` (reference `.planning/` artifacts)
- If minor change → hand to `workflow/execute-task` with plan context
</handoff>

Done: Plan complete, PLAN.md written, ready for approval
