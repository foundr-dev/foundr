# OpenSpec Workflow

Use OpenSpec for significant changes that need tracking and approval.

## When to Use OpenSpec

- New features or capabilities
- Breaking changes
- Architecture changes
- Performance or security work
- Anything that benefits from documented design decisions

## Commands

```
/openspec:proposal  - Create a new change proposal
/openspec:apply     - Implement an approved change
/openspec:archive   - Archive after deployment
```

## Workflow

1. **Proposal** → Create change document with rationale
2. **Review** → Get approval before implementation
3. **Apply** → Implement the approved change
4. **Archive** → Move to archive after deployment

## Spec Structure

```
openspec/
├── AGENTS.md           # OpenSpec workflow documentation
├── changes/            # Active proposals and implementations
│   └── <name>/
│       ├── README.md   # Change proposal
│       └── delta.md    # Implementation details
├── specs/              # Authoritative specifications
│   └── <domain>/
│       └── spec.md     # Domain specification
└── archive/            # Completed changes
```
