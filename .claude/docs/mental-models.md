# Mental Models for Decision Making

Use `/consider:*` commands at key decision points in your workflow.

## Quick Reference

| Model | Use When | Command |
|-------|----------|---------|
| First Principles | Questioning assumptions | `/consider:first-principles` |
| 5 Whys | Debugging, finding root cause | `/consider:5-whys` |
| Inversion | Risk planning, avoiding failure | `/consider:inversion` |
| Second Order | Evaluating change impact | `/consider:second-order` |
| Pareto (80/20) | Prioritising, finding vital few | `/consider:pareto` |
| Opportunity Cost | Choosing between options | `/consider:opportunity-cost` |
| Bottlenecks | Performance, optimisation | `/consider:bottlenecks` |
| Margin of Safety | Risk assessment, buffers | `/consider:margin-of-safety` |
| Tradeoffs | Architectural decisions | `/consider:tradeoffs` |
| Reversibility | Decision speed matching | `/consider:reversibility` |
| Via Negativa | Improvement by removal | `/consider:via-negativa` |
| Premature Optimisation | Optimisation decisions | `/consider:premature-optimisation` |
| YAGNI | Feature scope decisions | `/consider:yagni` |

## Integration Points

### During Bug Fixing

| Stage | Models |
|-------|--------|
| Investigation | 5-whys, first-principles |
| Root Cause | 5-whys (mandatory for complex bugs) |
| Fix Planning | pareto, reversibility |

### During Feature Implementation

| Stage | Models |
|-------|--------|
| Requirements | first-principles, yagni |
| Design | tradeoffs, second-order, reversibility |
| Implementation | pareto, via-negativa, premature-optimisation |
| Review | bottlenecks, margin-of-safety |

### During Planning

| Stage | Models |
|-------|--------|
| Research | 5-whys, first-principles |
| Planning | pareto, second-order, tradeoffs, inversion |
| Prioritisation | opportunity-cost |

### During Code Review

| Situation | Models |
|-----------|--------|
| Architecture change | second-order, tradeoffs, reversibility |
| Performance change | premature-optimisation, bottlenecks |
| New feature | yagni, via-negativa |
| Bug fix | 5-whys (verify root cause addressed) |

## Combining Models

Some decisions benefit from multiple models:

| Decision | Models to Combine |
|----------|-------------------|
| Should we refactor this? | yagni + premature-optimisation + opportunity-cost |
| Which bug to fix first? | pareto + 5-whys (for severity) |
| Add this feature? | yagni + second-order + reversibility |
| Optimise this code? | premature-optimisation + bottlenecks + pareto |

## When NOT to Use

- Simple, obvious tasks (don't overthink)
- Time-critical hotfixes (act first, analyse later)
- Already-decided items (avoid analysis paralysis)
