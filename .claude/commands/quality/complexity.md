---
description: Analyse code for algorithmic complexity (Big O) and performance issues
---

# Complexity Analysis

Analyse code for Big O complexity and performance anti-patterns.

## Usage

```text
/complexity [scope]
```

**Scope options**:

- `staged` - Staged git changes (default)
- `branch` - All changes vs main
- `file:<path>` - Specific file
- `dir:<path>` - Specific directory

<process>
1. Gather files based on scope
2. Delegate to `complexity-analyser` agent
3. Report findings by severity (CRITICAL, HIGH, MEDIUM, LOW)
</process>

## Example

```
/complexity staged
```

Output:

```
complexity{scope,files,issues}:
  staged,3,2

HIGH[1]{file:line,function,complexity,issue}:
  useData.ts:67,processItems,O(n^2),nested find in forEach

Recommendation: Build Map for O(1) lookups
```
