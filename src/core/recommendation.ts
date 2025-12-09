/**
 * Generate configuration recommendations based on project analysis
 */

import type { ProjectAnalysis, RecommendedConfig, Preset, TeamSize, ConfidenceLevel } from "./types.ts";

/**
 * Generate recommended configuration based on project analysis
 */
export function generateRecommendation(analysis: ProjectAnalysis): RecommendedConfig {
  return {
    aiTools: recommendAiTools(analysis),
    specSystem: recommendSpecSystem(analysis),
    taskManager: recommendTaskManager(analysis),
    preset: recommendPreset(analysis),
    projectType: {
      value: analysis.projectType,
      confidence: analysis.isMonorepo || analysis.services.length > 0 ? "high" : "medium",
    },
    teamSize: recommendTeamSize(analysis),
  };
}

function recommendAiTools(analysis: ProjectAnalysis): { value: string[]; confidence: ConfidenceLevel } {
  // If existing tools detected, recommend those
  if (analysis.existingAiTools.length > 0) {
    return {
      value: analysis.existingAiTools,
      confidence: "high",
    };
  }

  // Default to both Claude and OpenCode
  return {
    value: ["claude", "opencode"],
    confidence: "medium",
  };
}

function recommendSpecSystem(analysis: ProjectAnalysis): { value: string | null; confidence: ConfidenceLevel } {
  // If existing spec system detected
  if (analysis.existingSpecSystem) {
    return {
      value: analysis.existingSpecSystem,
      confidence: "high",
    };
  }

  // Recommend OpenSpec for larger/more complex projects
  const isComplex = analysis.isMonorepo ||
    analysis.services.length > 1 ||
    analysis.languages.length > 2;

  if (isComplex) {
    return {
      value: "openspec",
      confidence: "medium",
    };
  }

  // Simpler projects don't need a spec system
  return {
    value: null,
    confidence: "low",
  };
}

function recommendTaskManager(analysis: ProjectAnalysis): { value: string | null; confidence: ConfidenceLevel } {
  if (analysis.taskManager) {
    return {
      value: analysis.taskManager,
      confidence: "high",
    };
  }

  return {
    value: null,
    confidence: "low",
  };
}

function recommendPreset(analysis: ProjectAnalysis): { value: Preset; confidence: ConfidenceLevel } {
  // Full for complex monorepos
  if (analysis.isMonorepo && analysis.services.length > 3) {
    return {
      value: "full",
      confidence: "medium",
    };
  }

  // Minimal for simple projects or libraries
  if (analysis.projectType === "library" || analysis.projectType === "cli-tool") {
    return {
      value: "minimal",
      confidence: "medium",
    };
  }

  // Standard for most projects
  return {
    value: "standard",
    confidence: "medium",
  };
}

function recommendTeamSize(analysis: ProjectAnalysis): { value: TeamSize; confidence: ConfidenceLevel } {
  // Could analyze git contributors in a more sophisticated implementation
  // For now, infer from project complexity

  if (analysis.isMonorepo && analysis.services.length > 5) {
    return {
      value: "enterprise",
      confidence: "low",
    };
  }

  if (analysis.isMonorepo || analysis.services.length > 2) {
    return {
      value: "small-team",
      confidence: "low",
    };
  }

  return {
    value: "solo",
    confidence: "low",
  };
}
