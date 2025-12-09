# CLI Patterns Skill

On-demand context for building command-line interfaces.

## When to Load

Invoke this skill when:
- Building CLI commands with Commander.js
- Handling user input and prompts
- Creating interactive wizards
- Implementing spinners and progress indicators
- Formatting CLI output

## Commander.js Patterns

### Basic Command Structure

```typescript
import { Command } from "commander";

const program = new Command()
  .name("foundr")
  .description("AI development infrastructure toolkit")
  .version("1.0.0");

// Simple command
program
  .command("init")
  .description("Initialize foundr in a project")
  .option("-y, --yes", "Accept all defaults")
  .option("-p, --preset <preset>", "Use a preset", "standard")
  .action(async (options) => {
    console.log("Initializing with preset:", options.preset);
  });

// Command with required argument
program
  .command("add <type>")
  .description("Add a component (agent, command, skill)")
  .argument("<name>", "Component name")
  .action(async (type, name) => {
    console.log(`Adding ${type}: ${name}`);
  });

program.parse();
```

### Subcommands

```typescript
// Group related commands
const git = program
  .command("git")
  .description("Git-related commands");

git
  .command("status")
  .description("Show git status")
  .action(gitStatusCommand);

git
  .command("sync")
  .description("Sync with remote")
  .action(gitSyncCommand);

// Usage: foundr git status
```

### Options

```typescript
program
  .command("build")
  // Boolean flag
  .option("-w, --watch", "Watch mode")
  // With default value
  .option("-o, --output <dir>", "Output directory", "dist")
  // Required option
  .requiredOption("-c, --config <path>", "Config file path")
  // Variadic option
  .option("-e, --exclude <patterns...>", "Patterns to exclude")
  // Negatable
  .option("--no-cache", "Disable caching")
  .action((options) => {
    // options.watch, options.output, options.config, etc.
  });
```

## Interactive Prompts (prompts library)

```typescript
import prompts from "prompts";

// Text input
const { name } = await prompts({
  type: "text",
  name: "name",
  message: "Project name?",
  initial: "my-project",
});

// Select (single choice)
const { preset } = await prompts({
  type: "select",
  name: "preset",
  message: "Choose a preset:",
  choices: [
    { title: "Minimal", value: "minimal" },
    { title: "Standard", value: "standard", selected: true },
    { title: "Full", value: "full" },
  ],
});

// Multi-select
const { tools } = await prompts({
  type: "multiselect",
  name: "tools",
  message: "Select AI tools:",
  choices: [
    { title: "Claude Code", value: "claude", selected: true },
    { title: "OpenCode", value: "opencode" },
    { title: "Generic", value: "generic" },
  ],
});

// Confirm
const { confirmed } = await prompts({
  type: "confirm",
  name: "confirmed",
  message: "Proceed with installation?",
  initial: true,
});

// Handle cancellation (Ctrl+C)
const response = await prompts(questions, {
  onCancel: () => {
    console.log("Cancelled");
    process.exit(0);
  },
});
```

## Spinners (ora)

```typescript
import ora from "ora";

// Basic spinner
const spinner = ora("Loading...").start();

try {
  await someAsyncTask();
  spinner.succeed("Done!");
} catch (error) {
  spinner.fail("Failed");
  throw error;
}

// With updates
const spinner = ora("Analysing project...").start();
spinner.text = "Detecting languages...";
// ... later
spinner.text = "Generating config...";
spinner.succeed("Analysis complete");

// Different states
spinner.info("Informational message");
spinner.warn("Warning message");
spinner.stop();  // Stop without status
```

## Colored Output (chalk)

```typescript
import chalk from "chalk";

// Basic colors
console.log(chalk.red("Error!"));
console.log(chalk.green("Success"));
console.log(chalk.yellow("Warning"));
console.log(chalk.blue("Info"));
console.log(chalk.dim("Muted text"));

// Combinations
console.log(chalk.bold.green("Important success"));
console.log(chalk.bgRed.white("Critical error"));

// Template literals
console.log(`${chalk.green("✓")} Task completed`);
console.log(`${chalk.red("✗")} Task failed`);
console.log(`${chalk.yellow("⚠")} Warning message`);

// Conditional
const status = success ? chalk.green("PASS") : chalk.red("FAIL");
```

## Output Formatting

### Tree Structure

```typescript
function printTree(items: string[], indent = 0): void {
  items.forEach((item, i) => {
    const isLast = i === items.length - 1;
    const prefix = isLast ? "└─" : "├─";
    console.log(`${"  ".repeat(indent)}${prefix} ${item}`);
  });
}

// Output:
// ├─ .claude/
// ├─ agents/
// └─ commands/
```

### Tables

```typescript
function printTable(rows: [string, string][]): void {
  const maxKey = Math.max(...rows.map(([k]) => k.length));
  for (const [key, value] of rows) {
    console.log(`  ${key.padEnd(maxKey)}  ${value}`);
  }
}

// Output:
//   Name      foundr
//   Version   1.0.0
//   Preset    standard
```

### Progress Indicators

```typescript
// Simple percentage
function printProgress(current: number, total: number, label: string): void {
  const percent = Math.round((current / total) * 100);
  const bar = "█".repeat(percent / 5) + "░".repeat(20 - percent / 5);
  process.stdout.write(`\r${bar} ${percent}% ${label}`);
}

// Clear line and print final
process.stdout.write("\n");
```

## Error Handling

```typescript
// User-friendly errors
class CLIError extends Error {
  constructor(
    message: string,
    public code: string,
    public suggestion?: string,
  ) {
    super(message);
  }
}

function handleError(error: unknown): never {
  if (error instanceof CLIError) {
    console.error(chalk.red(`Error: ${error.message}`));
    if (error.suggestion) {
      console.error(chalk.dim(`Hint: ${error.suggestion}`));
    }
    process.exit(1);
  }

  // Unexpected error
  console.error(chalk.red("Unexpected error:"));
  console.error(error);
  process.exit(1);
}

// Usage
try {
  await runCommand();
} catch (error) {
  handleError(error);
}
```

## File System Patterns

```typescript
import { existsSync } from "node:fs";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { join, dirname } from "node:path";

// Ensure directory exists
async function ensureDir(dir: string): Promise<void> {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

// Safe write (create parent dirs)
async function safeWriteFile(path: string, content: string): Promise<void> {
  await ensureDir(dirname(path));
  await writeFile(path, content);
}

// Check if in project root
function isProjectRoot(dir: string): boolean {
  return existsSync(join(dir, "package.json"));
}
```

## Best Practices

1. **Always handle Ctrl+C gracefully**
2. **Provide --help with examples**
3. **Use spinners for operations > 500ms**
4. **Color errors red, success green**
5. **Exit with non-zero on error**
6. **Validate input early**
7. **Provide --yes flag for CI usage**
8. **Show what will happen before destructive operations**

## Resources

- [Commander.js](https://github.com/tj/commander.js)
- [prompts](https://github.com/terkelg/prompts)
- [ora](https://github.com/sindresorhus/ora)
- [chalk](https://github.com/chalk/chalk)
