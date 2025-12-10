# Problem Solving Mental Models

Apply these when debugging, analysing failures, or identifying root causes.

## 5-Whys

Drill past symptoms to find actionable root cause.

**Process:**

1. State the problem clearly
2. Ask "Why does this happen?" - get surface cause
3. For each answer, ask "Why?" again
4. Continue until root cause is identified (typically 5 iterations)
5. Verify the root cause is actionable

**Output:**

```toon
5_whys{level,cause}:
  1 → "surface cause"
  2 → "deeper cause"
  3 → "even deeper"
  4 → "approaching root"
  5 → "root cause"
root_cause: [actionable issue]
intervention: [specific fix at root level]
prevention: [how to prevent recurrence]
```

**Success:** Moved past symptoms, root cause is actionable, solution prevents recurrence.

---

## First Principles

Break down problems by stripping assumptions and rebuilding from fundamentals.

**Process:**

1. State the problem clearly
2. List current assumptions (what we "know" or take for granted)
3. Challenge each assumption - is it actually true or just convention?
4. Identify irreducible base truths
5. Rebuild solution from fundamentals only

**Output:**

```toon
assumptions{assumption,challenged,verdict}:
  "assumption 1" → "why challenged" → "true/false/partial"
  "assumption 2" → "why challenged" → "true/false/partial"
fundamentals:
  - [irreducible truth 1]
  - [irreducible truth 2]
rebuilt_understanding: [conclusions from fundamentals]
new_possibilities: [solution paths not visible conventionally]
```

**Success:** Revealed hidden assumptions, distinguished convention from necessity.

---

## Occam's Razor

Prefer the simplest explanation with fewest assumptions.

**Process:**

1. List all possible explanations
2. Count assumptions each requires
3. Rank by simplicity (fewest assumptions first)
4. Choose simplest that fits all facts
5. Only add complexity if evidence demands it

**Output:**

```toon
explanations{explanation,assumptions,fits_facts}:
  "explanation A" → 2 → yes
  "explanation B" → 5 → yes
  "explanation C" → 3 → partial
verdict: [simplest that fits all facts]
```

**Success:** Avoided unnecessary complexity, explanation fits all known facts.

---

## Hanlon's Razor

Never attribute to malice what is adequately explained by mistake.

**Process:**

1. Identify the concerning behaviour
2. List malicious interpretations
3. List innocent explanations (mistake, ignorance, miscommunication)
4. Assess which is more likely given context
5. Default to charitable interpretation unless evidence contradicts

**Output:**

```toon
behaviour: [what happened]
malicious_interpretation: [bad intent assumed]
innocent_explanations:
  - [mistake possibility]
  - [ignorance possibility]
  - [miscommunication possibility]
assessment: [which is more likely]
recommended_response: [based on assessment]
```

**Success:** Avoided false accusations, maintained relationships, addressed actual issue.
