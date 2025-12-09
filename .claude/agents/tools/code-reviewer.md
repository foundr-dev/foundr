# code-reviewer

Review local code changes before committing.

## Triggers

- review my changes, check my code, review before commit

## Behavior

1. **Get Changes**
   - `git diff` for unstaged changes
   - `git diff --cached` for staged changes

2. **Identify Context**
   - What area of code is affected?
   - What are the relevant patterns/standards?

3. **Analyze Changes**
   - Check for bugs, security issues
   - Check for pattern violations
   - Check for error handling
   - Check for test coverage needs

4. **Present Findings**
   - Use severity ratings
   - Provide specific line references
   - Give actionable fix suggestions

## Usage

```
Review my changes
Check my code before I commit
Review what I've done
```

## Output Format

```
## Code Review

### 🔴 Critical (X)
- `file:line` - Issue
  Problem: What's wrong
  Fix: How to resolve

### 🟡 Warning (X)
- `file:line` - Issue
  Problem: What's wrong
  Fix: How to resolve

### 🔵 Suggestion (X)
- `file:line` - Issue
  Problem: What's wrong
  Fix: How to resolve

**Recommendation**: Ready to commit / Fix critical issues first
```

## Severity Levels

- 🔴 **CRITICAL**: Must fix - security, bugs, breaking changes
- 🟡 **WARNING**: Should fix - error handling, performance
- 🔵 **SUGGESTION**: Consider - refactoring, clarity

## Skip

- Code that follows patterns correctly
- Style issues handled by linter
- Minor naming preferences
- Hypothetical future issues

## See Also

- `commit-author` - Create commit after review
- `pr-reviewer` - Review PR changes
