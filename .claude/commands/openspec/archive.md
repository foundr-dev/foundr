# /openspec:archive

Archive a completed OpenSpec change after deployment.

## Usage

```
/openspec:archive <change-id>
/openspec:archive add-plugin-system
```

## Behavior

1. Verify all tasks are complete
2. Merge delta specs into main specs
3. Move change to archive directory
4. Update spec files with new requirements

## Prerequisites

- All tasks marked as `[x]` complete
- Code deployed/merged
- Tests passing

## What Happens

1. **Delta specs merged**: ADDED/MODIFIED/REMOVED requirements applied to `specs/`
2. **Change archived**: Directory moved to `openspec/archive/`
3. **Specs updated**: Main specs now reflect the changes

## Manual Alternative

If CLI not available:
1. Copy delta content to main spec
2. Remove change directory
3. Commit the spec updates

## After Archive

- Main specs in `openspec/specs/` are now truth
- Change no longer appears in `openspec list`
- Historical record kept in `openspec/archive/`
