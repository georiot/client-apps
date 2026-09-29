---
coverage: Authoring and validation rules for LLM guidance under .config/llm/
---

# Contributing

## Purpose

These rules help humans and Codex agents maintain LLM guidance and configuration
safely and consistently. Canonical guidance lives under `.config/llm/`.

## Required Workflow

1. Read `.config/llm/INDEX.md` and the relevant canonical guidance before editing.
2. Prefer the smallest change that satisfies the request.
3. Update `INDEX.md` when a guidance file is added, removed, renamed, or repurposed.
4. Complete the validation steps below before finishing.

## Markdown Rules

### Structure

- Use one top-level H1 per document and a clear heading hierarchy.
- Do not skip heading levels.
- Keep sections short and purpose-driven.
- Prefer one idea per section.
- Use bullets for lists instead of dense paragraphs.

### Formatting

- Use GitHub-flavored Markdown.
- Keep the YAML `coverage` field specific to the document's scope.
- Use fenced code blocks for commands, examples, and snippets.
- Use inline code for file names, paths, commands, flags, and identifiers.
- Do not use HTML unless Markdown cannot express the structure.

### Lists

- Prefer flat lists; nest only when the hierarchy is necessary.
- Avoid nesting more than one level unless essential.
- Keep list items parallel in grammar and scope.
- Use consistent bullet markers and indentation.
- Surround lists with blank lines.

### Code Blocks

- Use an appropriate language tag for fenced code blocks.
- Keep examples minimal and directly relevant.
- Do not include placeholder code unless explicitly requested.
- Surround fenced blocks with blank lines.

### Links and Paths

- Use Markdown links when file references should be clickable.
- Prefer repository-relative paths in documentation.
- Use absolute paths in user-facing responses when a local filesystem target is needed.
- Verify relative links from the directory containing the document.

### Tables

- Use tables only when they add clarity.
- Keep table cells short.
- Avoid wide tables with many columns.

### Tone

- Be direct and factual.
- Avoid marketing language, fluff, and filler.
- Prefer explicit instructions over implied intent.

## Codex Agent Rules

When adding or reviewing Markdown:

- Check heading levels, list markers, and indentation for consistency.
- Avoid trailing spaces, hard tabs, and multiple consecutive blank lines.
- Keep prose line lengths reasonable without breaking links or commands.
- Surround headings, lists, and fenced code blocks with blank lines.
- Use consistent fenced code block formatting and language tags.
- Follow repository-local conventions when they conflict with generic style rules.

## Content Quality Rules

- Make instructions specific enough to follow without guessing.
- Prefer explicit paths, file names, and commands over vague references.
- Include validation steps for workflows.
- Name any tool or script a rule depends on.
- Verify behavioral claims against the current source.
- Distinguish existing behavior, regressions, proposed fixes, and completed changes.
- Do not invent ticket identifiers, tooling, or instruction-sync requirements.

## Validation

Before finishing a Markdown change:

1. Check heading order, list formatting, whitespace, and fenced blocks.
2. Confirm links and paths are correct.
3. Confirm the content is maintained at its canonical path.
4. Confirm `INDEX.md` reflects any discovery or scope changes.
5. Re-read the rendered text for ambiguity, repetition, or drift.

## Exception Handling

- Follow repo-local conventions when they conflict with generic Markdown rules.
- Call out unresolved ambiguity before writing guidance that depends on it.
- For generated Markdown, update its canonical source instead of the output.

## Notes

This is a living contributor guide for both humans and Codex agents.
