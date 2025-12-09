/**
 * foundr validate command - Validate installation
 */

import chalk from "chalk";
import ora from "ora";
import { existsSync } from "fs";
import { join } from "path";

interface ValidateOptions {
  fix?: boolean;
}

interface ValidationIssue {
  type: "error" | "warning";
  message: string;
  file?: string;
  fixable?: boolean;
}

export async function validateCommand(options: ValidateOptions): Promise<void> {
  console.log(chalk.bold("\nfoundr validate") + chalk.dim(" - Checking your installation\n"));

  const projectRoot = process.cwd();
  const spinner = ora("Validating...").start();

  const issues: ValidationIssue[] = [];

  // Check for foundr config
  const configPath = join(projectRoot, "foundr.yaml");
  const configExists = existsSync(configPath);

  if (!configExists) {
    issues.push({
      type: "error",
      message: "No foundr.yaml found. Run 'foundr init' first.",
      fixable: false,
    });
  }

  // Check for CLAUDE.md
  const claudeMdPath = join(projectRoot, "CLAUDE.md");
  if (!existsSync(claudeMdPath)) {
    issues.push({
      type: "warning",
      message: "No CLAUDE.md found at project root",
      file: "CLAUDE.md",
      fixable: true,
    });
  }

  // Check for .claude directory
  const claudeDir = join(projectRoot, ".claude");
  if (!existsSync(claudeDir)) {
    issues.push({
      type: "warning",
      message: "No .claude/ directory found",
      file: ".claude/",
      fixable: true,
    });
  } else {
    // Check for registry
    const registryPath = join(claudeDir, "registry.yaml");
    if (!existsSync(registryPath)) {
      issues.push({
        type: "warning",
        message: "No registry.yaml found in .claude/",
        file: ".claude/registry.yaml",
        fixable: true,
      });
    }
  }

  spinner.stop();

  // Display results
  if (issues.length === 0) {
    console.log(chalk.green("✓") + " All checks passed\n");
    return;
  }

  const errors = issues.filter((i) => i.type === "error");
  const warnings = issues.filter((i) => i.type === "warning");

  if (errors.length > 0) {
    console.log(chalk.red(`✗ ${errors.length} error(s):\n`));
    for (const error of errors) {
      console.log(chalk.red("  ✗ ") + error.message);
    }
    console.log();
  }

  if (warnings.length > 0) {
    console.log(chalk.yellow(`⚠ ${warnings.length} warning(s):\n`));
    for (const warning of warnings) {
      const fixable = warning.fixable ? chalk.dim(" (fixable)") : "";
      console.log(chalk.yellow("  ⚠ ") + warning.message + fixable);
    }
    console.log();
  }

  if (options.fix) {
    const fixable = issues.filter((i) => i.fixable);
    if (fixable.length > 0) {
      console.log(chalk.dim("Auto-fix coming soon...\n"));
    }
  } else {
    const fixable = issues.filter((i) => i.fixable);
    if (fixable.length > 0) {
      console.log(chalk.dim(`Run 'foundr validate --fix' to attempt auto-repair\n`));
    }
  }

  if (errors.length > 0) {
    process.exit(1);
  }
}
