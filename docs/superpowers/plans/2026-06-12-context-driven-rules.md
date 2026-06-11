# Context-Driven Exploration Rule Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update GEMINI.md to enforce the context-driven exploration rules with explicit phase separation (Exploration vs Implementation) and escape hatches.

**Architecture:** We will modify GEMINI.md in place by replacing the outdated `<rule name="Context-Driven Exploration Only">` block with the refined version. We will verify the changes using git diff and compile verification before committing.

**Tech Stack:** Plain Text / XML, Git

---

### Task 1: Update GEMINI.md Instructions

**Files:**
- Modify: `GEMINI.md:22-25`

- [ ] **Step 1: Replace the old rule with the refined 영문 rule**

Replace the following content in `GEMINI.md`:
```xml
    <rule name="Context-Driven Exploration Only">
      When exploring subdirectories, if an existing `context.md` (or equivalent context file) is found, you MUST NOT read individual source code files (.ts, .js, etc.).
      Instead, rely solely on the data inside `context.md` to understand the sub-tree layout, types, and purposes, using this information to build up the wider system context bottom-up.
    </rule>
```

With this updated content:
```xml
    <rule name="Context-Driven Exploration Only">
      When exploring subdirectories, if an existing `context.md` (or equivalent context file) is found, you MUST NOT read individual source code files (.ts, .tsx, .js, .jsx, .css.ts, .prisma, etc.) during the initial analysis/exploration phase.
      Instead, rely solely on the data inside `context.md` to understand the sub-tree layout, types, and purposes, using this information to build up the wider system context bottom-up.

      Exceptions and Gates:
      1. [Implementation Phase]: During actual code modification, you are permitted to read only the specific source files you are explicitly assigned to modify, along with their direct dependency interfaces.
      2. [Escape Hatch]: If the `context.md` is empty, lacks critical type definitions, or is determined to be outdated (e.g. mismatching the actual file list), you may read the minimal necessary entry or configuration files to bridge the gap. However, you MUST prioritize updating and sync-saving the `context.md` with the latest state before proceeding.
    </rule>
```

- [ ] **Step 2: Run git diff to verify the changes**

Run: `git diff GEMINI.md`
Expected Output: Confirm that the old block is removed (prefixed with `-`) and the new block is added (prefixed with `+`).

- [ ] **Step 3: Commit the change**

Run:
```bash
git add GEMINI.md
git commit -m "feat(rules): enhance context-driven exploration guidelines in GEMINI.md"
```
Expected Output: Successful commit message from Git.
