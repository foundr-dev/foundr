# /consider:premature-optimisation

Check for premature optimisation - is this optimisation actually needed?

## Usage

```
/consider:premature-optimisation
```

## The Principle

"Premature optimisation is the root of all evil" - Donald Knuth

Optimising before you know where the bottleneck is wastes time and adds complexity.

## Questions to Ask

- [ ] Have we measured the actual performance?
- [ ] Is this code actually a bottleneck?
- [ ] How often is this code executed?
- [ ] What's the actual user impact?
- [ ] Are we optimising based on assumptions or data?

## Red Flags

- "This might be slow" (no measurements)
- "Just in case it needs to scale"
- Optimising code that runs once at startup
- Complex caching for rarely-accessed data
- Micro-optimisations in non-hot paths

## The Right Approach

1. **Make it work** - Correct, clear code first
2. **Make it right** - Clean, maintainable code
3. **Make it fast** - Only if measured as necessary

## When to Optimise

✅ Profiler shows this is a bottleneck
✅ Users are experiencing slowness
✅ Known algorithmic complexity issue (O(n²) on large data)
✅ Resource constraints are documented requirements

## When NOT to Optimise

❌ "This could be faster"
❌ "Users might have slow connections"
❌ "We might have more data someday"
❌ The code is already fast enough

## Related

- `/consider:yagni`
- `/consider:bottlenecks`
