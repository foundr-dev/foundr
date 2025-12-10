# Research Workflow

Gather evidence → Form hypotheses → Verify → Document

<objective>
Systematically investigate unclear problems before planning solutions.
</objective>

<mental_models>
Apply during research:
- `/consider:5-whys` - Drill to root cause
- `/consider:first-principles` - Question assumptions
- `/consider:occams-razor` - Prefer simplest explanation
</mental_models>

<process>
1. **Define question** - What exactly are we trying to understand?
2. **Investigate** - `Task(subagent_type=Explore)` for codebase exploration
3. **Gather evidence** - Logs, stack traces, related code, test failures
4. **Form hypotheses** - List possible causes with confidence levels
5. **Verify** - Test each hypothesis systematically (don't assume)
6. **Document** - Write findings to `.planning/`
</process>

<output>
Create two artifacts:

**`.planning/RESEARCH.md`** - Investigation record
- Question being investigated
- Methodology used
- Evidence gathered with sources

**`.planning/FINDINGS.md`** - Conclusions
- Summary (one paragraph)
- Root cause / key insight
- Evidence supporting conclusion
- Recommendations
</output>

<verification>
Before completing:
- [ ] Question clearly defined
- [ ] Multiple hypotheses considered
- [ ] Evidence documented with file:line references
- [ ] Root cause identified with confidence level
- [ ] Recommendations actionable
</verification>

Done: Research complete, RESEARCH.md and FINDINGS.md written
