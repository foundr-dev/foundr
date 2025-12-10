# Decision Making Mental Models

Apply these when choosing between options, prioritising work, or evaluating tradeoffs.

## Pareto Principle (80/20)

Find the vital few factors driving most results.

**Process:**

1. List all contributing factors
2. Estimate impact of each (rough % of total outcome)
3. Identify the ~20% causing ~80% of the outcome
4. Focus resources on vital few first
5. Only address the many after vital few are optimised

**Output:**

```toon
factors{factor,impact_pct,category}:
  "factor A" → 45% → vital_few
  "factor B" → 30% → vital_few
  "factor C" → 10% → trivial_many
  "factor D" → 8% → trivial_many
  "factor E" → 7% → trivial_many
vital_few: [factors A, B - address these first]
action: [specific focus areas]
```

**Success:** Resources focused on highest-impact areas, avoided spreading thin.

---

## Tradeoffs Analysis

Make tradeoffs explicit - what are we sacrificing for what?

**Process:**

1. Identify the decision to make
2. List what each option gains
3. List what each option sacrifices
4. Make the exchange explicit
5. Decide if the tradeoff is worthwhile

**Output:**

```toon
options{option,gains,sacrifices}:
  "option A" → "[what you get]" → "[what you lose]"
  "option B" → "[what you get]" → "[what you lose]"
explicit_tradeoff: [we're trading X for Y]
worthwhile: yes/no [with reasoning]
```

**Success:** Hidden costs surfaced, decision made with full awareness.

---

## Reversibility Assessment

Match decision speed to reversibility.

**Process:**

1. Identify the decision
2. Assess reversibility (one-way door vs two-way door)
3. One-way doors: deliberate, gather more info, get buy-in
4. Two-way doors: decide quickly, iterate based on feedback
5. Don't treat two-way doors as one-way

**Output:**

```toon
decision: [what we're deciding]
reversibility: one_way | two_way
one_way_indicators:
  - [indicator 1]
two_way_indicators:
  - [indicator 1]
assessment: [which type]
recommended_approach: [deliberate/quick + reasoning]
```

**Success:** Speed matched to stakes, avoided analysis paralysis on reversible decisions.

---

## 10-10-10 Rule

How will you feel about this in 10 minutes, 10 months, 10 years?

**Process:**

1. Describe the decision
2. Predict feelings/outcomes at 10 minutes
3. Predict feelings/outcomes at 10 months
4. Predict feelings/outcomes at 10 years
5. Let long-term perspective inform decision

**Output:**

```toon
decision: [what we're deciding]
timeline{period,likely_feeling,reasoning}:
  10_min → "[emotion/outcome]" → "[why]"
  10_months → "[emotion/outcome]" → "[why]"
  10_years → "[emotion/outcome]" → "[why]"
insight: [what the timeline reveals]
recommendation: [based on long-term perspective]
```

**Success:** Short-term emotion balanced with long-term consequence.

---

## Eisenhower Matrix

Sort by urgent vs important to prioritise.

**Process:**

1. List all tasks/decisions
2. Score each on urgency (deadline pressure)
3. Score each on importance (long-term impact)
4. Place in quadrant
5. Handle accordingly

**Output:**

```toon
tasks{task,urgent,important,quadrant,action}:
  "[task]" → yes/no → yes/no → Q1/Q2/Q3/Q4 → "[action]"

quadrant_actions:
  Q1 (urgent+important) → "Do first"
  Q2 (important, not urgent) → "Schedule time"
  Q3 (urgent, not important) → "Delegate if possible"
  Q4 (neither) → "Eliminate"
```

**Success:** Focus on important work, not just urgent work.
