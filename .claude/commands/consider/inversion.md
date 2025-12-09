# /consider:inversion

Invert the problem - ask "what would guarantee failure?" then avoid those.

## Usage

```
/consider:inversion
```

## The Principle

Instead of asking "how do I succeed?", ask "how would I definitely fail?"
Then avoid those failure modes.

## Process

1. **Define success** - What are we trying to achieve?
2. **Invert** - What would guarantee failure?
3. **List failure modes** - Be specific and comprehensive
4. **Avoid them** - Design around these anti-patterns

## Questions to Ask

- [ ] What would make this project fail?
- [ ] What would make users hate this?
- [ ] What would cause this to break in production?
- [ ] What would make this unmaintainable?

## Examples

### Building a feature
Instead of: "How do I build a great feature?"
Invert: "How would I build a terrible feature?"
- Ignore user feedback
- Add unnecessary complexity
- Skip testing
- Don't document anything
→ Then do the opposite

### Code review
Instead of: "Is this code good?"
Invert: "What would make this code problematic?"
- Hard to understand
- No error handling
- Tight coupling
- No tests
→ Check for these specifically

## Related

- `/consider:via-negativa`
- `/consider:margin-of-safety`
