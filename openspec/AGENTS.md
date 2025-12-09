# OpenSpec Instructions

Instructions for AI coding assistants using OpenSpec for spec-driven development.

## Before Any Task

**ALWAYS do this first:**

1. Run `openspec list` - see active changes (avoid conflicts)
2. Run `openspec list --specs` - see existing capabilities
3. Read relevant specs before proposing or implementing

Skipping this causes duplicate work and merge conflicts.

## TL;DR

1. Search: `openspec list`, `openspec list --specs`
2. Scope: new capability vs modify existing
3. ID: kebab-case, verb-led (`add-`, `update-`, `remove-`)
4. Scaffold: `proposal.md`, `tasks.md`, delta specs
5. Deltas: `## ADDED|MODIFIED|REMOVED Requirements` with `#### Scenario:`
6. Validate: `openspec validate [id] --strict`
7. Wait for approval before implementing

## Three-Stage Workflow

### Stage 1: Create Proposal

**Create proposal for:**

- New features/functionality
- Breaking changes (API, schema)
- Architecture/pattern changes

**Skip proposal for:**

- Bug fixes, typos, dependency updates, config changes

**Steps:**

1. Run `openspec list` and `openspec list --specs`
2. Create `changes/<id>/` with proposal.md, tasks.md, spec deltas
3. Run `openspec validate <id> --strict`

### Stage 2: Implement

1. Read proposal.md, design.md (if exists), tasks.md
2. Implement tasks sequentially
3. Mark tasks complete in tasks.md
4. Do NOT start until proposal approved

### Stage 3: Archive

After deployment: `openspec archive <change-id> --yes`

## Directory Structure

```text
openspec/
├── project.md           # Conventions
├── specs/<capability>/  # Truth - what IS built
│   └── spec.md
└── changes/<id>/        # Proposals - what SHOULD change
    ├── proposal.md
    ├── tasks.md
    └── specs/<capability>/spec.md
```

## CLI Commands

```bash
openspec list                    # Active changes
openspec list --specs            # Specifications
openspec show [item]             # Details
openspec validate [item] --strict # Validate
openspec archive <id> --yes      # Archive
```

## Spec Format

### Requirements

```markdown
### Requirement: Feature Name

System SHALL provide capability.

#### Scenario: Success case

- **WHEN** user performs action
- **THEN** expected result
```

**Rules:**

- Use `#### Scenario:` (4 hashtags, not bullets)
- Every requirement MUST have at least one scenario
- Use SHALL/MUST for normative requirements

### Delta Operations

Use these headers in change specs with stage indicators:

- `+` `## ADDED Requirements` - New capabilities
- `~` `## MODIFIED Requirements` - Changed behavior (include full requirement)
- `-` `## REMOVED Requirements` - Deprecated features
- `→` `## RENAMED Requirements` - Name changes only

**MODIFIED pitfall:** Always copy full existing requirement, then edit. Partial deltas lose detail at archive.

## Proposal Structure

**proposal.md:**

```markdown
# Change: Brief description

## Why
1-2 sentences on problem/opportunity

## What Changes
- Change list (mark **BREAKING** if applicable)

## Impact
- Affected specs: [capabilities]
- Affected code: [files]
```

**tasks.md:**

```markdown
## 1. Implementation

- [ ] 1.1 Task one
- [ ] 1.2 Task two (depends: 1.1)
- [~] 1.3 Task in progress
- [x] 1.4 Completed task
```

**Status symbols:**

- `[ ]` not started
- `[~]` in progress
- `[x]` completed

**Dependencies**: Add `(depends: 1.1, 1.2)` for blocked tasks. Complete deps first.

**Granular breakdown**: Each task should be atomic (independently completable, testable). If task takes >30 min, break it down further.

## Quick Reference

**Locations:** `changes/` = proposed, `specs/` = built, `archive/` = complete

**Files:** proposal.md (why/what), tasks.md (steps), spec.md (requirements)

Specs are truth. Changes are proposals. Keep them in sync.
