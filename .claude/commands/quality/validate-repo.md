---
description: Validate repository configuration and integrity
---

# /validate-repo

Scan config -> check rules -> report issues

```text
/validate-repo [scope]
```

Scopes: `all` (default) | `claude` | `openspec` | `docs`

<checks>
**Claude** (`.claude/`):

- Agent/command frontmatter complete
- File references valid
- Registry entries match actual files
- Agent delegation compliance (orchestrators have Task, specialists don't)
- README lists match actual files
- Doc-spec compliance (no tables, size targets)

**OpenSpec**:

- project.md + AGENTS.md exist per module
- `openspec validate` passes
- No stale changes (>30 days without activity)

**Docs**:

- Internal links resolve
- Cross-references valid (see X sections exist)
- Relative paths correct
- Prompt optimisation (critical rules in first 15%, nesting depth)

**Git**:

- No uncommitted changes in tracked files
- Branch ahead/behind status

Severities: ERROR | WARNING | INFO
</checks>

<output_format>
```
validation{scope,files,duration}: all,47,2.3s
summary{passed,errors,warnings,info}: 42,2,3,5
errors[N]{category,file,issue}: claude,agents/missing.md,file not found
```
</output_format>

Read-only, non-destructive.
