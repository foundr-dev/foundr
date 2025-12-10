---
description: Analyse code for performance, security, and potential issues
---

Systematic code optimisation analysis.

**Usage**: `/optimise [scope]`

**Scope**: `staged` (default) | `branch` | `file:<path>` | `dir:<path>`

<analysis_dimensions>
### 1. Performance

- **Algorithmic**: O(n^2) loops, unnecessary iterations, inefficient data structures
- **React-specific**: Missing memo, inline objects in JSX, expensive computations
- **Data fetching**: Missing query `select`, N+1 queries, blocking calls in async
- **Bundle**: Large imports, missing tree-shaking, unused code

### 2. Security

- CRITICAL: Exposed secrets, XSS with user input, SQL injection
- WARNING: Unsafe URLs, missing input validation, insecure storage
- INFO: Missing HTTPS, loose CORS, verbose error messages

### 3. Maintainability

- Type safety: `any` types, missing null checks, implicit conversions
- Error handling: Unhandled rejections, swallowed errors, missing cleanup
- Code quality: Deep nesting (>3 levels), large functions (>50 lines), magic numbers

### 4. Potential Issues

- Race conditions (async without cleanup)
- Memory leaks (missing useEffect cleanup, event listeners)
- State inconsistency (derived state, stale closures)
</analysis_dimensions>

<output_format>
```text
optimise-report{scope,files_checked,issues_found}:
  staged,12,5

critical[]{file,line,issue}:
  src/api.ts,45,exposed-api-key

warnings[]{file,line,issue,fix}:
  src/hooks.ts,23,missing-cleanup,add-useEffect-return
```
</output_format>

## Usage

Read-only analysis. Delegate to `debug` or `refactor` for fixes.
