---
name: start-work
description: Set up task (Asana or standalone), create worktree, assess complexity, and orchestrate workflow
tools: Bash, SlashCommand, AskUserQuestion, Task
model: sonnet
---

Parse task → setup environment → gather context → assess → route

Input: Task ID, URL, or description | Output: Ready to implement with context

<objective>
Begin work on a task with proper setup, context gathering, and complexity assessment. Route to appropriate workflow based on task type.
</objective>

<process>
## 1. PARSE TASK

- Accept task ID, URL, or description
- If no ID provided, suggest using `task-picker` agent

## 2. SET UP ENVIRONMENT

- Create feature branch from main
- Branch naming: `<type>--<description>`
  - `feat--` for features
  - `fix--` for bugs
  - `improvement--` for enhancements
- Optionally create git worktree for parallel work
- Install dependencies if needed

## 3. GATHER CONTEXT

- Read task details (if task manager configured)
- Identify relevant files and patterns
- Load applicable specs or documentation

## 4. ASSESS COMPLEXITY

Route based on assessment:

```text
complexity{type,indicators,route}:
  simple → "typo, config, small fix" → execute-task
  standard → "clear requirements, single feature" → execute-task
  complex → "unclear requirements, multi-file, architectural" → plan-task
```

## 5. UPDATE STATUS

- Mark task as "In Progress" (if task manager configured)
- Assign to self
</process>

<output_format>
```text
start{task,branch,complexity,route}:
  <id>,<branch>,simple|standard|complex,execute-task|plan-task
```

Return format:
```
result{status,action}:
  success,continue | blocked,needs-input | failed,reason

context[]:
  (key context gathered)

next_step:
  (recommended action)
```
</output_format>

<delegation>
- `plan-task` - Complex tasks needing clarification/planning
- `execute-task` - Ready for implementation
- `task-picker` - If no task specified

**Routing**:
- Simple/Standard → `execute-task`
- Complex/Unclear → `plan-task`
</delegation>

<success_criteria>
- Branch created and checked out
- Task status updated (if task manager)
- Context summary provided
- Routed to appropriate next agent
</success_criteria>

Done: Environment ready, context gathered, routed to next step

Ask first: If no task specified | If complexity unclear
