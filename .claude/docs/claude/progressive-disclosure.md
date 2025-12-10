# Progressive Skill Disclosure

Keep SKILL.md small by offloading detail to subdirectories. Claude loads references only when needed.

## Structure

```text
skill-name/
├── SKILL.md              # Router + core principles (< 150 lines)
├── references/           # Domain knowledge (loaded on demand)
│   ├── patterns.md
│   └── anti-patterns.md
├── workflows/            # Step-by-step procedures
│   └── complex-flow.md
└── templates/            # Output structures
    └── output.md
```

## SKILL.md Role

The main file acts as a **router**:

1. Define purpose and triggers
2. Assess situation
3. Route to appropriate workflow/reference
4. Contain only essential principles

<example>
```markdown
---
name: example-skill
description: Does X when Y happens
allowed-tools: [Read, Write, Edit]
---

<objective>
[One sentence purpose]
</objective>

<routing>
intent{pattern,action}:
  "simple case" -> execute inline
  "complex case" -> Read references/complex-patterns.md then execute
  "needs template" -> Read templates/output.md for format
</routing>

<core_principles>

- Principle 1 (always applies)
- Principle 2 (always applies)
</core_principles>

<success_criteria>

- Criterion 1
- Criterion 2
</success_criteria>

Done: [completion condition]
Ask first: [what to clarify]

```
</example>

## When to Split

**Keep in SKILL.md:**
- Purpose/objective
- Core principles (always needed)
- Routing logic
- Success criteria
- Done conditions

**Move to references/:**
- Domain-specific knowledge
- Detailed patterns/anti-patterns
- Background context
- Technical specifications

**Move to workflows/:**
- Multi-step procedures
- Complex decision trees
- Conditional flows

**Move to templates/:**
- Output format specifications
- Document structures
- Code templates

## Loading Strategy

```toon
loading{situation,action}:
  always -> "SKILL.md is loaded automatically"
  on_demand -> "Reference files loaded when route matches"
  never_preload -> "Don't load all references upfront"
```

## Benefits

1. **Token efficiency** - Only load what's needed
2. **Maintainability** - Update parts independently
3. **Clarity** - SKILL.md shows structure at a glance
4. **Scalability** - Add complexity without bloating router

## Integration with Commands

Commands can invoke skills while maintaining explicit access:

```markdown
# /consider:pareto
Apply Pareto analysis (80/20 rule) to: $ARGUMENTS

Invoke `mental-models` skill, loading `references/decision-making.md`.
```

Users get both:

- **Explicit**: `/consider:pareto` for direct invocation
- **Auto**: Skill triggers on "prioritise" keywords

## Migration

Existing large skills should be refactored:

1. Extract domain knowledge -> `references/`
2. Extract procedures -> `workflows/`
3. Extract templates -> `templates/`
4. Keep router in SKILL.md (< 150 lines target)
