#!/usr/bin/env bun
/**
 * Git Safety Hints Hook (PreToolUse)
 * Suggests safer git practices before potentially destructive commands.
 *
 * Input: JSON via stdin with tool_input
 * Output: JSON with systemMessage if safety hint needed
 */

interface HookInput {
  tool_input?: {
    command?: string;
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

function getGitHint(command: string): string | null {
  const hints: string[] = [];

  // Check for git commands
  if (!command.includes("git ")) {
    return null;
  }

  // Force push without lease
  if (command.includes("--force") && !command.includes("--force-with-lease")) {
    hints.push("Consider using --force-with-lease instead of --force for safer force pushing");
  }

  // git reset --hard
  if (command.includes("reset") && command.includes("--hard")) {
    hints.push("git reset --hard discards uncommitted changes. Consider stashing first: git stash");
  }

  // git clean without dry-run
  if (command.includes("clean") && !command.includes("-n") && !command.includes("--dry-run")) {
    hints.push("Consider running with -n (dry-run) first to preview files that will be deleted");
  }

  // git checkout without explicit path
  if (command.includes("checkout") && !command.includes("-- ") && !command.includes("-b")) {
    // Check if it looks like a file restore vs branch switch
    const parts = command.split(" ").filter(Boolean);
    const lastPart = parts[parts.length - 1] ?? "";
    if (lastPart.includes(".") || lastPart.includes("/")) {
      hints.push("Use explicit -- separator for file paths: git checkout -- <file>");
    }
  }

  // git branch -D (force delete)
  if (command.includes("branch") && command.includes("-D")) {
    hints.push("Using -D force deletes branch regardless of merge status. Use -d for safer deletion");
  }

  // git push to main/master without PR
  if (command.includes("push") && (command.includes("main") || command.includes("master"))) {
    hints.push("Pushing directly to main/master. Consider creating a PR instead for code review");
  }

  // git rebase without explicit branch
  if (command.includes("rebase") && !command.includes("--continue") && !command.includes("--abort")) {
    hints.push("For interactive rebase, ensure you have a clean working tree first");
  }

  // git add . (add all)
  if (command.match(/git\s+add\s+\./) || command.match(/git\s+add\s+-A/)) {
    hints.push("Adding all files. Consider using explicit paths to avoid accidentally staging unwanted files");
  }

  if (hints.length === 0) {
    return null;
  }

  let message = "Git Safety Hints:\\n";
  for (const hint of hints) {
    message += `  - ${hint}\\n`;
  }

  return message;
}

function main(): void {
  const input = parseInput();
  if (!input?.tool_input?.command) {
    process.exit(0);
  }

  const hint = getGitHint(input.tool_input.command);
  if (hint) {
    console.log(JSON.stringify({ systemMessage: hint }));
  }
}

main();
