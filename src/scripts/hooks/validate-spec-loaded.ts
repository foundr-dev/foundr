#!/usr/bin/env bun
/**
 * Hook: validate-spec-loaded
 * Event: PreToolUse
 * Trigger: Write|Edit
 *
 * Reminds users to load relevant specs before making significant edits.
 * This is a hint-based hook, not a blocker.
 */

const toolInput = process.env.CLAUDE_TOOL_INPUT ?? "{}";

// Track if we've already shown the hint in this session
// (We can't persist across hook invocations, so this hint may repeat)

try {
  const input = JSON.parse(toolInput);
  const filePath: string = input.file_path ?? "";

  // Skip if no file path
  if (!filePath) {
    process.exit(0);
  }

  // Define file patterns and their relevant specs
  const specMappings: Array<{
    pattern: RegExp;
    spec: string;
    description: string;
  }> = [
    {
      pattern: /\.claude\/(agents|commands|skills|hooks)/,
      spec: "openspec/specs/claude-tooling/spec.md",
      description: "Claude tooling conventions",
    },
    {
      pattern: /src\/scripts\//,
      spec: "openspec/specs/cli/spec.md",
      description: "CLI script patterns",
    },
    {
      pattern: /openspec\//,
      spec: "openspec/AGENTS.md",
      description: "OpenSpec workflow",
    },
    {
      pattern: /\.test\.(ts|tsx)$|__tests__\//,
      spec: "openspec/specs/testing/spec.md",
      description: "Testing conventions",
    },
  ];

  // Check if the file matches any patterns
  for (const mapping of specMappings) {
    if (mapping.pattern.test(filePath)) {
      const message =
        `💡 Editing ${filePath.split("/").pop()}\n` +
        `   Consider loading: ${mapping.spec}\n` +
        `   (${mapping.description})`;
      console.log(JSON.stringify({ systemMessage: message }));
      process.exit(0);
    }
  }
} catch {
  // JSON parse error - let the operation through
}

process.exit(0);
