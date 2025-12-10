# Hook Templates (TypeScript)

All hooks in foundr use TypeScript with Bun runtime.

## Base Template

```typescript
#!/usr/bin/env bun
// Hook: <name>
// Event: <event type>
// Trigger: <matcher pattern>
// Purpose: <description>

const toolName = process.env.CLAUDE_TOOL_NAME ?? "";
const toolInput = process.env.CLAUDE_TOOL_INPUT ?? "{}";

// Your logic here

// Output format for messages:
// console.log(JSON.stringify({ systemMessage: "message to show" }));

// Exit codes:
// 0 = success, continue
// 1 = error, report to Claude
// 2 = block the tool call

process.exit(0);
```

## Validation Hook (PreToolUse)

```typescript
#!/usr/bin/env bun
// Hook: validate-file-access
// Event: PreToolUse
// Trigger: Write|Edit

const toolInput = process.env.CLAUDE_TOOL_INPUT ?? "{}";

try {
  const input = JSON.parse(toolInput);
  const filePath = input.file_path ?? "";

  // Block writes to protected files
  const protectedPatterns = [/\.env/, /credentials/, /secrets/];

  for (const pattern of protectedPatterns) {
    if (pattern.test(filePath)) {
      console.log(JSON.stringify({
        systemMessage: `⚠️ Cannot modify protected file: ${filePath}\nUse environment variables instead.`
      }));
      process.exit(2); // Block
    }
  }
} catch {
  // JSON parse error - let it through
}

process.exit(0);
```

## Hint Hook (UserPromptSubmit)

```typescript
#!/usr/bin/env bun
// Hook: workflow-hint
// Event: UserPromptSubmit
// Purpose: Suggest workflows based on prompt keywords

const prompt = process.env.CLAUDE_USER_PROMPT ?? "";
const promptLower = prompt.toLowerCase();

const hints: Array<{ keywords: string[]; message: string }> = [
  {
    keywords: ["bug", "fix", "error", "broken"],
    message: "💡 Consider using /planning:research to investigate before fixing"
  },
  {
    keywords: ["add", "implement", "create", "build"],
    message: "💡 Consider using /openspec:proposal for significant changes"
  },
  {
    keywords: ["refactor", "redesign", "architecture"],
    message: "💡 Consider creating a plan first with /planning:plan"
  }
];

for (const hint of hints) {
  if (hint.keywords.some(kw => promptLower.includes(kw))) {
    console.log(JSON.stringify({ systemMessage: hint.message }));
    process.exit(0);
  }
}

process.exit(0);
```

## Safety Hook (PreToolUse - Bash)

```typescript
#!/usr/bin/env bun
// Hook: bash-safety
// Event: PreToolUse
// Trigger: Bash

const toolInput = process.env.CLAUDE_TOOL_INPUT ?? "{}";

try {
  const input = JSON.parse(toolInput);
  const command = input.command ?? "";

  const dangerousPatterns = [
    /rm\s+-rf\s+[\/~]/,
    />\s*\/dev\//,
    /--force\s+push/,
    /drop\s+table/i,
    /truncate\s+table/i
  ];

  for (const pattern of dangerousPatterns) {
    if (pattern.test(command)) {
      console.log(JSON.stringify({
        systemMessage: `⚠️ Potentially dangerous command detected:\n${command}\n\nPlease confirm this is intentional.`
      }));
      process.exit(2); // Block
    }
  }
} catch {
  // JSON parse error - let it through
}

process.exit(0);
```

## Logging Hook (PostToolUse)

```typescript
#!/usr/bin/env bun
// Hook: tool-logger
// Event: PostToolUse
// Purpose: Log tool usage for debugging

import { appendFileSync } from "fs";
import { join } from "path";

const toolName = process.env.CLAUDE_TOOL_NAME ?? "unknown";
const timestamp = new Date().toISOString();

const logLine = `${timestamp} | ${toolName}\n`;
const logPath = join(process.env.HOME ?? "~", ".claude", "tool-log.txt");

try {
  appendFileSync(logPath, logLine);
} catch {
  // Ignore logging errors
}

process.exit(0);
```

## SubagentStop Hook

```typescript
#!/usr/bin/env bun
// Hook: subagent-complete
// Event: SubagentStop
// Trigger: execute-task (or specific agent name)

const toolName = process.env.CLAUDE_TOOL_NAME ?? "";
const toolOutput = process.env.CLAUDE_TOOL_OUTPUT ?? "";

// Remind orchestrator of next steps
const message = `✅ ${toolName} completed.\nRemember to verify changes and run tests before shipping.`;

console.log(JSON.stringify({ systemMessage: message }));
process.exit(0);
```

## Environment Variables

Available in hooks:

```toon
env_vars{variable,available_in,description}:
  CLAUDE_TOOL_NAME,PreToolUse|PostToolUse|SubagentStop,"Name of tool being called"
  CLAUDE_TOOL_INPUT,PreToolUse|PostToolUse,"JSON input to tool"
  CLAUDE_USER_PROMPT,UserPromptSubmit,"User's prompt text"
  CLAUDE_TOOL_OUTPUT,PostToolUse|SubagentStop,"Output from tool execution"
```

## settings.json Configuration

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [{
          "type": "command",
          "command": "$HOME/.bun/bin/bun run \"$(git rev-parse --show-toplevel)/src/scripts/hooks/validate-file-access.ts\"",
          "timeout": 5
        }]
      }
    ],
    "PostToolUse": [
      {
        "matcher": ".*",
        "hooks": [{
          "type": "command",
          "command": "$HOME/.bun/bin/bun run \"$(git rev-parse --show-toplevel)/src/scripts/hooks/tool-logger.ts\"",
          "timeout": 5
        }]
      }
    ],
    "UserPromptSubmit": [
      {
        "matcher": ".*",
        "hooks": [{
          "type": "command",
          "command": "$HOME/.bun/bin/bun run \"$(git rev-parse --show-toplevel)/src/scripts/hooks/workflow-hint.ts\"",
          "timeout": 5
        }]
      }
    ]
  }
}
```

## Best Practices

1. **Keep hooks fast** - Target <100ms execution
2. **Use exit codes correctly** - 0=success, 1=error, 2=block
3. **Prefer hints over blocks** - Blocking frustrates workflow
4. **Handle JSON parse errors** - Use try/catch and let through on error
5. **Use nullish coalescing** - `process.env.VAR ?? "default"`
6. **Test thoroughly** - Use `claude --debug`
