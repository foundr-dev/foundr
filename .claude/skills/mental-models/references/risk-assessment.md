# Risk Assessment Mental Models

Apply these when evaluating uncertainty, potential failure, and safety margins.

## Inversion

Ask "what would guarantee failure?" then avoid those things.

**Process:**

1. State the goal (what success looks like)
2. Invert: "How could we guarantee failure?"
3. List all ways to fail
4. Identify which failure modes are most likely/damaging
5. Create plan to avoid each failure mode

**Output:**

```toon
goal: [what we're trying to achieve]

failure_modes{way_to_fail,likelihood,impact,prevention}:
  "[failure 1]" → high → severe → "[how to prevent]"
  "[failure 2]" → medium → moderate → "[how to prevent]"
  "[failure 3]" → low → severe → "[how to prevent]"

must_avoid:
  - [critical failure mode 1]
  - [critical failure mode 2]

success_path: [what remains after avoiding failures]
```

**Success:** Critical failure modes identified and addressed, blind spots revealed.

---

## Margin of Safety

Build in buffers - what margin protects against uncertainty?

**Process:**

1. Identify the critical parameter (time, capacity, budget)
2. Estimate the "expected" value
3. Consider what could go wrong
4. Add buffer proportional to uncertainty
5. Higher uncertainty = larger margin

**Output:**

```toon
parameter: [what we're estimating]

estimate{scenario,value}:
  expected → [base estimate]
  optimistic → [best case]
  pessimistic → [worst case]

uncertainty: low | medium | high
buffer_multiplier: [1.1x for low, 1.5x for medium, 2x for high]
safe_target: [expected × buffer]
reasoning: [why this margin]
```

**Guidelines:**
- Low uncertainty: 10-20% buffer
- Medium uncertainty: 30-50% buffer
- High uncertainty: 100%+ buffer (2x)

**Success:** Delivered within safe estimate, handled unexpected issues.

---

## Opportunity Cost

Evaluate true cost - what are you giving up by choosing this?

**Process:**

1. Identify the choice being made
2. List what you gain
3. List what you give up (the next best alternative)
4. The opportunity cost = value of what you give up
5. Is the gain worth more than the opportunity cost?

**Output:**

```toon
choice: [what we're choosing]

gain: [what we get from this choice]
alternatives_foregone:
  - [alternative 1 and its value]
  - [alternative 2 and its value]

opportunity_cost: [value of best alternative foregone]

comparison:
  gain_value: [estimated value of chosen path]
  opportunity_cost: [estimated value of foregone path]
  net_value: [gain - opportunity cost]

verdict: [worth it / not worth it / unclear]
```

**Success:** True cost understood, not just monetary cost. Best use of resources.
