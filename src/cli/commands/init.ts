/**
 * foundr init command - Initialize AI infrastructure with smart defaults
 */

import chalk from "chalk";
import ora from "ora";
import prompts from "prompts";
import type { FoundrConfig, ProjectAnalysis, RecommendedConfig, Preset } from "../../core/types.ts";
import { analyzeProject } from "../../analysers/index.ts";
import { generateRecommendation } from "../../core/recommendation.ts";
import { generateInfrastructure } from "../../generators/index.ts";

interface InitOptions {
  preset?: Preset;
  yes?: boolean;
  analyze?: boolean;
}

export async function initCommand(options: InitOptions): Promise<void> {
  console.log(chalk.bold("\nfoundr init") + chalk.dim(" - Forge your AI development workflow\n"));

  const projectRoot = process.cwd();
  let analysis: ProjectAnalysis | null = null;
  let recommendation: RecommendedConfig | null = null;

  // Step 1: Analyze project (unless skipped)
  if (options.analyze !== false) {
    const spinner = ora("Analysing your repository...").start();

    try {
      analysis = await analyzeProject(projectRoot);
      recommendation = generateRecommendation(analysis);
      spinner.succeed("Analysis complete");
    } catch (error) {
      spinner.fail("Analysis failed");
      console.log(chalk.dim("  Falling back to manual configuration\n"));
    }
  }

  // Step 2: Display detected information
  if (analysis) {
    console.log(chalk.dim("\nDetected:"));
    console.log(chalk.dim("  ├─ Structure: ") + formatProjectType(analysis));
    console.log(chalk.dim("  ├─ Languages: ") + formatLanguages(analysis));
    console.log(chalk.dim("  ├─ Git: ") + formatGit(analysis));
    if (analysis.ciPlatform) {
      console.log(chalk.dim("  ├─ CI: ") + analysis.ciPlatform);
    }
    if (analysis.taskManager) {
      console.log(chalk.dim("  └─ PM Tools: ") + analysis.taskManager);
    } else {
      console.log(chalk.dim("  └─ PM Tools: ") + chalk.dim("None detected"));
    }
  }

  // Step 3: Display recommendation
  if (recommendation) {
    console.log(chalk.dim("\nRecommended Configuration:\n"));
    console.log(formatRecommendation(recommendation));
  }

  // Step 4: Get user confirmation
  let config: FoundrConfig;

  if (options.yes && recommendation) {
    // Auto-accept recommendation
    config = recommendationToConfig(recommendation);
  } else if (recommendation) {
    const { action } = await prompts({
      type: "select",
      name: "action",
      message: "Accept recommended configuration?",
      choices: [
        { title: "Yes", value: "yes" },
        { title: "Customize", value: "customize" },
        { title: "Cancel", value: "cancel" },
      ],
    });

    if (action === "cancel") {
      console.log(chalk.dim("\nCancelled.\n"));
      return;
    }

    if (action === "customize") {
      config = await customizeConfig(recommendation);
    } else {
      config = recommendationToConfig(recommendation);
    }
  } else {
    // No analysis - full manual config
    config = await manualConfig();
  }

  // Step 5: Generate infrastructure
  console.log();
  const genSpinner = ora("Generating foundr infrastructure...").start();

  try {
    const result = await generateInfrastructure(projectRoot, config, analysis);
    genSpinner.succeed("Infrastructure generated");

    console.log(chalk.dim("\nCreated:"));
    for (const file of result.createdFiles) {
      console.log(chalk.dim("  ├─ ") + file);
    }
    console.log();

    console.log(chalk.green("Done!") + chalk.dim(" Run ") + chalk.cyan("foundr validate") + chalk.dim(" to check your setup.\n"));
  } catch (error) {
    genSpinner.fail("Generation failed");
    console.error(chalk.red(`\nError: ${error instanceof Error ? error.message : "Unknown error"}\n`));
    process.exit(1);
  }
}

// Helper functions

function formatProjectType(analysis: ProjectAnalysis): string {
  if (analysis.isMonorepo) {
    return `Monorepo (${analysis.services.length} services)`;
  }
  return analysis.projectType.replace("-", " ");
}

function formatLanguages(analysis: ProjectAnalysis): string {
  return analysis.languages
    .slice(0, 3)
    .map((l) => `${l.name} (${l.percentage}%)`)
    .join(", ");
}

function formatGit(analysis: ProjectAnalysis): string {
  const parts = [analysis.gitBranch];
  if (analysis.usesConventionalCommits) {
    parts.push("conventional commits");
  }
  return parts.join(", ");
}

