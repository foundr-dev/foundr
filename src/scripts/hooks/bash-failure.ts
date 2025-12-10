#!/usr/bin/env bun
/**
 * Bash Failure Detection Hook (PostToolUse)
 * Detects when bash commands fail and provides helpful context.
 *
 * Input: JSON via stdin with tool_input and tool_output
 * Output: JSON with systemMessage if failure detected
 */

interface HookInput {
  tool_input?: {
    command?: string;
  };
  tool_output?: {
    stdout?: string;
    stderr?: string;
    exit_code?: number;
  };
}

function parseInput(): HookInput | null {
  try {
    const input = process.argv[2];
    if (!input) return null;
    return JSON.parse(input) as HookInput;
  } catch {
    return null;
  }
}

function detectFailure(input: HookInput): string | null {
  const exitCode = input.tool_output?.exit_code;
  const stderr = input.tool_output?.stderr ?? "";
  const command = input.tool_input?.command ?? "";

  // Only trigger on non-zero exit codes
  if (exitCode === 0 || exitCode === undefined) {
    return null;
  }

  // Common failure patterns and suggestions
  const suggestions: string[] = [];

  // Permission denied
  if (stderr.includes("Permission denied")) {
    suggestions.push("Check file permissions or try with appropriate access");
  }

  // Command not found
  if (stderr.includes("command not found") || stderr.includes("not found")) {
    const cmdName = command.split(" ")[0];
    suggestions.push(`Ensure '${cmdName}' is installed and in PATH`);
  }

  // Git errors
  if (command.startsWith("git ")) {
    if (stderr.includes("not a git repository")) {
      suggestions.push("Initialize git repository with 'git init'");
    }
    if (stderr.includes("nothing to commit")) {
      suggestions.push("No changes to commit - this may be expected");
    }
    if (stderr.includes("conflict")) {
      suggestions.push("Resolve merge conflicts before continuing");
    }
  }

  // npm/bun errors
  if (command.includes("npm ") || command.includes("bun ")) {
    if (stderr.includes("ENOENT")) {
      suggestions.push("Check that the file or package exists");
    }
    if (stderr.includes("peer dep")) {
      suggestions.push("Peer dependency issue - may need manual resolution");
    }
  }

  // TypeScript errors
  if (stderr.includes("error TS")) {
    suggestions.push("TypeScript compilation errors detected");
  }

  // Build generic message if no specific pattern matched
  if (suggestions.length === 0) {
    return null; // Don't add noise for unrecognized failures
  }

  let message = `Command failed (exit ${exitCode}):\n`;
  message += `Command: ${command.substring(0, 100)}${command.length > 100 ? "..." : ""}\n\n`;
  message += "Suggestions:\n";
  for (const suggestion of suggestions) {
    message += `  - ${suggestion}\n`;
  }

  return message;
}

function main(): void {
  const input = parseInput();
  if (!input) {
    // No input or parse error - silent exit
    process.exit(0);
  }

  const message = detectFailure(input);
  if (message) {
    console.log(JSON.stringify({ systemMessage: message }));
  }
}

main();
