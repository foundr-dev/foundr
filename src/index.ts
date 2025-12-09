/**
 * foundr - Forge your AI development workflow
 *
 * Main library exports for programmatic use
 */

// Core types
export type {
  AgentDefinition,
  CommandDefinition,
  SkillDefinition,
  HookDefinition,
  Registry,
  ProjectAnalysis,
  FoundrConfig,
  AIToolAdaptor,
  TaskManagerPlugin,
  LanguagePackPlugin,
  SpecSystemAdaptor,
  ValidationResult,
  Preset,
  ProjectType,
  TeamSize,
} from "./core/types.ts";

// Registry utilities
export {
  parseRegistry,
  serializeRegistry,
  mergeRegistries,
  filterRegistry,
  validateRegistry,
} from "./core/registry/index.ts";

// Project analysis
export { analyzeProject } from "./analysers/index.ts";

// Recommendation engine
export { generateRecommendation } from "./core/recommendation.ts";

// Infrastructure generation
export { generateInfrastructure } from "./generators/index.ts";

// Version
export const VERSION = "0.1.0-alpha.1";
