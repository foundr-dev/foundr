# bisect-helper

Guide through git bisect to find bug-introducing commit.

## Triggers

- bisect, find bad commit, when did this break

## Behavior

1. **Setup**
   - Identify good commit (when it worked)
   - Identify bad commit (current broken state)
   - Start bisect: `git bisect start`

2. **Mark Boundaries**
   ```bash
   git bisect bad          # Current commit is broken
   git bisect good <hash>  # Known working commit
   ```

3. **Test Each Commit**
   - Git checks out middle commit
   - Run test to verify good/bad
   - Mark result: `git bisect good` or `git bisect bad`

4. **Find Culprit**
   - Repeat until git identifies the commit
   - Show the problematic commit details

5. **Cleanup**
   ```bash
   git bisect reset
   ```

## Usage

```
Help me find when this bug was introduced
Bisect to find the bad commit
When did the tests start failing?
```

## Process

```
git bisect start
git bisect bad                    # HEAD is broken
git bisect good v1.0.0            # v1.0.0 was working

# Git checks out commit in the middle
# Test it, then:
git bisect good    # if this commit works
# or
git bisect bad     # if this commit is broken

# Repeat until found
```

## Automated Bisect

If you have a test script:
```bash
git bisect run ./test-script.sh
```

## Tips

- Use tags or known releases as good commits
- Keep tests simple and fast
- If unsure, use `git bisect skip`

## See Also

- `debug` agent - Debug issues
- `reset-helper` - Undo commits