function formatRecommendation(rec: RecommendedConfig): string {
  const formatLine = (label: string, value: string | string[] | null, confidence: string) => {
    const val = Array.isArray(value) ? value.join(" + ") : value || "None";
    const icon = confidence === "high" ? "🟢" : confidence === "medium" ? "🟡" : "🔴";
    return `  ${label.padEnd(16)} ${val} ${icon}`;
  };

  return [
    formatLine("AI Tools:", rec.aiTools.value, rec.aiTools.confidence),
    formatLine("Spec System:", rec.specSystem.value, rec.specSystem.confidence),
    formatLine("Task Manager:", rec.taskManager.value, rec.taskManager.confidence),
    formatLine("Preset:", rec.preset.value, rec.preset.confidence),
  ].join("\n");
}

function recommendationToConfig(rec: RecommendedConfig): FoundrConfig {
  return {
    version: "1.0.0",
    aiTools: rec.aiTools.value,
    specSystem: rec.specSystem.value,
    taskManager: rec.taskManager.value,
    preset: rec.preset.value,
    projectType: rec.projectType.value,
    teamSize: rec.teamSize.value,
  };
}

async function customizeConfig(rec: RecommendedConfig): Promise<FoundrConfig> {
  const responses = await prompts([
    {
      type: "multiselect",
      name: "aiTools",
      message: "AI Tools:",
      choices: [
        { title: "Claude Code", value: "claude", selected: rec.aiTools.value.includes("claude") },
        { title: "OpenCode", value: "opencode", selected: rec.aiTools.value.includes("opencode") },
        { title: "Generic", value: "generic" },
      ],
    },
    {
      type: "select",
      name: "specSystem",
      message: "Spec System:",
      choices: [
        { title: "OpenSpec", value: "openspec" },
        { title: "SpecKit", value: "speckit" },
        { title: "None", value: null },
      ],
      initial: rec.specSystem.value === "openspec" ? 0 : rec.specSystem.value === "speckit" ? 1 : 2,
    },
    {
      type: "select",
      name: "preset",
      message: "Preset:",
      choices: [
        { title: "Minimal - CLAUDE.md + basic structure", value: "minimal" },
        { title: "Standard - Full agent set (recommended)", value: "standard" },
        { title: "Full - Everything + mental models", value: "full" },
      ],
      initial: rec.preset.value === "minimal" ? 0 : rec.preset.value === "standard" ? 1 : 2,
    },
  ]);

  return {
    version: "1.0.0",
    aiTools: responses.aiTools || rec.aiTools.value,
    specSystem: responses.specSystem,
    taskManager: rec.taskManager.value,
    preset: responses.preset || rec.preset.value,
    projectType: rec.projectType.value,
    teamSize: rec.teamSize.value,
  };
}

async function manualConfig(): Promise<FoundrConfig> {
  const responses = await prompts([
    {
      type: "multiselect",
      name: "aiTools",
      message: "Which AI tools will you use?",
      choices: [
        { title: "Claude Code", value: "claude", selected: true },
        { title: "OpenCode", value: "opencode", selected: true },
        { title: "Generic", value: "generic" },
      ],
    },
    {
      type: "select",
      name: "specSystem",
      message: "Spec System:",
      choices: [
        { title: "OpenSpec (recommended for structured projects)", value: "openspec" },
        { title: "SpecKit", value: "speckit" },
        { title: "None", value: null },
      ],
    },
    {
      type: "select",
      name: "preset",
      message: "Infrastructure preset:",
      choices: [
        { title: "Minimal - CLAUDE.md + basic structure", value: "minimal" },
        { title: "Standard - Full agent set (recommended)", value: "standard" },
        { title: "Full - Everything + mental models", value: "full" },
      ],
      initial: 1,
    },
    {
      type: "select",
      name: "projectType",
      message: "Project type:",
      choices: [
        { title: "Monorepo", value: "monorepo" },
        { title: "Single Service", value: "single-service" },
        { title: "Web App", value: "web-app" },
        { title: "API Service", value: "api-service" },
        { title: "CLI Tool", value: "cli-tool" },
        { title: "Library", value: "library" },
      ],
    },
  ]);

  return {
    version: "1.0.0",
    aiTools: responses.aiTools || ["claude"],
    specSystem: responses.specSystem,
    taskManager: null,
    preset: responses.preset || "standard",
    projectType: responses.projectType || "single-service",
    teamSize: "small-team",
  };
}
