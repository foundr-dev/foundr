# /consider:occams-razor

Prefer the simplest explanation - fewest assumptions that fit all facts.

## Usage

```
/consider:occams-razor
```

## The Principle

Among competing explanations, prefer the one with fewest assumptions.
Simpler explanations are more likely to be correct.

"Entities should not be multiplied beyond necessity" - William of Ockham

## Questions to Ask

- [ ] What's the simplest explanation that fits the facts?
- [ ] Am I adding unnecessary complexity?
- [ ] What assumptions am I making?
- [ ] Could a simpler cause explain this?

## Application

### Debugging
**Complex theory**: "The framework has a race condition in the event loop that only triggers under specific memory pressure conditions"

**Simple theory**: "There's a typo in the config file"

Start with the simple theory.

### Architecture
**Complex design**: Multiple microservices, message queues, caches, and orchestration

**Simple design**: One well-structured service

Start simple, add complexity only when proven necessary.

### Requirements
**Complex interpretation**: "They want real-time collaboration with conflict resolution and offline sync"

**Simple interpretation**: "They want to see each other's changes"

Clarify before building complexity.

## Cautions

- Simplest isn't always correct, just most likely
- Don't ignore evidence that doesn't fit
- Sometimes reality IS complex
- Use as a starting point, not absolute rule

## Related

- `/consider:first-principles`
- `/consider:yagni`
