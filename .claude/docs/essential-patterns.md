# Essential Development Patterns

Language-agnostic patterns that apply across all services.

## Quick Checklist

Before submitting any code:

- [ ] Pure functions where possible (no side effects)
- [ ] Errors handled explicitly (no silent failures)
- [ ] Inputs validated at boundaries
- [ ] Security considered (no secrets, sanitized inputs)
- [ ] Logging for debugging (structured, appropriate level)
- [ ] Tests cover critical paths

## Core Patterns

### 1. Pure Functions

Prefer functions without side effects:

```text
Good: function calculate(a, b) -> result
Bad: function calculate(a, b) { globalState.result = ... }
```

**When side effects needed**:

- Isolate them to specific layers (hooks, services)
- Make them explicit in function names (`fetchData`, `saveToStorage`)
- Document what side effects occur

### 2. Error Handling

Handle errors explicitly, never silently:

```
Good: try { ... } catch (e) { logError(e); throw; }
Good: result.isError ? handleError(result.error) : useData(result.data)
Bad: try { ... } catch (e) { /* ignore */ }
Bad: data?.value ?? defaultValue  // without knowing why data is null
```

**Error hierarchy**:

1. **Recoverable**: Retry, fallback, or user action
2. **Expected**: Validation errors, not-found -> return error state
3. **Unexpected**: Log, report, fail gracefully

### 3. Input Validation

Validate at system boundaries:

```
Validate: User input, API responses, external data
Trust: Internal function calls, typed parameters
```

**Validation order**:

1. Type/shape (does it match expected structure?)
2. Required fields (are all necessary fields present?)
3. Constraints (are values within valid ranges?)
4. Business rules (does it make sense in context?)

### 4. Security

Never commit secrets; sanitize all inputs:

- **Secrets**: Use environment variables, never hardcode
- **User input**: Sanitize before display (XSS) or database (SQL injection)
- **URLs**: Validate and sanitize before fetching
- **File paths**: Never trust user-provided paths

**Security checklist**:

- [ ] No API keys, tokens, or passwords in code
- [ ] User input escaped/sanitized
- [ ] URLs validated before use
- [ ] File operations use safe paths

### 5. Logging

Structured logging at appropriate levels:

- **error** - Failures needing attention (failed API call, unhandled exception)
- **warn** - Potential issues (deprecation, retry attempt)
- **info** - Significant events (user action, state change)
- **debug** - Development details (function entry/exit, variable values)

**Good logging**:

```
log.info('User action', { userId, action, timestamp })
log.error('API failed', { endpoint, status, error: e.message })
```

**Bad logging**:

```
console.log('here')
console.log(data)  // Dumps entire object
```

### 6. Testing

Test behaviour, not implementation:

```
Good: "when user clicks submit, form data is saved"
Bad: "handleSubmit calls setState then calls api.post"
```

**Test priority**:

1. Critical user paths (auth, data mutation, payments)
2. Edge cases (empty states, errors, boundaries)
3. Integration points (API calls, external services)
4. Complex logic (calculations, transformations)

## Pattern Application by Layer

- **UI Components** - Pure rendering, prop validation, error boundaries
- **Hooks/State** - Explicit side effects, error states, loading states
- **API/Services** - Input validation, error handling, logging
- **Utilities** - Pure functions, type safety, no side effects

## Anti-Patterns to Avoid

- **Silent catch** - Hides errors -> Log and rethrow or handle explicitly
- **God function** - Does too much -> Split into focused functions
- **Magic strings** - Typos, no autocomplete -> Use constants or enums
- **Premature optimisation** - Complexity without benefit -> Profile first, optimise second
- **Copy-paste** - Maintenance burden -> Extract shared logic
- **Deep nesting** - Hard to read -> Early returns, extract functions
