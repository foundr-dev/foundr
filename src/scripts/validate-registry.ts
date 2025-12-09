#!/usr/bin/env bun
/**
 * Validate that all paths in registry.toon exist
 * Usage: bun run src/scripts/validate-registry.ts [--quiet]
 */

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const CLAUDE_DIR = join(import.meta.dirname, "../../.claude");
const REGISTRY_PATH = join(CLAUDE_DIR, "registry.toon");

interface ValidationResult {
  errors: string[];
  warnings: string[];
  total: number;
}

const quiet = process.argv.includes("--quiet");

function log(message: string): void {
  if (!quiet) {
    console.log(message);
  }
}

function parseRegistry(content: string): Map<string, { id: string; path: string; section: string }[]> {
  const sections = new Map<string, { id: string; path: string; section: string }[]>();
  let currentSection = "";

  for (const line of content.split("\n")) {
    // Skip empty lines and comments
    if (!line.trim() || line.trim().startsWith("#")) continue;

    // Detect section headers
    const sectionMatch = line.match(/^(agent|command|hook|skill)\{.*\}:/);
    if (sectionMatch?.[1]) {
      currentSection = sectionMatch[1];
      sections.set(currentSection, []);
      continue;
    }

    // Parse data lines (indented, comma-separated)
    if (line.startsWith("  ") && currentSection) {
      const trimmed = line.trim();
      const fields = trimmed.split(",");
      if (fields.length >= 2) {
        const id = fields[0] ?? "";
        const path = fields[1] ?? "";
        sections.get(currentSection)?.push({ id, path, section: currentSection });
      }
    }
  }

  return sections;
}

function findAllFiles(dir: string, extension: string): string[] {
  const files: string[] = [];

  if (!existsSync(dir)) return files;

  function walk(currentDir: string): void {
    const entries = readdirSync(currentDir);
    for (const entry of entries) {
      const fullPath = join(currentDir, entry);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (entry.endsWith(extension) && entry !== "README.md") {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  return files;
}

function validateRegistry(): ValidationResult {
  const result: ValidationResult = { errors: [], warnings: [], total: 0 };

  if (!existsSync(REGISTRY_PATH)) {
    result.errors.push(`Registry not found: ${REGISTRY_PATH}`);
    return result;
  }

  log(`Validating registry: ${REGISTRY_PATH}\n`);

  const content = readFileSync(REGISTRY_PATH, "utf-8");
  const sections = parseRegistry(content);

  // Phase 1: Validate all registered paths exist
  const registeredPaths = new Set<string>();

  for (const [sectionName, entries] of sections) {
    log(`Checking ${sectionName}s...`);

    for (const entry of entries) {
      const fullPath = join(CLAUDE_DIR, entry.path);
      registeredPaths.add(entry.path);
      result.total++;

      if (existsSync(fullPath)) {
        log(`  ✓ ${entry.id} -> ${entry.path}`);
      } else {
        result.errors.push(`${sectionName} '${entry.id}' path not found: ${entry.path}`);
      }
    }
  }

  log("\n----------------------------------------\n");
  log("Checking for unregistered files...");

  // Phase 2: Check for unregistered files
  const agentFiles = findAllFiles(join(CLAUDE_DIR, "agents"), ".md");
  for (const file of agentFiles) {
    const relPath = relative(CLAUDE_DIR, file);
    if (!registeredPaths.has(relPath)) {
      result.errors.push(`Unregistered agent: ${relPath}`);
    }
  }

  const commandFiles = findAllFiles(join(CLAUDE_DIR, "commands"), ".md");
  for (const file of commandFiles) {
    const relPath = relative(CLAUDE_DIR, file);
    if (!registeredPaths.has(relPath)) {
      result.errors.push(`Unregistered command: ${relPath}`);
    }
  }

  const hookFiles = findAllFiles(join(CLAUDE_DIR, "hooks"), ".sh");
  for (const file of hookFiles) {
    const relPath = relative(CLAUDE_DIR, file);
    if (!registeredPaths.has(relPath)) {
      result.errors.push(`Unregistered hook: ${relPath}`);
    }
  }

  return result;
}

// Main
const result = validateRegistry();

console.log("\n----------------------------------------");
if (result.errors.length === 0) {
  console.log(`✓ All ${result.total} paths validated successfully`);
  process.exit(0);
} else {
  console.error(`\n✗ Validation failed with ${result.errors.length} errors:\n`);
  for (const error of result.errors) {
    console.error(`  - ${error}`);
  }
  process.exit(1);
}
