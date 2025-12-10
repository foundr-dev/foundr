#!/usr/bin/env bun
/**
 * Read a session file
 *
 * Usage:
 *   bun run src/scripts/sessions/read.ts              # Current branch session
 *   bun run src/scripts/sessions/read.ts <branch>     # Specific branch session
 */

import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
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

// Main
const args = process.argv.slice(2);
const branch = args[0] || getCurrentBranch();

if (!branch) {
  console.error("Error: No branch specified and not on a git branch.");
  process.exit(1);
}

const sessionPath = join(SESSIONS_DIR, `${branch}.md`);

if (!existsSync(sessionPath)) {
  console.error(`No session found for branch: ${branch}`);
  console.error(`Expected file: ${sessionPath}`);
  process.exit(1);
}

const content = readFileSync(sessionPath, "utf-8");
console.log(content);
