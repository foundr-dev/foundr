# /consider:margin-of-safety

Build in buffers - what margin protects against uncertainty?

## Usage

```
/consider:margin-of-safety
```

## The Principle

The future is uncertain. Build in buffers to handle the unexpected.
Don't plan for the best case - plan for worse than expected.

## Questions to Ask

- [ ] What if this takes 2x longer than expected?
- [ ] What if the load is 3x what we planned for?
- [ ] What's our buffer for the unknown?
- [ ] What happens when things go wrong?

## Areas for Safety Margins

### Estimates
- Task estimates: Add 50% buffer
- Project timelines: Add contingency
- Budget: Reserve for unknowns

### Technical
- Resource limits: Don't run at 100%
- Error handling: Expect failures
- Capacity planning: Headroom for spikes
- Timeouts: Account for slow responses

### Process
- Deadlines: Internal deadlines before real ones
- Dependencies: Don't assume others deliver on time
- Reviews: Time for iterations

## Sizing Your Margin

```
Higher uncertainty → Larger margin
Higher consequences → Larger margin
More complex → Larger margin
```

## Anti-Pattern

Running at the edge:
- 95% resource utilization
- Just-in-time everything
- No slack in the schedule
- Perfect execution required

## Related

- `/consider:inversion`
- `/consider:reversibility`
