#!/usr/bin/env bun
/**
 * Create a new session file
 *
 * Usage:
 *   bun run src/scripts/sessions/create.ts <branch> [--task "description"]
 *   bun run src/scripts/sessions/create.ts           # Uses current branch
 */

import { execSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REPO_ROOT = execSync("git rev-parse --show-toplevel", {
  encoding: "utf-8",
}).trim();
const SESSIONS_DIR = join(REPO_ROOT, ".claude", "sessions");

function getCurrentBranch(): string {
  try {
    return execSync("git branch --show-current", { encoding: "utf-8" }).trim();
  } catch {
    return "";
  }
}

function formatDate(): string {
  const now = new Date();
  return now.toISOString().slice(0, 16).replace("T", " ");
}

// Parse args
const args = process.argv.slice(2);
let branch = "";
let task = "";

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  const nextArg = args[i + 1];
  if (arg === "--task" && nextArg) {
    task = nextArg;
    i++;
  } else if (arg && !arg.startsWith("--")) {
    branch = arg;
  }
}

branch = branch || getCurrentBranch();

if (!branch) {
  console.error("Error: No branch specified and not on a git branch.");
  process.exit(1);
}

// Ensure sessions directory exists
if (!existsSync(SESSIONS_DIR)) {
  mkdirSync(SESSIONS_DIR, { recursive: true });
}

const sessionPath = join(SESSIONS_DIR, `${branch}.md`);

if (existsSync(sessionPath)) {
  console.error(`Session already exists: ${sessionPath}`);
  console.error("Use read.ts to view or edit manually.");
  process.exit(1);
}

const content = `# Session: ${branch}

**Created**: ${formatDate()}
**Task**: ${task || "[Add task description]"}
**Status**: planning

## Progress

- [ ] [First task]
- [ ] [Second task]

## Key Decisions

- [Decision 1]

## Context

[Add context for resuming work]

## Files Modified

- [List files as you modify them]
`;

writeFileSync(sessionPath, content);
console.log(`Created session: ${sessionPath}`);
