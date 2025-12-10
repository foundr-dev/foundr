# XML Patterns for Claude Prompts

Claude is trained to parse XML well. Use XML tags to structure prompts for better accuracy and parseability.

## When to Use XML

**Use XML for:**

- Instructions/objectives: `<objective>`, `<instructions>`
- Process steps: `<process>`, `<workflow>`
- Output specifications: `<output_format>`
- Success criteria: `<success_criteria>`
- Examples: `<example>`, `<examples>`
- Context separation: `<context>`, `<background>`
- Thinking guidance: `<thinking>`, `<analysis>`

**Use Toon for:**

- Data/tabular content
- Registry entries
- Command output
- Structured results

**Use Markdown for:**

- Headings (in human docs)
- Lists within XML sections
- Code blocks
- Links

## Tag Patterns

### Standard Prompt Structure

```xml
<objective>
[What this command/agent achieves]
</objective>

<process>
1. [Step one]
2. [Step two]
3. [Step three]
</process>

<output_format>
**Section:** [content]

data{field1,field2}:
  value1,value2
</output_format>

<success_criteria>
- [Criterion 1]
- [Criterion 2]
</success_criteria>
```

### Conditional Content

```xml
<if_complex>
For complex tasks, also consider:
- [Additional step]
</if_complex>
```

### Examples

```xml
<examples>
<example name="simple">
Input: [example input]
Output: [example output]
</example>
</examples>
```

### Command Examples with Verification

When documenting slash commands that agents must execute with specific arguments, use `<example_command>` with nested `<expected_output>` for verification:

```xml
<example_command>
/git:status
<expected_output>ok: clean working tree</expected_output>
</example_command>
Replace placeholders with actual values. If output differs from expected, report error to user.
```

**Why this pattern**:
- Concrete values prevent models from treating placeholders as literals
- Nested `<expected_output>` clearly separates command from verification
- Consistent XML structure throughout

**Anti-pattern** (avoid):
```xml
<!-- BAD: placeholder may be interpreted literally -->
/some:command <id> done
```

## Best Practices

1. **Consistent tag names** - Use same tags across similar commands
2. **Semantic naming** - Tag names should describe content
3. **Nest for hierarchy** - `<outer><inner></inner></outer>`
4. **Don't over-tag** - Simple content doesn't need XML
5. **Combine with Toon** - XML for instructions, Toon for data

## Migration Strategy

When updating existing files:

1. Add XML only where it improves clarity
2. Prioritise: agents > skills > commands
3. Focus on: objective, process, output_format, success_criteria
4. Leave simple commands as markdown

## Tag Reference

```toon
tags{tag,use_for}:
  objective,"purpose/goal"
  when_invoked,"trigger conditions"
  process,"ordered steps"
  output_format,"expected output"
  success_criteria,"done conditions"
  context,"background info"
  examples,"input/output pairs"
  example_command,"executable command with concrete args"
  expected_output,"verification for commands (nest in example_command)"
  thinking,"analysis steps"
  constraints,"limitations"
  template,"code/format templates"
  references,"links to detailed content"
  anti_patterns,"what to avoid"
```

## Standard Tags by Type

```toon
type{required_tags,optional_tags}:
  agents,"objective,process,output_format,success_criteria","constraints,anti_patterns"
  skills,"when_invoked,process,output_format,success_criteria","template,references"
  commands,"(markdown ok for simple)","objective,process"
```
