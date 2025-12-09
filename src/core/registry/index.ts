/**
 * Registry management - single source of truth for agents, commands, skills, hooks
 */

import { parse as parseYaml, stringify as stringifyYaml } from "yaml";
import type { AgentDefinition, CommandDefinition, HookDefinition, Registry, SkillDefinition } from "../types.ts";

export interface RegistryFile {
  version: string;
  agents: Record<string, AgentDefinition>;
  commands: Record<string, CommandDefinition>;
  skills: Record<string, SkillDefinition>;
  hooks: Record<string, HookDefinition>;
}

/**
 * Parse a YAML registry file into a Registry object
 */
export function parseRegistry(content: string): Registry {
  const parsed = parseYaml(content) as RegistryFile;

  return {
    agents: Object.values(parsed.agents || {}),
    commands: Object.values(parsed.commands || {}),
    skills: Object.values(parsed.skills || {}),
    hooks: Object.values(parsed.hooks || {}),
  };
}

/**
 * Serialize a Registry object to YAML
 */
export function serializeRegistry(registry: Registry, version = "1.0.0"): string {
  const file: RegistryFile = {
    version,
    agents: Object.fromEntries(registry.agents.map((a) => [a.id, a])),
    commands: Object.fromEntries(registry.commands.map((c) => [c.id, c])),
    skills: Object.fromEntries(registry.skills.map((s) => [s.id, s])),
    hooks: Object.fromEntries(registry.hooks.map((h) => [h.id, h])),
  };

  return stringifyYaml(file, { indent: 2 });
}

/**
 * Merge two registries, with the second taking precedence
 */
export function mergeRegistries(base: Registry, override: Registry): Registry {
  const mergeById = <T extends { id: string }>(baseItems: T[], overrideItems: T[]): T[] => {
    const map = new Map<string, T>();
    for (const item of baseItems) {
      map.set(item.id, item);
    }
    for (const item of overrideItems) {
      map.set(item.id, item);
    }
    return Array.from(map.values());
  };

  return {
    agents: mergeById(base.agents, override.agents),
    commands: mergeById(base.commands, override.commands),
    skills: mergeById(base.skills, override.skills),
    hooks: mergeById(base.hooks, override.hooks),
  };
}

/**
 * Filter registry by category or pattern
 */
export function filterRegistry(registry: Registry, filter: { category?: string; pattern?: RegExp }): Registry {
  const filterItems = <T extends { id: string }>(items: T[]): T[] => {
    return items.filter((item) => {
      if (filter.category && !item.id.startsWith(filter.category)) {
        return false;
      }
      if (filter.pattern && !filter.pattern.test(item.id)) {
        return false;
      }
      return true;
    });
  };

  return {
    agents: filterItems(registry.agents),
    commands: filterItems(registry.commands),
    skills: filterItems(registry.skills),
    hooks: filterItems(registry.hooks),
  };
}

/**
 * Validate a registry for common issues
 */
export function validateRegistry(registry: Registry): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check for duplicate IDs
  const checkDuplicates = (items: { id: string }[], type: string) => {
    const seen = new Set<string>();
    for (const item of items) {
      if (seen.has(item.id)) {
        errors.push(`Duplicate ${type} ID: ${item.id}`);
      }
      seen.add(item.id);
    }
  };

  checkDuplicates(registry.agents, "agent");
  checkDuplicates(registry.commands, "command");
  checkDuplicates(registry.skills, "skill");
  checkDuplicates(registry.hooks, "hook");

  // Check for empty required fields
  for (const agent of registry.agents) {
    if (!agent.path) errors.push(`Agent ${agent.id} missing path`);
    if (!agent.description) errors.push(`Agent ${agent.id} missing description`);
  }

  for (const command of registry.commands) {
    if (!command.path) errors.push(`Command ${command.id} missing path`);
    if (!command.description) errors.push(`Command ${command.id} missing description`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
