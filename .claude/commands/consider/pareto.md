# /consider:pareto

Apply the 80/20 rule - find the vital few factors driving most results.

## Usage

```
/consider:pareto
```

## The Principle

80% of effects come from 20% of causes:
- 80% of bugs come from 20% of code
- 80% of value comes from 20% of features
- 80% of time is spent on 20% of tasks

## Questions to Ask

- [ ] What 20% of this work delivers 80% of the value?
- [ ] Which features do users actually use most?
- [ ] What's the minimum viable solution?
- [ ] Where should we focus first?

## Application

### For Features
Focus on the core functionality that delivers most value.
Cut scope ruthlessly - the long tail of features rarely matters.

### For Bugs
Fix the bugs affecting most users first.
Don't chase edge cases before handling common paths.

### For Code Quality
Improve the hottest code paths first.
Perfect code that runs rarely adds little value.

### For Testing
Test the critical paths thoroughly.
100% coverage on rarely-used code is wasted effort.

## Related

- `/consider:yagni`
- `/consider:via-negativa`
