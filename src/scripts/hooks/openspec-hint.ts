#!/usr/bin/env bun
/**
 * OpenSpec Hint Hook (UserPromptSubmit)
 * Suggests using OpenSpec for significant changes.
 *
 * Input: User prompt via argv[2]
 * Output: JSON with systemMessage if hint needed
 */

const CHANGE_KEYWORDS = [
  "add",
  "implement",
  "create",
  "build",
  "refactor",
  "redesign",
  "architecture",
  "breaking",
  "migrate",
  "change",
  "new feature",
  "new command",
  "new agent",
];

const OPENSPEC_KEYWORDS = ["openspec", "spec", "proposal", "change/", "changes/"];

function main(): void {
  const prompt = process.argv[2];
  if (!prompt) {
    process.exit(0);
  }

  const promptLower = prompt.toLowerCase();

  // Check if already mentioning OpenSpec
  for (const keyword of OPENSPEC_KEYWORDS) {
    if (promptLower.includes(keyword)) {
      // Already using OpenSpec, no hint needed
      process.exit(0);
    }
  }

  // Check for change-suggesting keywords
  for (const keyword of CHANGE_KEYWORDS) {
    if (promptLower.includes(keyword)) {
      const message =
        "💡 This looks like a significant change. Consider using OpenSpec:\n" +
        "   /openspec:proposal - Create a change proposal first\n" +
        "   See openspec/AGENTS.md for workflow details";
      console.log(JSON.stringify({ systemMessage: message }));
      process.exit(0);
    }
  }

  // No hints needed
  process.exit(0);
}

main();
