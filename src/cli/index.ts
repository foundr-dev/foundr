#!/usr/bin/env bun
/**
 * foundr CLI - Forge your AI development workflow
 */

import { Command } from "commander";
import chalk from "chalk";
import { version } from "../../package.json";
import { initCommand } from "./commands/init.ts";
import { validateCommand } from "./commands/validate.ts";

const program = new Command();

program
  .name("foundr")
  .description("Forge your AI development workflow - scaffolding for Claude Code, OpenCode, and beyond")
  .version(version);

program
  .command("init")
  .description("Initialize foundr in your project with smart defaults")
  .option("-p, --preset <preset>", "Preset to use (minimal, standard, full)", "standard")
  .option("-y, --yes", "Accept recommended configuration without prompting")
  .option("--no-analyze", "Skip project analysis")
  .action(initCommand);

program
  .command("validate")
  .description("Validate your foundr installation")
  .option("-f, --fix", "Attempt to fix issues automatically")
  .action(validateCommand);

program
  .command("update")
  .description("Update foundr patterns to latest version")
  .option("-d, --dry-run", "Show changes without applying them")
  .action(() => {
    console.log(chalk.yellow("Update command coming soon..."));
  });

program
  .command("diff")
  .description("Preview changes before updating")
  .action(() => {
    console.log(chalk.yellow("Diff command coming soon..."));
  });

program
  .command("plugins")
  .description("Manage foundr plugins")
  .argument("[action]", "Action: list, search, add, remove, create")
  .argument("[name]", "Plugin name")
  .action((action, name) => {
    console.log(chalk.yellow(`Plugins ${action || "list"} ${name || ""} coming soon...`));
  });

// Show help if no command provided
if (process.argv.length === 2) {
  console.log(chalk.bold("\n  foundr") + chalk.dim(" - Forge your AI development workflow\n"));
  program.outputHelp();
}

program.parse();
