# Recursive Domain Research Skill Evolution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Evolve the `research` skill instruction document (`.agents/skills/research/SKILL.md`) to define a recursive, conditional domain context generation behavior.

**Architecture:** Update the existing Markdown instruction file to structure the recursive bottom-up execution flow, directory categorization rules, and strict token/exploration constraints.

**Tech Stack:** Markdown / AGY Skill Spec

---

### Task 1: Update Description, Hard-Gate and Checklist in SKILL.md

**Files:**
- Modify: `/.agents/skills/research/SKILL.md`

- [ ] **Step 1: Draft the revised SKILL.md content**
  Prepare the modifications for `.agents/skills/research/SKILL.md` to incorporate:
  - Recursive search logic (Case B adaptation)
  - Core Domain vs Auxiliary Folder categorization rules
  - Export signature extraction guidelines for Auxiliary folders
  - Strict `<HARD-GATE>` and `<CONSTRAINT>` tags for size, depth, and exclusions

- [ ] **Step 2: Apply modifications to SKILL.md**
  Replace the contents of `/Users/sunub/workspace/for-digital-divide/.agents/skills/research/SKILL.md` with the updated instruction set.
  
  ```markdown
  ---
  name: research
  description: Generates a sub-tree structure based on the current directory, and writes a compressed context detailing the types used, along with the purpose and role of the code written in the directory.
  ---
  
  # Research
  
  Compress the context by writing the code structure and the purpose of the current directory based on the current directory. This is a critical skill for understanding and documenting the domain of a codebase, especially in large projects with complex structures.
  
  <HARD-GATE>
  1. First, check if a context.md file exists in the current project. (If possible, use the agent's built-in file search tool or run the command: rg --files --glob "*context.md" | head -n 1).
  2. Strictly branch your actions based on the findings as follows:
  - Case A (Exists in the current folder): Read the contents of the existing file, compare it with the latest code state, and update it if modifications are required.
  - Case B (Not in the current folder, but found in a subfolder, OR performing recursive subfolder research):
      - Scans Depth-1 subdirectories under the current folder.
      - Categorizes subdirectories into:
        - **Core Domains**: Business steps, main route entries (e.g. `Pin`, `VerifyStep`, `email-password`).
        - **Auxiliary Domains**: Folders containing `hooks`, `utils`, `types`, `ui`, `style`, `components`.
      
      <HARD-GATE>
      - For **Core Domains**: Recursively call the `research` skill inside those subdirectories (up to Max Depth 2) to ensure they have their own `context.md` files first.
      - For **Auxiliary Domains**: Do NOT generate separate `context.md` files inside them. Instead, read the exported functions, custom hooks, and type signatures from the source files and inline them directly in the parent/root `context.md` under a dedicated "공유 헬퍼 및 자산" section.
      </HARD-GATE>
      
      - Infer the purpose and role of the current directory from the bottom up using only these two pieces of information (structure + sub-context / signatures), and write a new, condensed context.md.
  
  - Case C (Not found anywhere): Analyze the code structure and the types used in the current directory to generate a new, condensed version.
  </HARD-GATE>
  
  ## Anti-Pattern: "Common Mistakes in Search and Context Compression"
  
  Simply listing files or using inefficient commands undermines the core purpose of "context compression." Here are the key anti-patterns to avoid:
  
  1. Indiscriminate Full Tree Traversal (The "DFS" Trap)
  - Symptom: Using commands like find . -name "*context.md" to locate all files.
  - Reason: Internally traverses deep subdirectories causing severe resource waste.
  - Solution: Use optimized tools (like rg --files --glob "*context.md") that behave closer to a Breadth-First Search (BFS).
  
  1. Blind Overwrite
  - Symptom: Completely overwriting the existing context.md with a new snapshot without reading its history.
  - Solution: Always read the existing file first, and incrementally update missing contents based on the difference (diff).
  
  ## Checklist
  
  You must create tasks for each of the following items and complete them in order:
  
  1. Execute Optimized Search — Search for existing context.md files.
  2. Categorize Subdirectories — Divide Depth-1 subdirectories into Core Domain and Auxiliary.
  3. Execute Core Recursion — Recursively call research skill on Core Domains (Max Depth 2).
  4. Perform Auxiliary Signature Extraction — Extract exported names, types, and JSDocs from Auxiliary directories.
  5. Combine & Infer Context — Pull sub-context files and auxiliary signatures together bottom-up.
  6. Draft & Integrate — Draft updated context.md, ensuring manual developer notes are preserved.
  7. Save & Commit — Write context.md in the current directory and commit.
  
  ## The Process
  
  <HARD-GATE>
  **Source Code Exploration Limits**
  - Do NOT read the entire contents of files inside auxiliary directories if they exceed 10KB or 100 lines.
  - Only parse exported signatures and JSDoc blocks.
  </HARD-GATE>
  
  <HARD-GATE>
  **Recursion Depth Limit**
  - The maximum recursion depth is 2 (Depth 2). Do NOT recurse deeper. If structures are nested beyond Depth 2, recommend architecture refactoring to the user.
  </HARD-GATE>
  
  <HARD-GATE>
  **Excluded Folders**
  - Always exclude `.git`, `node_modules`, `dist`, `.next`, `build`, `.gemini`, and `.gitignore` patterns.
  </HARD-GATE>
  
  <CONSTRAINT>
  **Manual Note Preservation**
  - Always preserve manually written notes in `context.md` under a `## 개발자 참고 사항 (Manual Notes)` section at the top of the file.
  </CONSTRAINT>
  
  ## Document Structure Template
  
  Generated `context.md` files must follow this template:
  
  ```markdown
  # [Domain Name] Context
  
  ## 1. 역할 및 목적
  - [Describe domain role]
  
  ## 2. 하위 도메인 구성 (Core Sub-domains)
  - [[Sub-domain A](file:///path/to/A/context.md)]: [Short description of Sub-domain A]
  
  ## 3. 공유 헬퍼 및 자산 (Auxiliary Modules)
  ### Hooks (hooks/)
  - `useCustomHook(param: Type) => ReturnType`: [Hook description]
  ### Utilities (utils/)
  - `helperFunction(arg: Type) => ReturnType`: [Utility description]
  ### Types & Interfaces (types/)
  - `interface CustomData`: [Type description]
  
  ## 4. 디렉토리 구조 (최대 Depth 3)
  ```
  ```

- [ ] **Step 3: Verify markdown formatting**
  Verify the modified SKILL.md file has correct Markdown format and no trailing/unclosed code blocks.

- [ ] **Step 4: Commit the updated SKILL.md**
  ```bash
  git add .agents/skills/research/SKILL.md
  git commit -m "feat(research-skill): support recursive bottom-up context generation and signature extraction"
  ```
