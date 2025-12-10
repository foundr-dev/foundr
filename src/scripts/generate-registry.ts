#!/usr/bin/env bun
/**
 * Generate registry.toon from file system
 * Usage: bun run src/scripts/generate-registry.ts [--preview]
 */

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { writeFileSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";

const REPO_ROOT = join(import.meta.dirname, "../..");
const CLAUDE_DIR = join(REPO_ROOT, ".claude");
const HOOKS_DIR = join(REPO_ROOT, "src/scripts/hooks");
const REGISTRY_PATH = join(CLAUDE_DIR, "registry.toon");

const preview = process.argv.includes("--preview");

interface ComponentEntry {
  id: string;
  path: string;
  triggers: string;
  description: string;
  extra?: string; // For requires (agents) or event (hooks)
}

function findAllFiles(dir: string, pattern: string): string[] {
  const files: string[] = [];

  if (!existsSync(dir)) return files;

  function walk(currentDir: string): void {
    const entries = readdirSync(currentDir);
    for (const entry of entries) {
      const fullPath = join(currentDir, entry);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (entry.endsWith(pattern) && entry !== "README.md" && !entry.startsWith("_")) {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  return files.sort();
}

function extractFromMarkdown(filePath: string): { description: string; triggers: string } {
  const content = readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  let description = "";
  const triggerList: string[] = [];
  let inTriggers = false;
  let foundHeader = false;

  for (const line of lines) {
    // Skip the title header
    if (line.startsWith("# ")) {
      foundHeader = true;
      continue;
    }

    // Get first non-empty paragraph as description
    if (foundHeader && !description && line.trim() && !line.startsWith("#") && !line.startsWith("-")) {
      description = line.trim().slice(0, 80);
    }

    // Look for ## Triggers section
    if (line.match(/^## Triggers/i)) {
      inTriggers = true;
      continue;
    }

    // Stop at next section
    if (inTriggers && line.startsWith("## ")) {
      inTriggers = false;
    }

    // Collect trigger items - extract just the key words
    if (inTriggers && line.startsWith("- ")) {
      // Remove list marker and quotes, extract key trigger words
      const rawTrigger = line.replace(/^- /, "").trim().replace(/["'`]/g, "");
      // Take first word or two as the trigger keyword
      const words = rawTrigger.split(/\s+/).slice(0, 2);
      for (const word of words) {
        if (word && !triggerList.includes(word.toLowerCase())) {
          triggerList.push(word.toLowerCase());
        }
      }
    }
  }

  return { description, triggers: triggerList.join(" ") };
}

function extractFromTypeScript(filePath: string): { description: string; event: string } {
  const content = readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  let description = "";
  let event = "user_prompt_submit";
  let inComment = false;

  for (const line of lines) {
    // Track JSDoc/multiline comments
    if (line.includes("/**") || line.includes("/*")) {
      inComment = true;
    }

    // Look for Purpose or Hook description in comments
    if ((inComment || line.startsWith("//")) && !description) {
      if (line.toLowerCase().includes("purpose:")) {
        const match = line.match(/purpose:\s*(.+)/i);
        if (match?.[1]) {
          description = match[1].trim().slice(0, 80);
        }
      } else if (line.includes("Hook:")) {
        // Skip the hook name line, look for next comment line
      }
    }

    // Look for event specification
    if (line.toLowerCase().includes("event:")) {
      const match = line.match(/event:\s*(\S+)/i);
      if (match?.[1]) {
        event = match[1].toLowerCase();
      }
    }

    if (line.includes("*/")) {
      inComment = false;
    }
  }

  return { description, event };
}

function generateAgents(): ComponentEntry[] {
  const entries: ComponentEntry[] = [];
  const files = findAllFiles(join(CLAUDE_DIR, "agents"), ".md");

  for (const file of files) {
    const relPath = relative(CLAUDE_DIR, file);
    const id = basename(file, ".md");
    const { description, triggers } = extractFromMarkdown(file);

    entries.push({
      id,
      path: relPath,
      triggers: triggers || id,
      description,
      extra: "none",
    });
  }

  return entries;
}

function generateCommands(): ComponentEntry[] {
  const entries: ComponentEntry[] = [];
  const files = findAllFiles(join(CLAUDE_DIR, "commands"), ".md");

  for (const file of files) {
    const relPath = relative(CLAUDE_DIR, file);
    const filename = basename(file, ".md");

    // Handle nested commands (e.g., openspec/proposal -> openspec-proposal)
    const parentDir = dirname(relPath).replace("commands/", "").replace("commands", "");
    const id = parentDir && parentDir !== "." ? `${parentDir.replace(/\//g, "-")}-${filename}` : filename;

    const { description, triggers } = extractFromMarkdown(file);

    entries.push({
      id,
      path: relPath,
      triggers: triggers || filename,
      description,
    });
  }

  return entries;
}

function generateSkills(): ComponentEntry[] {
  const entries: ComponentEntry[] = [];
  const files = findAllFiles(join(CLAUDE_DIR, "skills"), "SKILL.md");

  for (const file of files) {
    const relPath = relative(CLAUDE_DIR, file);
    const skillDir = dirname(file);
    const id = basename(skillDir);
    const { description, triggers } = extractFromMarkdown(file);

    entries.push({
      id,
      path: relPath,
      triggers: triggers || id,
      description,
    });
  }

  return entries;
}

function generateHooks(): ComponentEntry[] {
  const entries: ComponentEntry[] = [];

  // Look for TypeScript hooks in src/scripts/hooks/
  const tsFiles = findAllFiles(HOOKS_DIR, ".ts");

  for (const file of tsFiles) {
    const relPath = relative(REPO_ROOT, file);
    const id = basename(file, ".ts");
    const { description, event } = extractFromTypeScript(file);

    entries.push({
      id,
      path: relPath,
      triggers: event,
      description,
    });
  }

  return entries;
}

function formatRegistry(): string {
  const lines: string[] = [
    "# Registry - Auto-generated, do not edit manually",
    "# Run: bun run src/scripts/generate-registry.ts",
    "",
  ];

  // Agents
  const agents = generateAgents();
  if (agents.length > 0) {
    lines.push("agent{id,path,triggers,requires,description}:");
    for (const agent of agents) {
      lines.push(`  ${agent.id},${agent.path},"${agent.triggers}",${agent.extra},${agent.description}`);
    }
    lines.push("");
  }

  // Commands
  const commands = generateCommands();
  if (commands.length > 0) {
    lines.push("command{id,path,triggers,description}:");
    for (const cmd of commands) {
      lines.push(`  ${cmd.id},${cmd.path},"${cmd.triggers}",${cmd.description}`);
    }
    lines.push("");
  }

  // Skills
  const skills = generateSkills();
  if (skills.length > 0) {
    lines.push("skill{id,path,triggers,description}:");
    for (const skill of skills) {
      lines.push(`  ${skill.id},${skill.path},"${skill.triggers}",${skill.description}`);
    }
    lines.push("");
  }

  // Hooks
  const hooks = generateHooks();
  if (hooks.length > 0) {
    lines.push("hook{id,path,event,description}:");
    for (const hook of hooks) {
      lines.push(`  ${hook.id},${hook.path},${hook.triggers},${hook.description}`);
    }
  }

  return lines.join("\n");
}

// Main
const registry = formatRegistry();

if (preview) {
  console.log(registry);
} else {
  writeFileSync(REGISTRY_PATH, registry);
  console.log(`Registry updated: ${REGISTRY_PATH}`);
}
