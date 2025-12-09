# Bun Patterns Skill

On-demand context for Bun runtime patterns and APIs.

## When to Load

Invoke this skill when:
- Working with Bun-specific APIs (file I/O, HTTP server, etc.)
- Configuring Bun (bunfig.toml, package.json)
- Optimising for Bun runtime
- Using Bun test runner

## Bun File I/O

```typescript
// Read file (sync, returns string)
const content = Bun.file("path/to/file").text();

// Read as JSON
const data = await Bun.file("config.json").json();

// Write file
await Bun.write("output.txt", "content");
await Bun.write("data.json", JSON.stringify(data, null, 2));

// Check if file exists
import { existsSync } from "node:fs";
if (existsSync("path/to/file")) { ... }
```

## Bun Shell (for scripting)

```typescript
import { $ } from "bun";

// Run command and get output
const result = await $`git status`.text();

// With error handling
const { exitCode, stdout, stderr } = await $`bun test`.quiet();

// Pipe commands
await $`cat file.txt | grep pattern`;

// Template variables (auto-escaped)
const file = "user input.txt";
await $`cat ${file}`;  // Safe from injection
```

## Bun HTTP Server

```typescript
Bun.serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/api/health") {
      return Response.json({ status: "ok" });
    }

    return new Response("Not found", { status: 404 });
  },
});
```

## Bun Test Runner

```typescript
import { describe, test, expect, beforeEach, mock } from "bun:test";

describe("MyModule", () => {
  beforeEach(() => {
    // Setup
  });

  test("should work", () => {
    expect(true).toBe(true);
  });

  test("async test", async () => {
    const result = await someAsyncFn();
    expect(result).toMatchSnapshot();
  });
});

// Mocking
const mockFn = mock(() => "mocked");
mockFn();
expect(mockFn).toHaveBeenCalled();
```

## Package.json for Bun

```json
{
  "name": "my-app",
  "type": "module",
  "scripts": {
    "dev": "bun run --watch src/index.ts",
    "build": "bun build src/index.ts --outdir dist --target node",
    "test": "bun test",
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "@types/bun": "latest",
    "typescript": "^5.0.0"
  }
}
```

## bunfig.toml

```toml
[install]
# Use exact versions
exact = true

[test]
# Test configuration
coverage = true
coverageThreshold = 80

[run]
# Preload scripts
preload = ["./src/setup.ts"]
```

## Bun vs Node.js Differences

| Feature | Bun | Node.js |
|---------|-----|---------|
| Package manager | Built-in (`bun install`) | npm/yarn/pnpm |
| Test runner | Built-in (`bun test`) | Jest/Vitest/etc |
| TypeScript | Native support | Requires compilation |
| File I/O | `Bun.file()`, `Bun.write()` | `fs` module |
| Shell | `$` tagged template | `child_process` |

## Common Patterns

### CLI Entry Point

```typescript
#!/usr/bin/env bun
// src/cli/index.ts

import { Command } from "commander";

const program = new Command()
  .name("my-cli")
  .version("1.0.0");

program
  .command("init")
  .action(async () => {
    // Implementation
  });

program.parse();
```

### Error Handling

```typescript
import { $ } from "bun";

try {
  await $`some-command`.throws(true);
} catch (error) {
  if (error instanceof ShellError) {
    console.error(`Command failed: ${error.stderr}`);
    process.exit(error.exitCode);
  }
  throw error;
}
```

## Resources

- [Bun Documentation](https://bun.sh/docs)
- [Bun API Reference](https://bun.sh/docs/api)
- [Bun Test Runner](https://bun.sh/docs/cli/test)
