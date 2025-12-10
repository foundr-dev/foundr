# /consider:feedback-loops

Identify feedback loops - positive (amplifying) and negative (stabilising).

## Usage

```
/consider:feedback-loops
```

## The Principle

Systems have feedback loops that either amplify or stabilize behavior.
Understanding them helps predict and influence system behavior.

## Types

### Positive (Reinforcing) Loops
Amplify change - more leads to more (or less leads to less)

```
Good code → Fewer bugs → More time → Better code → ...
Bad code → More bugs → Less time → Worse code → ...
```

### Negative (Balancing) Loops
Stabilize - push back toward equilibrium

```
High load → Slow response → Users leave → Lower load → ...
```

## Questions to Ask

- [ ] What loops exist in this system?
- [ ] Are they amplifying or stabilizing?
- [ ] Which loops are dominant?
- [ ] How can we strengthen good loops?
- [ ] How can we break bad loops?

## Examples in Development

### Virtuous Cycles
- Good tests → Confidence → Faster changes → More time for tests
- Clear code → Easy onboarding → More contributors → Better code

### Vicious Cycles
- Technical debt → Slow features → Shortcuts → More debt
- Poor docs → Questions → Interrupts → No time for docs

### Balancing Loops
- Too many features → Complexity → User confusion → Feature removal
- Too fast shipping → Quality drops → Bug reports → Slower shipping

## Breaking Bad Loops

1. Identify the weakest link
2. Introduce a circuit breaker
3. Create a competing positive loop
4. Accept short-term pain for long-term gain

## Related

- `/consider:second-order`
- `/consider:bottlenecks`
