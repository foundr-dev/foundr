# Contributing to foundr

First off, thank you for considering contributing to foundr! It's people like you that make foundr such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (config files, command output)
- **Describe the behavior you observed and what you expected**
- **Include your environment** (OS, Bun/Node version, foundr version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any alternatives you've considered**

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure the test suite passes (`bun test`)
4. Make sure your code lints (`bun run lint`)
5. Update documentation if needed

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/foundr.git
cd foundr

# Install dependencies
bun install

# Run tests
bun test

# Run the CLI in development
bun run dev
```

## Project Structure

```
foundr/
├── src/
│   ├── core/           # Core framework (registry, patterns, discovery)
│   ├── adaptors/       # AI tool adaptors (Claude, OpenCode, generic)
│   ├── spec-systems/   # Spec system integrations
│   ├── integrations/   # Task manager integrations
│   ├── templates/      # Agent/command/skill templates
│   ├── analysers/      # Project analysis modules
│   ├── generators/     # File generators
│   └── cli/            # CLI commands
├── templates/          # User-facing templates
└── tests/              # Test files
```

## Coding Standards

- Write TypeScript with strict mode enabled
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Follow existing code style (enforced by Biome)

## Testing

- Write tests for new features
- Update tests when changing existing functionality
- Aim for meaningful coverage, not 100%

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test --watch

# Run specific test file
bun test src/core/registry.test.ts
```

## Creating a Plugin

See [Plugin Development Guide](docs/plugins.md) for detailed instructions on creating:

- **AI Tool Adaptors** - Support new AI assistants
- **Task Manager Plugins** - Integrate PM tools
- **Language Packs** - Tech-specific patterns

## Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add OpenCode adaptor
fix: resolve registry parsing issue
docs: update README with examples
chore: update dependencies
```

## Questions?

Feel free to open an issue with your question or reach out in discussions.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
