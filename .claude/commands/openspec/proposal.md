# /openspec:proposal

Create a new OpenSpec change proposal.

## Usage

```
/openspec:proposal <change-id>
/openspec:proposal add-plugin-system
```

## Behavior

1. Check existing changes with `openspec list`
2. Create directory structure:
   ```
   openspec/changes/<change-id>/
   ├── proposal.md
   ├── tasks.md
   └── specs/<capability>/spec.md
   ```
3. Generate proposal.md template
4. Generate tasks.md template
5. Create delta spec with appropriate headers

## Workflow

After creation:
1. Fill in proposal.md (why, what changes, impact)
2. Define tasks in tasks.md
3. Write spec deltas with scenarios
4. Run `openspec validate <change-id> --strict`
5. Request approval before implementing

## Delta Spec Format

```markdown
## ADDED Requirements

### Requirement: Feature Name

System SHALL provide capability.

#### Scenario: Success case

- **WHEN** user performs action
- **THEN** expected result
```

## Rules

- Change ID must be kebab-case
- Change ID should be verb-led (add-, update-, remove-)
- Must have at least one delta spec
- Every requirement must have at least one scenario
