# Troubleshooting

## Agents

**Not activating**: Check `ls .claude/agents/`, verify name matches task, try explicit "Use the X agent"

**Failing**: Check MCP config, verify services running, check dependencies

## Hooks

**Not running**: Check `claude_code_hooks.json` exists, scripts executable (`chmod +x`), test manually:

```bash
bash .claude/hooks/your-hook.sh
```

**Blocking incorrectly**: Review hook logic, check `hooks/README.md`, temporarily disable if needed

## Commands

**Not found**: Check `ls .claude/commands/`, verify YAML front-matter syntax

## MCP Tools

**Playwright failing**: Ensure dev server running, check login required, verify URL accessible

## Performance

**Slow hooks**: Commit more frequently (fewer files), check hook skip options

**Slow checks**: Run quality checks manually before committing large changesets

**Large context**: Keep agent files small, reference docs rather than inline

## Test Tools

```bash
# Hook test
bash .claude/hooks/your-hook.sh

# Validate agents
bash .claude/scripts/validate-agents.sh
```

## Getting Help

1. Check docs: `agents/README.md`, `commands/README.md`, `hooks/README.md`
2. Review changes: `git log --oneline .claude/`
3. Test in isolation: disable hooks, explicit agent invocation
