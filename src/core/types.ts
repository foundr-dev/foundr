/**
 * Core type definitions for foundr
 */

// =============================================================================
// Registry Types
// =============================================================================

export interface AgentDefinition {
  id: string;
  path: string;
  triggers: string[];
  requires?: string;
  description: string;
}

export interface CommandDefinition {
  id: string;
  path: string;
  triggers: string[];
  description: string;
}

export interface SkillDefinition {
  id: string;
  path: string;
  triggers: string[];
  description: string;
}

export interface HookDefinition {
  id: string;
  path: string;
  event: "session_start" | "user_prompt_submit" | "pre_tool_use" | "post_tool_use";
  description: string;
}

export interface Registry {
  agents: AgentDefinition[];
  commands: CommandDefinition[];
  skills: SkillDefinition[];
  hooks: HookDefinition[];
}

// =============================================================================
// Project Analysis Types
// =============================================================================

export type ProjectType = "monorepo" | "single-service" | "web-app" | "api-service" | "cli-tool" | "library";
export type TeamSize = "solo" | "small-team" | "enterprise";
export type Preset = "minimal" | "standard" | "full";

export interface DetectedLanguage {
  name: string;
  percentage: number;
  frameworks: string[];
}

export interface ProjectAnalysis {
  projectType: ProjectType;
  isMonorepo: boolean;
  services: string[];
  languages: DetectedLanguage[];
  gitBranch: string;
  usesConventionalCommits: boolean;
  ciPlatform?: string;
  taskManager?: string;
  existingAiTools: string[];
  existingSpecSystem?: string;
}

export type ConfidenceLevel = "high" | "medium" | "low";

export interface RecommendedConfig {
  aiTools: { value: string[]; confidence: ConfidenceLevel };
  specSystem: { value: string | null; confidence: ConfidenceLevel };
  taskManager: { value: string | null; confidence: ConfidenceLevel };
  preset: { value: Preset; confidence: ConfidenceLevel };
  projectType: { value: ProjectType; confidence: ConfidenceLevel };
  teamSize: { value: TeamSize; confidence: ConfidenceLevel };
}

// =============================================================================
// Configuration Types
// =============================================================================

export interface FoundrConfig {
  version: string;
  aiTools: string[];
  specSystem: string | null;
  taskManager: string | null;
  preset: Preset;
  projectType: ProjectType;
  teamSize: TeamSize;
  services?: string[];
  customizations?: Record<string, unknown>;
}

// =============================================================================
// Adaptor Types
// =============================================================================

export type AgentFormat = "markdown" | "yaml" | "json";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export interface AIToolAdaptor {
  name: string;
  version: string;

  // Directory structure
  configDir: string;
  agentFormat: AgentFormat;

  // Detection
  detect(projectRoot: string): Promise<boolean>;
  getExistingConfig(projectRoot: string): Promise<FoundrConfig | null>;

  // Generation
  generateAgentFile(agent: AgentDefinition): string;
  generateCommandFile(command: CommandDefinition): string;
  generateSkillFile(skill: SkillDefinition): string;
  generateHookFile?(hook: HookDefinition): string;
  generateClaudeMd(config: FoundrConfig, analysis: ProjectAnalysis): string;

  // Validation
  validate(projectRoot: string): Promise<ValidationResult>;
}

// =============================================================================
// Task Manager Plugin Types
// =============================================================================

export interface Task {
  id: string;
  title: string;
  status: string;
  assignee?: string;
  url?: string;
  [key: string]: unknown;
}

export interface TaskUpdate {
  status?: string;
  assignee?: string;
  [key: string]: unknown;
}

export interface NewTask {
  title: string;
  description?: string;
  assignee?: string;
  [key: string]: unknown;
}

export interface TaskManagerPlugin {
  name: string;
  version: string;

  // Detection
  detect(projectRoot: string): Promise<boolean>;
  detectConfigFiles: string[];

  // Commands to generate
  commands: CommandDefinition[];

  // API integration
  getTask(id: string): Promise<Task>;
  updateTask(id: string, update: TaskUpdate): Promise<void>;
  createTask(task: NewTask): Promise<Task>;
  searchTasks(query: string): Promise<Task[]>;

  // Workflow hooks
  onTaskStart?(task: Task): Promise<void>;
  onTaskComplete?(task: Task): Promise<void>;
}

// =============================================================================
// Language Pack Types
// =============================================================================

export interface LanguagePackPlugin {
  name: string;
  languages: string[];
  frameworks: string[];

  // Detection
  detect(projectRoot: string): Promise<boolean>;
  detectFiles: string[];

  // Templates
  agents: AgentDefinition[];
  commands: CommandDefinition[];
  skills: SkillDefinition[];

  // CLAUDE.md content
  claudeMdSection: string;
}

// =============================================================================
// Spec System Types
// =============================================================================

export interface SpecSystemAdaptor {
  name: string;
  version: string;

  // Detection
  detect(projectRoot: string): Promise<boolean>;

  // Integration
  generateAgentsFile(): string;
  generateClaudeMdSection(): string;

  // Commands
  commands: CommandDefinition[];
}
