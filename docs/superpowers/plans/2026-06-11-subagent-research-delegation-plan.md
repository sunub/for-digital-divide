# Subagent-Driven Hybrid Context Research Delegation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Evolve the `research` skill instruction document (`.agents/skills/research/SKILL.md`) to define the Hybrid Context Update Strategy and Subagent Delegation rules.

**Architecture:** Update the skill Markdown file to specify the Change Severity Score system, execution branching (Inline Patch vs Subagent Delegation), subagent prompt metadata, and standard reporting protocol.

**Tech Stack:** Markdown / AGY Skill Spec

---

### Task 1: Integrate Hybrid Update Strategy and Subagent Delegation in SKILL.md

**Files:**
- Modify: `/.agents/skills/research/SKILL.md`

- [ ] **Step 1: Draft the revised SKILL.md content**
  Prepare the modifications for `.agents/skills/research/SKILL.md` to incorporate:
  - Change Severity Score formula
  - Branching conditions (Score = 0: Cached, 0 < Score <= 3: Inline Patch, Score > 3: Subagent Delegation)
  - Subagent prompt inputs (TargetDirectory, PreviousHash)
  - Subagent reporting format contract
  - Hard gates for execution isolation and user cost transparency
  - Ensure all documentation is written in pure English

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
      - For **Auxiliary Domains**: Do NOT generate separate `context.md` files inside them. Instead, read the exported functions, custom hooks, and type signatures from the source files and inline them directly in the parent/root `context.md` under a dedicated "Shared Assets & Helpers" section.
      </HARD-GATE>
      
      - Infer the purpose and role of the current directory from the bottom up using only these two pieces of information (structure + sub-context / signatures), and write a new, condensed context.md.
  
  - Case C (Not found anywhere): Analyze the code structure and the types used in the current directory to generate a new, condensed version.
  </HARD-GATE>
  
  ## Hybrid Update Strategy (Change Severity Score)
  
  When entering a domain or after code modifications, the agent calculates a **Change Severity Score**:
  - **Modified/Added File**: `+1 point` per file
  - **Directory Structural Change** (new folder, renamed folder): `+5 points`
  - **Configuration/Entry Point Change** (e.g. `funnelConfig.ts`, `page.tsx`): `+3 points`
  
  ### Execution Branching Rules
  - **Score = 0**: Use cached `context.md` directly. No tools or tokens spent.
  - **0 < Score <= 3**: **Inline Patch**: Main agent parses local `git diff` and applies minor text edits to existing `context.md` in the current session. No subagent spawned.
  - **Score > 3**: **Subagent Delegation**: Show token/time estimate to the user and request approval. If approved, delegate recursive research to a specialized subagent.
  
  ## Subagent Delegation Interface
  
  When executing a large/structural update, the subagent is triggered with:
  - **TypeName**: `self` (inheriting file read/write and execution permissions)
  - **Role**: `Recursive Domain Researcher`
  - **Workspace**: `inherit` (sharing uncommitted workspace modifications)
  
  ### Subagent Prompt Metadata
  - **TargetDirectory**: Relative path to target domain (e.g. `frontend/src/app/login`)
  - **PreviousHash**: Git reference point before the changes
  
  ## Anti-Pattern: "Common Mistakes in Search and Context Compression"
  
  Simply listing files or using inefficient commands undermines the core purpose of "context compression." Here are the key anti-patterns to avoid:
  
  1. Indiscriminate Full Tree Traversal (The "DFS" Trap)
  - Symptom: Using commands like find . -name "*context.md" to locate all files.
  - Reason: Internally traverses deep subdirectories causing severe resource waste.
  - Solution: Use optimized tools (like rg --files --glob "*context.md") that behave closer to a Breadth-First Search (BFS).
  
  2. Blind Overwrite
  - Symptom: Completely overwriting the existing context.md with a new snapshot without reading its history.
  - Solution: Always read the existing file first, and incrementally update missing contents based on the difference (diff).
  
  ## Checklist
  
  You must create tasks for each of the following items and complete them in order:
  
  1. Calculate Severity Score — Determine change severity based on file modification metrics.
  2. Execute Branching Logic — Route to Cache, Inline Patch, or Subagent Delegation.
  3. Prompt User for Cost (If Score > 3) — Disclose estimated token/time cost and await approval.
  4. Dispatch Subagent — Invoke `Recursive Domain Researcher` subagent with TargetDirectory.
  5. Assemble Bottom-up Context — Subagent performs core recursion and auxiliary signature extraction.
  6. Apply & Save context.md — Update context.md while preserving developer notes.
  7. Stage and Commit — Add context.md to staging and commit.
  
  ## The Process
  
  <HARD-GATE>
  **Source Code Exploration Limits**
  - Do NOT read the entire contents of files inside auxiliary directories if they exceed 10KB or 100 lines.
  - Only parse exported signatures and JSDoc blocks.
  </HARD-GATE>
  
  <HARD-GATE>
  **Recursion Depth Limit**
  - The maximum recursion depth is 2 (Depth 2). Do NOT recurse deeper. If structures are nested beyond Depth 2, recommend architecture refactoring to the user. (This is distinct from the 3-level tree layout visualization in the document template).
  </HARD-GATE>
  
  <HARD-GATE>
  **Excluded Folders**
  - Always exclude `.git`, `node_modules`, `dist`, `.next`, `build`, `.gemini`, and `.gitignore` patterns.
  </HARD-GATE>
  
  <HARD-GATE>
  **Execution Isolation**
  - The subagent MUST restrict its file reads and modifications strictly to the specified `TargetDirectory` and its subdirectories.
  </HARD-GATE>
  
  <HARD-GATE>
  **Standard Reporting Protocol**
  - The subagent must report back using the following exact format upon completion:
    - **Status**: DONE | DONE_WITH_CONCERNS | BLOCKED
    - **Estimated Tokens Used**: [Calculated token estimate]
    - **Files Updated**: [List of absolute paths to updated context.md files]
    - **Summary**: [3-line summary of major domain changes]
  </HARD-GATE>
  
  <CONSTRAINT>
  **Manual Note Preservation**
  - Always preserve manually written notes in `context.md` under a `## Manual Notes` section at the top of the file.
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
  git commit -m "feat(research-skill): add hybrid update strategy and subagent delegation"
  ```
