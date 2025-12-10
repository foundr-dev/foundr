#!/usr/bin/env bun
/**
 * List all sessions with their status
 *
 * Usage:
 *   bun run src/scripts/sessions/list.ts              # All sessions
 *   bun run src/scripts/sessions/list.ts --orphans    # Only orphans
 *   bun run src/scripts/sessions/list.ts --json       # JSON output
 */

import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const REPO_ROOT = execSync("git rev-parse --show-toplevel", {
  encoding: "utf-8",
}).trim();
const SESSIONS_DIR = join(REPO_ROOT, ".claude", "sessions");

interface Session {
  branch: string;
  status: "CURRENT" | "ACTIVE" | "ORPHAN";
  created: string;
  taskStatus: string;
}

function getCurrentBranch(): string {
  try {
    return execSync("git branch --show-current", { encoding: "utf-8" }).trim();
  } catch {
    return "";
  }
}

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

function parseSessionFile(content: string): {
  created: string;
  status: string;
} {
  const createdMatch = content.match(/\*\*Created\*\*:\s*(.+)/);
  const statusMatch = content.match(/\*\*Status\*\*:\s*(.+)/);
  return {
    created: createdMatch?.[1]?.trim() ?? "unknown",
    status: statusMatch?.[1]?.trim() ?? "unknown",
  };
}

function listSessions(): Session[] {
  if (!existsSync(SESSIONS_DIR)) {
    return [];
  }

  const currentBranch = getCurrentBranch();
  const branches = getBranches();
  const sessions: Session[] = [];

  const files = readdirSync(SESSIONS_DIR).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    if (file === "README.md") continue;

    const branch = file.replace(".md", "");
    const filePath = join(SESSIONS_DIR, file);
    const content = readFileSync(filePath, "utf-8");
    const parsed = parseSessionFile(content);

    let status: "CURRENT" | "ACTIVE" | "ORPHAN";
    if (branch === currentBranch) {
      status = "CURRENT";
    } else if (branches.has(branch)) {
      status = "ACTIVE";
    } else {
      status = "ORPHAN";
    }

    sessions.push({
      branch,
      status,
      created: parsed.created,
      taskStatus: parsed.status,
    });
  }

  // Sort: CURRENT first, then ACTIVE, then ORPHAN
  const statusOrder = { CURRENT: 0, ACTIVE: 1, ORPHAN: 2 };
  sessions.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);

  return sessions;
}

// Main
const args = process.argv.slice(2);
const orphansOnly = args.includes("--orphans") || args.includes("--orphans-only");
const jsonOutput = args.includes("--json");

let sessions = listSessions();

if (orphansOnly) {
  sessions = sessions.filter((s) => s.status === "ORPHAN");
}

if (jsonOutput) {
  console.log(JSON.stringify(sessions, null, 2));
} else {
  if (sessions.length === 0) {
    console.log("No sessions found.");
  } else {
    console.log("STATUS   BRANCH                          TASK STATUS   CREATED");
    console.log("───────  ──────────────────────────────  ────────────  ────────────────");
    for (const s of sessions) {
      const statusPad = s.status.padEnd(7);
      const branchPad = s.branch.slice(0, 30).padEnd(30);
      const taskPad = s.taskStatus.slice(0, 12).padEnd(12);
      console.log(`${statusPad}  ${branchPad}  ${taskPad}  ${s.created}`);
    }
  }
}
