# Domain Research Filtering Rules

To minimize token cost and avoid the "DFS Trap" (unnecessary full tree traversal), all subagents must strictly adhere to the following file-reading constraints.

## 1. File Glob Filter Patterns

Subagents are permitted to view and inspect files only if they match the inclusion criteria and do not match the exclusion patterns.

* **Inclusion Patterns**:
  * `**/*.{ts,tsx,js,jsx}` (TypeScript/JavaScript source files)
* **Exclusion Patterns (NEVER read these files)**:
  * Styling/Design: `**/*.css.{ts,js}`, `**/*.{css,scss,sass,less}` (**Exception**: Allowed only when the explicit goal is to analyze the Design System structure)
  * Tests and Stories: `**/*.{test,spec}.{ts,tsx}`, `**/*.stories.{ts,tsx}`
  * Declarations: `**/*.d.ts`

## 2. Structural & Logic-Only Heuristics

Before calling `view_file` on any matched source file, verify it serves one of the following logic-rich purposes:
* **Logic & Flow**: Contains stateful hooks (`useState`, `useEffect`, Jotai, Zustand), router entry points (`page.tsx`, `layout.tsx`, `route.ts`), or server-side actions (`"use server"`).
* **Data Schemes**: Defines schemas, types, interfaces, or database connections.
* **Design System Structure**: Files that define global tokens, theme configurations, component variants, or base styling rules necessary to understand the design system infrastructure.
* **Ignore Visual-Only Files**: Skip any stateless presentation component that only accepts props to render HTML elements, icons, or visual styles (unless analyzing the core design system components).
