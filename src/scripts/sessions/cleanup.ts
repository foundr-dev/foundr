#!/usr/bin/env bun
/**
 * Clean up orphaned sessions (branches that no longer exist)
 *
 * Usage:
 *   bun run src/scripts/sessions/cleanup.ts --dry-run  # Preview cleanup
 *   bun run src/scripts/sessions/cleanup.ts            # Execute cleanup
 */

import { execSync } from "node:child_process";
import { existsSync, readdirSync, unlinkSync } from "node:fs";
import { join } from "node:path";

const REPO_ROOT = execSync("git rev-parse --show-toplevel", {
  encoding: "utf-8",
}).trim();
const SESSIONS_DIR = join(REPO_ROOT, ".claude", "sessions");

function getBranches(): Set<string> {
  try {
    const output = execSync("git branch --format='%(refname:short)'", {
      encoding: "utf-8",
    });
    return new Set(output.trim().split("\n").filter(Boolean));
  } catch {
    return new Set();
  }
}

function findOrphans(): string[] {
  if (!existsSync(SESSIONS_DIR)) {
    return [];
  }

  const branches = getBranches();
  const orphans: string[] = [];

  const files = readdirSync(SESSIONS_DIR).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    if (file === "README.md") continue;

    const branch = file.replace(".md", "");
    if (!branches.has(branch)) {
      orphans.push(file);
    }
  }

  return orphans;
}

// Main
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");

const orphans = findOrphans();

if (orphans.length === 0) {
  console.log("No orphaned sessions found.");
  process.exit(0);
}

console.log(`Found ${orphans.length} orphaned session(s):`);
for (const file of orphans) {
  console.log(`  - ${file}`);
}

if (dryRun) {
  console.log("\n[Dry run] No files deleted.");
} else {
  console.log("\nDeleting orphaned sessions...");
  for (const file of orphans) {
    const filePath = join(SESSIONS_DIR, file);
    unlinkSync(filePath);
    console.log(`  Deleted: ${file}`);
  }
  console.log("Done.");
}
