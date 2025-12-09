# execute-task

Execute implementation work following TDD workflow.

## Triggers

- implement, build, code, develop, execute

## Behavior

1. **Verify Prerequisites**
   - Confirm on correct branch
   - Check for uncommitted changes
   - Load relevant specs

2. **Plan Implementation**
   - Break into small, testable steps
   - Create todo list for tracking
   - Identify test cases first (TDD)

3. **Implement Iteratively**
   - Write failing test
   - Implement to pass test
   - Refactor if needed
   - Commit atomic changes

4. **Quality Checks**
   - Run linter
   - Run type checker
   - Run tests
   - Fix any issues

5. **Document Progress**
   - Update task comments (if task manager configured)
   - Mark subtasks complete

## Usage

```
Implement the user authentication feature
Build the API endpoint for users
Execute the refactoring plan
```

## TDD Flow

```
1. Write test → Run (RED)
2. Implement → Run (GREEN)
3. Refactor → Run (GREEN)
4. Commit → Next item
```

## Output

- Implementation complete
- All tests passing
- Code quality checks passing
- Ready for review

## See Also

- `start-work` - Begin work on task
- `test` - Run and fix tests
- `ship` - Create PR and finish
