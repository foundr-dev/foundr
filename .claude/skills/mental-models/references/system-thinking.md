# System Thinking Mental Models

Apply these when analysing system behaviour, dependencies, and downstream effects.

## Bottleneck Analysis

Find the constraint - what single factor limits the whole system?

**Process:**

1. Map the system flow (input → process → output)
2. Identify where work queues up or slows down
3. Find the rate-limiting step
4. Focus improvement on bottleneck first
5. After bottleneck moves, reassess

**Output:**

```toon
system_flow:
  input → [step 1] → [step 2] → [step 3] → output

bottleneck_analysis{step,throughput,queue_depth,is_bottleneck}:
  "[step 1]" → high → low → no
  "[step 2]" → low → high → yes
  "[step 3]" → medium → low → no

bottleneck: [step 2]
constraint: [specific limiting factor]
improvement: [how to address]
```

**Success:** Improvements focused on actual constraint, not perceived bottleneck.

---

## Feedback Loops

Identify feedback loops - positive (amplifying) and negative (stabilising).

**Process:**

1. Identify system variables
2. Map causal relationships (A increases → B increases)
3. Look for circular patterns
4. Classify as reinforcing (+) or balancing (-)
5. Predict system behaviour based on loops

**Output:**

```toon
loops{name,type,components,effect}:
  "[loop name]" → reinforcing → "A→B→C→A" → "[what it amplifies]"
  "[loop name]" → balancing → "X→Y→X" → "[what it stabilises]"

system_prediction: [how loops will affect behaviour]
leverage_points: [where to intervene effectively]
```

**Types:**
- **Reinforcing (positive):** Change amplifies itself (growth spiral, death spiral)
- **Balancing (negative):** Change triggers correction (thermostat, market equilibrium)

**Success:** System dynamics understood, interventions target leverage points.

---

## Second-Order Effects

Trace consequences - "And then what?" to see downstream effects.

**Process:**

1. Identify the proposed change/action
2. List immediate (first-order) effects
3. For each first-order effect, ask "And then what?"
4. Continue 2-3 levels deep
5. Assess full impact including unintended consequences

**Output:**

```toon
action: [proposed change]

effects{order,effect,likelihood,desirable}:
  1st → "[immediate effect]" → high → yes
  2nd → "[consequence of first]" → medium → yes
  2nd → "[another consequence]" → medium → no
  3rd → "[downstream effect]" → low → unclear

unintended_consequences:
  - [consequence 1]
  - [consequence 2]

net_assessment: [overall good/bad/mixed with reasoning]
```

**Success:** Avoided obvious unintended consequences, saw beyond immediate effects.
