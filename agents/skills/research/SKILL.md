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
    
    - For **Core Domains**: Delegate research tasks in parallel to specialized subagents.
      - Queue all Depth-1 Core Domain directories.
      - Run up to **3 parallel subagents** concurrently using the `invoke_subagent` tool.
      - As each subagent completes, pull the next target domain from the queue until all Core Domains are researched.
      - Subagents must write local `context.md` files in their respective subfolders.
    - For **Auxiliary Domains**: Do NOT generate separate `context.md` files inside them. Instead, read the exported functions, custom hooks, and type signatures from the source files and inline them directly in the parent/root `context.md` under a dedicated "Shared Assets & Helpers" section.
    
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
- **Score > 3**: **Subagent Delegation**: Show token/time estimate to the user and request approval. If approved, delegate recursive research to parallelized specialized subagents.

## Subagent Delegation Interface

When executing a large/structural update, parallel subagents are triggered with:
- **TypeName**: `self` (inheriting file read/write and execution permissions)
- **Role**: `Recursive Domain Researcher`
- **Workspace**: `inherit` (sharing uncommitted workspace modifications)

### Subagent Prompt Metadata
- **TargetDirectory**: Relative path to target domain (e.g. `frontend/src/app/login/Pin`)
- **PreviousHash**: Git reference point before the changes

<HARD-GATE>
**Subagent Constraints & Filtering**
- **Target Filtering**: Subagents MUST consult [filtering-rules.md](./references/filtering-rules.md) for patterns to include/exclude. Do NOT read style files (`*.css`, `*.css.ts`) or stateless visual-only UI components.
- **Step Cap**: Subagents must halt and report `DONE_WITH_CONCERNS` if they hit a hard limit of **15 steps**.
- **Execution Isolation**: Subagents MUST restrict their file reads and modifications strictly to their assigned `TargetDirectory` and its subdirectories.
</HARD-GATE>

## Anti-Pattern: "Common Mistakes in Search and Context Compression"

Simply listing files or using inefficient commands undermines the core purpose of "context compression." Here are the key anti-patterns to avoid:

1. Indiscriminate Full Tree Traversal (The "DFS" Trap)
- Symptom: Using commands like find . -name "*context.md" to locate all files.
- Reason: Internally traverses deep subdirectories causing resource waste.
- Solution: Use optimized tools (like rg --files --glob "*context.md") that behave closer to a Breadth-First Search (BFS).

2. Blind Overwrite
- Symptom: Completely overwriting the existing context.md with a new snapshot without reading its history.
- Solution: Always read the existing file first, and incrementally update missing contents based on the difference (diff).

## Checklist

You must create tasks for each of the following items and complete them in order:

1. Calculate Severity Score — Determine change severity based on file modification metrics.
2. Execute Branching Logic — Route to Cache, Inline Patch, or Parallel Subagent Delegation.
3. Prompt User for Cost (If Score > 3) — Disclose estimated token/time cost and await approval.
4. Dispatch Parallel Subagents — Invoke up to 3 concurrent `Recursive Domain Researcher` subagents.
5. Manage Queue — As subagents complete, spawn new ones for remaining Core Domains.
6. Assemble Bottom-up Context — Aggregate sub-contexts and extract auxiliary signatures.
7. Apply & Save root context.md — Save while preserving developer notes.
8. Stage and Commit — Add context.md files to staging and commit.

## Document Structure Template

Generated `context.md` files must follow this template:

````markdown
# [Domain Name] Context

## 1. Role and Purpose
- [Describe domain role]

## 2. Core Sub-domains
- [[Sub-domain A](file:///path/to/A/context.md)]: [Short description of Sub-domain A]

## 3. Shared Assets & Helpers
### Hooks (hooks/)
- `useCustomHook(param: Type) => ReturnType`: [Hook description]
### Utilities (utils/)
- `helperFunction(arg: Type) => ReturnType`: [Utility description]
### Types & Interfaces (types/)
- `interface CustomData`: [Type description]

## 4. Directory Structure (Max Depth 3)
```
[directory tree structure]
```
````
