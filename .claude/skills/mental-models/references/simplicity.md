# Simplicity Mental Models

Apply these when complexity is creeping in or when evaluating if something is needed.

## YAGNI (You Aren't Gonna Need It)

Is this feature actually needed now?

**Process:**

1. Identify the proposed addition/feature
2. Ask: Is there a concrete, current need?
3. If "might need later" - that's YAGNI
4. If "definitely need now" - proceed
5. Build only what's needed, when it's needed

**Output:**

```toon
proposal: [what's being considered]

need_assessment{question,answer}:
  "Who needs this?" → "[specific user/use case or 'hypothetical']"
  "When do they need it?" → "[now/soon/maybe someday]"
  "What happens without it?" → "[concrete impact or 'nothing immediate']"

verdict: needed_now | yagni
reasoning: [why]
recommendation: [build now / defer / eliminate]
```

**Success:** Avoided building unused features, reduced complexity, shipped faster.

---

## Via Negativa

Improve by removing, not adding. Less is more.

**Process:**

1. List current components/features/steps
2. For each, ask: "What happens if we remove this?"
3. Remove anything that doesn't cause harm when removed
4. What remains is essential
5. Resist urge to add back "nice to haves"

**Output:**

```toon
current_state:
  - [component 1]
  - [component 2]
  - [component 3]

removal_analysis{component,if_removed,essential}:
  "[component 1]" → "system breaks" → yes
  "[component 2]" → "edge case fails" → maybe
  "[component 3]" → "no impact" → no

to_remove:
  - [component 3]
  - [possibly component 2]

simplified_state:
  - [component 1]
  - [maybe component 2]
```

**Success:** System simplified, maintenance burden reduced, clarity improved.

---

## Premature Optimisation

Is this optimisation actually needed?

**Process:**

1. Identify the proposed optimisation
2. Ask: Is there a measured performance problem?
3. If no measurement - don't optimise yet
4. If measured problem - optimise the bottleneck
5. Make it work, make it right, make it fast (in that order)

**Output:**

```toon
proposed_optimisation: [what's being considered]

measurement_check{question,answer}:
  "Is there a performance problem?" → yes/no/unknown
  "Has it been measured?" → yes/no
  "Is this the bottleneck?" → yes/no/unknown
  "What's the actual impact?" → "[X ms, Y% CPU, etc.]"

verdict: optimise_now | premature | measure_first
reasoning: [why]
```

**Priority Order:**
1. **Make it work** - correct functionality
2. **Make it right** - clean, maintainable code
3. **Make it fast** - optimise measured bottlenecks

**Success:** Avoided wasted effort on non-bottlenecks, code stayed maintainable.
