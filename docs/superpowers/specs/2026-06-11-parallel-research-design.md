# Design Spec: Parallel Isolated Research with Pattern Filtering

## 1. Background & Objectives
- **Problem**: The current single-agent sequential research workflow easily falls into the "DFS Trap," analyzing unnecessary styling/presentation files, resulting in bloated context windows (e.g., 144 steps), high token costs, and agent hangs.
- **Objective**: 
  - Restructure the `research` skill to execute Depth-1 core domain analysis using **up to 3 parallel subagents** with isolated contexts.
  - Separate control flow logic from filtering policies by introducing a referenced `filtering-rules.md` file.
  - Implement strict pattern-based glob filtering and logic-only heuristics to minimize read overhead.

## 2. File Organization
- **Workflow Control**: [SKILL.md](file:///Users/sunub/workspace/for-digital-divide/.agents/skills/research/SKILL.md)
  - Focuses on orchestration, change severity computation, delegation queue (max 3 concurrent), step caps (max 15 steps per subagent), and root consolidation.
- **Filtering Policy**: [filtering-rules.md](file:///Users/sunub/workspace/for-digital-divide/.agents/skills/research/references/filtering-rules.md) (New)
  - Defines the inclusion/exclusion glob patterns and code heuristics used by subagents to identify logic-rich files vs. visual/styling files.

## 3. Detailed Specifications

### A. Parallel Orchestration (Control Flow)
1. **Scanning**: Main agent scans Depth-1 subdirectories.
2. **Classification**:
   - **Core Domains**: Added to the parallel delegation queue.
   - **Auxiliary Domains**: Inlined directly by the main agent without spawning subagents.
3. **Concurrency Control**:
   - The main agent uses the `invoke_subagent` tool with an array of up to 3 subagents concurrently.
   - Example call format:
     ```json
     {
       "Subagents": [
         { "TypeName": "self", "Role": "Recursive Domain Researcher", "Prompt": "TargetDirectory: path/to/domain1..." },
         { "TypeName": "self", "Role": "Recursive Domain Researcher", "Prompt": "TargetDirectory: path/to/domain2..." },
         { "TypeName": "self", "Role": "Recursive Domain Researcher", "Prompt": "TargetDirectory: path/to/domain3..." }
       ]
     }
     ```
   - When a subagent finishes, the main agent schedules the next pending domain from the queue until all are analyzed.
4. **Consolidation**: Once all subagents report `DONE`, the main agent merges their outputs to build the root `context.md`.

### B. Pattern Filtering & Heuristics (Policy)
- **Glob Filters**:
  - Include: `**/*.{ts,tsx,js,jsx}`
  - Exclude: `**/*.css.{ts,js}`, `**/*.{css,scss,sass,less}`, `**/*.{test,spec}.{ts,tsx}`, `**/*.stories.{ts,tsx}`, `**/*.d.ts`
- **Logic Heuristics**:
  - Prioritize: Server actions (`"use server"`), stateful hooks (`useState`, `useEffect`, Jotai, Zustand), router entries (`page.tsx`, `layout.tsx`), and data interfaces (Zod schemas, types).
  - Ignore: Stateless design-only wrappers (icons, decorative cards, simple containers).

### C. Guardrails
- **Step Cap**: Subagents must halt and report status (`DONE_WITH_CONCERNS`) if they hit a hard limit of **15 execution steps**.
- **Execution Isolation**: Subagents are strictly isolated to their target folder write paths.

---
*Created on: 2026-06-11 | Author: Senior AI Engineer | Status: Proposed*
