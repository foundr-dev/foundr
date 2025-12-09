# /consider:yagni

YAGNI check - You Aren't Gonna Need It.

## Usage

```
/consider:yagni
```

## The Principle

Before implementing a feature or abstraction, ask:

1. **Is this needed NOW?** - Not "might be useful later"
2. **Is there a concrete use case?** - Not "someone might want this"
3. **What's the cost of adding later?** - Usually lower than you think

## Questions to Ask

- [ ] Do we have a user requesting this?
- [ ] Will this ship in the current PR?
- [ ] What's the simplest thing that works?
- [ ] Can we add this when actually needed?

## Common YAGNI Violations

- Premature abstractions
- Configuration options nobody uses
- Support for hypothetical future requirements
- "Just in case" error handling
- Unused API parameters

## The Alternative

Instead of building for the future:

1. Build the simplest thing that works
2. Ship it
3. Learn from real usage
4. Add complexity only when proven necessary

## Related

- `/consider:premature-optimisation`
- `/consider:pareto`
