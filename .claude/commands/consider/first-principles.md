# /consider:first-principles

Strip assumptions and rebuild from fundamentals.

## Usage

```
/consider:first-principles
```

## The Principle

Break down problems to their fundamental truths, then reason up from there.
Don't accept "that's how it's always been done" as justification.

## Process

1. **Identify assumptions** - What are we taking for granted?
2. **Question each one** - Is this actually true? Why?
3. **Find fundamentals** - What do we know for certain?
4. **Rebuild** - What solution emerges from first principles?

## Questions to Ask

- [ ] Why do we do it this way?
- [ ] What's the actual constraint, not the perceived one?
- [ ] If we started fresh, what would we build?
- [ ] What's the physics/fundamentals here?

## Examples

### "We need a database"
First principles: We need to store and retrieve data.
Might not need a full RDBMS - could be files, KV store, or in-memory.

### "We need microservices"
First principles: We need to deploy and scale parts independently.
Might achieve this with modules, serverless, or even a well-structured monolith.

### "We need to rewrite this"
First principles: We need to fix specific problems.
Might be able to incrementally improve instead.

## Related

- `/consider:inversion`
- `/consider:5-whys`
