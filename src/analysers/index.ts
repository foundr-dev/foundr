/**
 * Project analysers - detect project structure, languages, patterns
 */

import { existsSync, readdirSync, statSync } from "fs";
import { join, extname } from "path";
import type { ProjectAnalysis, DetectedLanguage, ProjectType } from "../core/types.ts";

/**
 * Analyze a project to detect its structure, languages, and tools
 */
export async function analyzeProject(projectRoot: string): Promise<ProjectAnalysis> {
  const [languages, isMonorepo, services] = await Promise.all([
    detectLanguages(projectRoot),
    detectMonorepo(projectRoot),
    detectServices(projectRoot),
  ]);

  const projectType = inferProjectType(languages, isMonorepo, services, projectRoot);
  const gitInfo = await detectGitInfo(projectRoot);
  const ciPlatform = detectCIPlatform(projectRoot);
  const taskManager = detectTaskManager(projectRoot);
  const existingAiTools = detectExistingAiTools(projectRoot);
  const existingSpecSystem = detectSpecSystem(projectRoot);

  return {
    projectType,
    isMonorepo,
    services,
    languages,
    gitBranch: gitInfo.branch,
    usesConventionalCommits: gitInfo.usesConventionalCommits,
    ciPlatform,
    taskManager,
    existingAiTools,
    existingSpecSystem,
  };
}

/**
 * Detect languages used in the project
 */
async function detectLanguages(projectRoot: string): Promise<DetectedLanguage[]> {
  const extensions: Record<string, string> = {
    ".ts": "TypeScript",
    ".tsx": "TypeScript",
    ".js": "JavaScript",
    ".jsx": "JavaScript",
    ".py": "Python",
    ".go": "Go",
    ".rs": "Rust",
    ".java": "Java",
    ".rb": "Ruby",
    ".php": "PHP",
    ".cs": "C#",
    ".cpp": "C++",
    ".c": "C",
  };

  const counts: Record<string, number> = {};
  let total = 0;

  function walkDir(dir: string, depth = 0): void {
    if (depth > 5) return; // Limit depth
    if (!existsSync(dir)) return;

    const skipDirs = ["node_modules", ".git", "dist", "build", "__pycache__", ".venv", "venv"];

    try {
      const entries = readdirSync(dir);
      for (const entry of entries) {
        const fullPath = join(dir, entry);
        try {
          const stat = statSync(fullPath);
          if (stat.isDirectory()) {
            if (!skipDirs.includes(entry)) {
              walkDir(fullPath, depth + 1);
            }
          } else if (stat.isFile()) {
            const ext = extname(entry).toLowerCase();
            const lang = extensions[ext];
            if (lang) {
              counts[lang] = (counts[lang] || 0) + 1;
              total++;
            }
          }
        } catch {
          // Skip inaccessible files
        }
      }
    } catch {
      // Skip inaccessible directories
    }
  }

  walkDir(projectRoot);

  const languages: DetectedLanguage[] = Object.entries(counts)
    .map(([name, count]) => ({
      name,
      percentage: Math.round((count / total) * 100),
      frameworks: detectFrameworks(projectRoot, name),
    }))
    .sort((a, b) => b.percentage - a.percentage);

  return languages;
}

/**
 * Detect frameworks for a language
 */
function detectFrameworks(projectRoot: string, language: string): string[] {
  const frameworks: string[] = [];

  if (language === "TypeScript" || language === "JavaScript") {
    const packageJsonPath = join(projectRoot, "package.json");
    if (existsSync(packageJsonPath)) {
      try {
        const pkg = JSON.parse(Bun.file(packageJsonPath).toString());
        const deps = { ...pkg.dependencies, ...pkg.devDependencies };

        if (deps.react) frameworks.push("React");
        if (deps.vue) frameworks.push("Vue");
        if (deps.angular) frameworks.push("Angular");
        if (deps.svelte) frameworks.push("Svelte");
        if (deps.next) frameworks.push("Next.js");
        if (deps.express) frameworks.push("Express");
        if (deps.fastify) frameworks.push("Fastify");
        if (deps.vite) frameworks.push("Vite");
      } catch {
        // Ignore parse errors
      }
    }
  }

  if (language === "Python") {
    const requirementsPath = join(projectRoot, "requirements.txt");
    const pyprojectPath = join(projectRoot, "pyproject.toml");

    if (existsSync(requirementsPath)) {
      try {
        const content = Bun.file(requirementsPath).toString();
        if (content.includes("fastapi")) frameworks.push("FastAPI");
        if (content.includes("django")) frameworks.push("Django");
        if (content.includes("flask")) frameworks.push("Flask");
      } catch {
        // Ignore read errors
      }
    }

    if (existsSync(pyprojectPath)) {
      try {
        const content = Bun.file(pyprojectPath).toString();
        if (content.includes("fastapi")) frameworks.push("FastAPI");
        if (content.includes("django")) frameworks.push("Django");
        if (content.includes("flask")) frameworks.push("Flask");
      } catch {
        // Ignore read errors
      }
    }
  }

  return [...new Set(frameworks)];
}

/**
 * Detect if project is a monorepo
 */
async function detectMonorepo(projectRoot: string): Promise<boolean> {
  // Check for common monorepo indicators
  const indicators = [
    "lerna.json",
    "pnpm-workspace.yaml",
    "rush.json",
    "nx.json",
  ];

  for (const indicator of indicators) {
    if (existsSync(join(projectRoot, indicator))) {
      return true;
    }
  }

  // Check package.json workspaces
  const packageJsonPath = join(projectRoot, "package.json");
  if (existsSync(packageJsonPath)) {
    try {
      const pkg = JSON.parse(Bun.file(packageJsonPath).toString());
      if (pkg.workspaces) {
        return true;
      }
    } catch {
      // Ignore parse errors
    }
  }

  return false;
}

