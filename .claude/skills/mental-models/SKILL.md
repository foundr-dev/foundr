---
name: mental-models
description: Apply decision-making frameworks and mental models to analyse problems, make decisions, and evaluate solutions
allowed-tools: [Read]
---

<when_invoked>
- Complex decisions with multiple options
- Problem analysis requiring root cause identification
- Architectural or design decisions
- Risk assessment needed
- Prioritisation challenges
- Evaluating tradeoffs
- Simplifying complex systems
</when_invoked>

<intake>
Route to appropriate reference based on problem type:

```toon
routing{situation,reference}:
  "unclear root cause, debugging, why" → references/problem-solving.md
  "multiple options, prioritise, choose" → references/decision-making.md
  "system behaviour, dependencies, effects" → references/system-thinking.md
  "complexity, simplify, reduce" → references/simplicity.md
  "uncertainty, risk, safety, failure" → references/risk-assessment.md
```
</intake>

<process>
1. Identify problem type from user context
2. Load relevant reference(s) from `references/`
3. Apply framework to current situation
4. Present structured analysis
5. Surface actionable insights
</process>

<output_format>
```toon
analysis{model,finding,action}:
  pareto → "3 factors drive 80% of issues" → "focus on auth, caching, validation"
  bottleneck → "database query limits throughput" → "add index on user_id"
```
</output_format>

<references>
- `references/problem-solving.md` - 5-Whys, First Principles, Occam's Razor, Hanlon's Razor
- `references/decision-making.md` - Pareto, Tradeoffs, Reversibility, 10-10-10, Eisenhower
- `references/system-thinking.md` - Bottlenecks, Feedback Loops, Second-Order Effects
- `references/simplicity.md` - YAGNI, Via Negativa, Premature Optimisation
- `references/risk-assessment.md` - Inversion, Margin of Safety, Opportunity Cost
</references>

<integration>
- `research-and-plan` skill references these during research/planning
- `/consider:*` commands for explicit user invocation
- Auto-invoked during complex task analysis
</integration>

<success_criteria>
- Correct model(s) selected for problem type
- Analysis structured with clear findings
- Actionable insights provided
</success_criteria>

Done: Analysis complete with actionable insights using appropriate mental model(s)
