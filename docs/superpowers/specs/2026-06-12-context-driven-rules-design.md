# Design Specification: Context-Driven Exploration Rule Enhancement

## 1. Role and Purpose
- To optimize token usage and latency during AI agent operations by strictly limiting unnecessary file reading in subdirectories with existing `context.md` documentation.
- To prevent compilation/type-mismatch errors and resolve deadlocks by defining a clear boundary between the **Exploration Phase** and the **Implementation Phase**, along with an **Escape Hatch** for outdated/empty contexts.

## 2. Detailed Specification

### Updated GEMINI.md Rule
The existing rules inside [GEMINI.md](file:///Users/sunub/workspace/for-digital-divide/GEMINI.md) will be updated as follows:

```diff
-    <rule name="Context-Driven Exploration Only">
-      When exploring subdirectories, if an existing `context.md` (or equivalent context file) is found, you MUST NOT read individual source code files (.ts, .js, etc.).
-      Instead, rely solely on the data inside `context.md` to understand the sub-tree layout, types, and purposes, using this information to build up the wider system context bottom-up.
-    </rule>
+    <rule name="Context-Driven Exploration Only">
+      When exploring subdirectories, if an existing `context.md` (or equivalent context file) is found, you MUST NOT read individual source code files (.ts, .tsx, .js, .jsx, .css.ts, .prisma, etc.) during the initial analysis/exploration phase.
+      Instead, rely solely on the data inside `context.md` to understand the sub-tree layout, types, and purposes, using this information to build up the wider system context bottom-up.
+
+      Exceptions and Gates:
+      1. [Implementation Phase]: During actual code modification, you are permitted to read only the specific source files you are explicitly assigned to modify, along with their direct dependency interfaces.
+      2. [Escape Hatch]: If the `context.md` is empty, lacks critical type definitions, or is determined to be outdated (e.g. mismatching the actual file list), you may read the minimal necessary entry or configuration files to bridge the gap. However, you MUST prioritize updating and sync-saving the `context.md` with the latest state before proceeding.
+    </rule>
```

## 3. Key Scenarios
1. **Initial Exploration (Token-saving)**:
   - When an agent navigates directories to get system context, it sees `context.md`.
   - It stops reading `.ts`, `.tsx`, `.prisma` etc., using only `context.md` to map dependencies.
2. **Implementation (Verification)**:
   - When code needs to be modified, the agent reads only the targets of modification to implement actual changes.
3. **Outdated Documentation (Self-Correction)**:
   - If `context.md` has not been updated and causes a mismatch, the agent reads minimal config files, updates the `context.md` first, and proceeds with the primary task.
