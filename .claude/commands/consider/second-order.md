# /consider:second-order

Trace consequences - "And then what?" to see downstream effects.

## Usage

```
/consider:second-order
```

## The Principle

First-order thinking: immediate effects
Second-order thinking: "And then what happens?"

Most people stop at first-order effects. Competitive advantage comes from seeing further.

## Process

```
Action
  └─→ First-order effect (obvious, immediate)
        └─→ Second-order effect (what happens next?)
              └─→ Third-order effect (and then?)
```

## Questions to Ask

- [ ] What happens immediately?
- [ ] And then what?
- [ ] Who else is affected?
- [ ] What behaviors does this incentivize?
- [ ] What unintended consequences might emerge?

## Examples

### Adding a Feature
- 1st order: Users get new capability
- 2nd order: Support tickets increase, docs need updating
- 3rd order: Team velocity drops, tech debt grows

### Optimization
- 1st order: Code runs faster
- 2nd order: Other parts of system become bottleneck
- 3rd order: Architecture needs rethinking

### Removing Code
- 1st order: Less to maintain
- 2nd order: Users relying on it need migration
- 3rd order: Trust in stability decreases

## Related

- `/consider:inversion`
- `/consider:feedback-loops`
