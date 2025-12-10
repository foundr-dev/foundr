# /consider:reversibility

Assess reversibility - is this a one-way door or two-way door decision?

## Usage

```
/consider:reversibility
```

## The Principle

**Two-way doors**: Decisions you can undo easily. Move fast.
**One-way doors**: Decisions that are hard/impossible to reverse. Move carefully.

Match your decision-making speed to the reversibility of the decision.

## Questions to Ask

- [ ] Can we undo this if it's wrong?
- [ ] What's the cost of reversal?
- [ ] How long until we know if it's right?
- [ ] What's locked in by this decision?

## Decision Speed Guide

### Two-Way Doors (Move Fast)
- Internal refactoring
- Feature flags
- A/B tests
- Documentation changes
- Adding optional parameters

### One-Way Doors (Move Carefully)
- Public API changes
- Database schema changes
- Security model changes
- Pricing changes
- Architecture decisions
- Removing functionality

## Strategies

### For One-Way Doors
- Get more input
- Consider alternatives
- Plan rollback (if possible)
- Document reasoning

### For Two-Way Doors
- Make the call
- Set review date
- Learn and adjust

## Related

- `/consider:tradeoffs`
- `/consider:margin-of-safety`
