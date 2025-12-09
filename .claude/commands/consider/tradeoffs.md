# /consider:tradeoffs

Make tradeoffs explicit - what are we sacrificing for what?

## Usage

```
/consider:tradeoffs
```

## The Principle

Every decision involves tradeoffs. Making them explicit leads to better decisions.
There are no solutions, only tradeoffs.

## Framework

For any decision, document:

| We Get | We Give Up |
|--------|------------|
| Benefit A | Cost A |
| Benefit B | Cost B |

## Common Tradeoffs

### Speed vs Quality
- Ship fast → Technical debt
- Ship perfect → Miss market window

### Simplicity vs Flexibility
- Simple solution → May need rewrite later
- Flexible solution → More complexity now

### Build vs Buy
- Build → Control, but time investment
- Buy → Fast, but dependencies and cost

### Monolith vs Microservices
- Monolith → Simple ops, harder to scale teams
- Microservices → Team autonomy, operational complexity

## Questions to Ask

- [ ] What are we optimizing for?
- [ ] What are we explicitly deprioritizing?
- [ ] Are we okay with these tradeoffs?
- [ ] Who else should weigh in on this tradeoff?

## Related

- `/consider:reversibility`
- `/consider:opportunity-cost`
