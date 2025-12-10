# /consider:bottlenecks

Find the constraint - what single factor limits the whole system?

## Usage

```
/consider:bottlenecks
```

## The Principle

Every system has a bottleneck - the constraint that limits overall throughput.
Optimising anything except the bottleneck is wasted effort.

## Questions to Ask

- [ ] What's the slowest part of the system?
- [ ] Where do things queue up?
- [ ] What would happen if we doubled capacity elsewhere?
- [ ] What's the limiting factor right now?

## Types of Bottlenecks

### Technical
- Slow database queries
- Network latency
- CPU-bound operations
- Memory constraints
- I/O limits

### Process
- Code review queue
- Deployment frequency
- Testing time
- Decision making

### Human
- Key person dependency
- Knowledge silos
- Communication overhead

## Finding Bottlenecks

1. **Measure** - Profile, log, observe
2. **Identify** - Where is time/resources spent?
3. **Verify** - Would fixing this improve throughput?
4. **Address** - Fix or work around
5. **Repeat** - New bottleneck will emerge

## The Theory of Constraints

1. Identify the constraint
2. Exploit the constraint (maximize its output)
3. Subordinate everything else to the constraint
4. Elevate the constraint (increase its capacity)
5. Repeat (don't let inertia become the constraint)

## Related

- `/consider:pareto`
- `/consider:premature-optimisation`