/**
 * Detect services in a monorepo
 */
async function detectServices(projectRoot: string): Promise<string[]> {
  const serviceDirs = ["packages", "services", "apps", "libs"];
  const services: string[] = [];

  for (const dir of serviceDirs) {
    const fullPath = join(projectRoot, dir);
    if (existsSync(fullPath)) {
      try {
        const entries = readdirSync(fullPath);
        for (const entry of entries) {
          const servicePath = join(fullPath, entry);
          if (statSync(servicePath).isDirectory()) {
            services.push(`${dir}/${entry}`);
          }
        }
      } catch {
        // Ignore read errors
      }
    }
  }

  // Also check for top-level service directories
  const topLevelServices = ["frontend", "backend", "api", "web", "mobile"];
  for (const service of topLevelServices) {
    if (existsSync(join(projectRoot, service))) {
      services.push(service);
    }
  }

  return services;
}

/**
 * Infer project type from analysis
 */
function inferProjectType(
  languages: DetectedLanguage[],
  isMonorepo: boolean,
  services: string[],
  projectRoot: string
): ProjectType {
  if (isMonorepo || services.length > 1) {
    return "monorepo";
  }

  const primaryLang = languages[0];
  if (!primaryLang) {
    return "single-service";
  }

  // Check for CLI indicators
  const packageJsonPath = join(projectRoot, "package.json");
  if (existsSync(packageJsonPath)) {
    try {
      const pkg = JSON.parse(Bun.file(packageJsonPath).toString());
      if (pkg.bin) {
        return "cli-tool";
      }
    } catch {
      // Ignore parse errors
    }
  }

  // Check frameworks to infer type
  const frameworks = primaryLang.frameworks;
  if (frameworks.includes("React") || frameworks.includes("Vue") || frameworks.includes("Angular")) {
    return "web-app";
  }
  if (frameworks.includes("Express") || frameworks.includes("FastAPI") || frameworks.includes("Django")) {
    return "api-service";
  }

  return "single-service";
}

/**
 * Detect git information
 */
async function detectGitInfo(projectRoot: string): Promise<{ branch: string; usesConventionalCommits: boolean }> {
  const gitDir = join(projectRoot, ".git");
  if (!existsSync(gitDir)) {
    return { branch: "main", usesConventionalCommits: false };
  }

  let branch = "main";
  let usesConventionalCommits = false;

  // Get current branch
  const headPath = join(gitDir, "HEAD");
  if (existsSync(headPath)) {
    try {
      const content = Bun.file(headPath).toString().trim();
      const match = content.match(/ref: refs\/heads\/(.+)/);
      if (match?.[1]) {
        branch = match[1];
      }
    } catch {
      // Ignore read errors
    }
  }

  // Check for conventional commits by sampling commit messages
  // This is a simple heuristic - could use git log command for more accuracy
  const commitMsgPath = join(gitDir, "COMMIT_EDITMSG");
  if (existsSync(commitMsgPath)) {
    try {
      const content = Bun.file(commitMsgPath).toString();
      const conventionalPattern = /^(feat|fix|docs|style|refactor|test|chore|build|ci|perf|revert)(\(.+\))?:/;
      if (conventionalPattern.test(content)) {
        usesConventionalCommits = true;
      }
    } catch {
      // Ignore read errors
    }
  }

  return { branch, usesConventionalCommits };
}

/**
 * Detect CI platform
 */
function detectCIPlatform(projectRoot: string): string | undefined {
  if (existsSync(join(projectRoot, ".github/workflows"))) {
    return "GitHub Actions";
  }
  if (existsSync(join(projectRoot, ".gitlab-ci.yml"))) {
    return "GitLab CI";
  }
  if (existsSync(join(projectRoot, ".circleci"))) {
    return "CircleCI";
  }
  if (existsSync(join(projectRoot, "Jenkinsfile"))) {
    return "Jenkins";
  }
  if (existsSync(join(projectRoot, "azure-pipelines.yml"))) {
    return "Azure Pipelines";
  }
  return undefined;
}

/**
 * Detect task management tool
 */
function detectTaskManager(projectRoot: string): string | undefined {
  if (existsSync(join(projectRoot, ".asana"))) {
    return "Asana";
  }
  if (existsSync(join(projectRoot, ".jira"))) {
    return "Jira";
  }
  if (existsSync(join(projectRoot, ".linear"))) {
    return "Linear";
  }
  return undefined;
}

/**
 * Detect existing AI tools
 */
function detectExistingAiTools(projectRoot: string): string[] {
  const tools: string[] = [];

  if (existsSync(join(projectRoot, ".claude")) || existsSync(join(projectRoot, "CLAUDE.md"))) {
    tools.push("claude");
  }
  if (existsSync(join(projectRoot, ".opencode")) || existsSync(join(projectRoot, "AGENTS.md"))) {
    tools.push("opencode");
  }
  if (existsSync(join(projectRoot, ".cursor"))) {
    tools.push("cursor");
  }
  if (existsSync(join(projectRoot, ".continue"))) {
    tools.push("continue");
  }

  return tools;
}

/**
 * Detect existing spec system
 */
function detectSpecSystem(projectRoot: string): string | undefined {
  if (existsSync(join(projectRoot, "openspec"))) {
    return "openspec";
  }
  if (existsSync(join(projectRoot, ".speckit"))) {
    return "speckit";
  }
  return undefined;
}
