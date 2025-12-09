# /consider:5-whys

Drill to root cause by asking "why" repeatedly (typically 5 times).

## Usage

```
/consider:5-whys
```

## The Principle

Surface-level problems often mask deeper root causes.
Asking "why" repeatedly uncovers the real issue to fix.

## Process

```
Problem: The deployment failed

Why? → The tests failed
Why? → The API returned 500
Why? → The database connection timed out
Why? → Connection pool was exhausted
Why? → We're not closing connections properly
→ ROOT CAUSE: Connection leak in the code
```

## Guidelines

- Keep asking until you reach something actionable
- 5 is a guideline, not a rule - could be 3 or 7
- Multiple branches are okay - some problems have multiple causes
- Focus on systems, not people

## Questions to Ask

At each level:
- [ ] Why did this happen?
- [ ] What enabled this to happen?
- [ ] What would have prevented this?

## Anti-patterns

❌ Stopping too early: "Tests failed" → "We need better tests"
✅ Going deeper: "Tests failed" → Why? → Root cause

❌ Blaming people: "Developer made a mistake"
✅ Fixing systems: "No safeguard caught this mistake"

## Related

- `/consider:first-principles`
- `/consider:bottlenecks`
