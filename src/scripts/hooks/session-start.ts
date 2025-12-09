#!/usr/bin/env bun
/**
 * Session Start Hook
 * Validates environment and shows welcome message when Claude session starts.
 *
 * Output: JSON with systemMessage field
 */

import { execSync } from "node:child_process";
import { existsSync } from "node:fs";

interface ValidationError {
  name: string;
  fix: string;
}

function checkCommand(cmd: string): boolean {
  try {
    execSync(`command -v ${cmd}`, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function validateEnvironment(): ValidationError[] {
  const errors: ValidationError[] = [];

  // Check bun
  if (!checkCommand("bun")) {
    errors.push({
      name: "bun CLI not found",
      fix: "Install from https://bun.sh",
    });
  }

  // Check git
  if (!checkCommand("git")) {
    errors.push({
      name: "git CLI not found",
      fix: "Install from https://git-scm.com/downloads",
    });
  }

  // Check gh CLI
  if (!checkCommand("gh")) {
    errors.push({
      name: "gh CLI not found",
      fix: "Install from https://cli.github.com then run: gh auth login",
    });
  } else {
    try {
      execSync("gh auth status", { stdio: "ignore" });
    } catch {
      errors.push({
        name: "gh CLI not authenticated",
        fix: "Run: gh auth login",
      });
    }
  }

  // Check node_modules
  if (!existsSync("node_modules")) {
    errors.push({
      name: "Dependencies not installed",
      fix: "Run: bun install",
    });
  }

  return errors;
}

function getQuickStartCommands(_cwd: string): string[] {
  const commands: string[] = [];

  // Check if we're at repo root
  const isRepoRoot = existsSync("src/cli.ts");

  if (isRepoRoot) {
    commands.push("/commit        - Create conventional commit");
    commands.push("/ship          - Commit, push, and create PR");
    commands.push("bun run dev    - Start development");
    commands.push("bun test       - Run tests");
  } else {
    commands.push("cd to repo root for full functionality");
  }

  return commands;
}

function formatOutput(errors: ValidationError[]): string {
  if (errors.length > 0) {
    let msg = "⚠️  ENVIRONMENT SETUP REQUIRED  ⚠️\\n";
    msg += "========================================\\n\\n";

    for (const error of errors) {
      msg += `[MISSING] ${error.name}\\n`;
      msg += `  Fix: ${error.fix}\\n\\n`;
    }

    msg += "========================================\\n";
    msg += "Run 'bun install' to set up dependencies";

    return msg;
  }

  // Environment OK - show welcome
  let msg = "========================================\\n";
  msg += "  foundr - AI Development Infrastructure\\n";
  msg += "========================================\\n\\n";

  msg += "Quick Start:\\n";
  const commands = getQuickStartCommands(process.cwd());
  for (const cmd of commands) {
    msg += `  ${cmd}\\n`;
  }

  msg += "\\n";
  msg += "Run /help for all available commands.\\n";
  msg += "========================================";

  return msg;
}

function main(): void {
  const errors = validateEnvironment();
  const message = formatOutput(errors);

  // Output JSON for Claude hook system
  console.log(JSON.stringify({ systemMessage: message }));
}

main();
