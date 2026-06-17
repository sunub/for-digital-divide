# Design System Package Context

## 1. Role and Purpose
- **Design System Core**: This package is the centralized, monorepo-wide Design System for the "For-digital-divide" project. It is built using **Vanilla-Extract CSS** for type-safe styles, **Radix UI** for accessible primitives, and **motion** (Framer Motion) for highly interactive, polished micro-animations.
- **Mobile-to-PC Simulators**: Provides responsive styling primitives and layout wrappers designed to match mobile UI structures rendered within desktop frames.
- **AI-Agent & MCP Integration**: Houses the metadata compilation system. When running `pnpm build:mcp`, it parses token values and component stories using the TypeScript Compiler API (AST) to generate JSON datasets in the `dist/` directory:
  - `dist/mcp-tokens.json`: Compiled theme variables and Sprinkles utilities.
  - `dist/mcp-components.json`: Metadata for React components, including prop types, descriptions, import paths, and story examples.
  - These JSON outputs are dynamically loaded by the [MCP Server](file:///Users/sunub/workspace/for-digital-divide/packages/mcp/context.md) to answer design queries and suggest code mappings to AI agents.

---

## 2. Core Sub-domains

### [Tokens (src/tokens)](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/tokens)
- Core brand foundations defining colors, spacing, typography sizes, shadows, border radii, and custom responsive breakpoints. Contains:
  - [theme.css.ts](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/tokens/theme.css.ts): Vanilla-extract theme contract and standard variables (`vars`).

### [Styles & Layout Utilities (src/styles)](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/styles)
- Type-safe, low-level layout constructs and styling utilities.
  - [sprinkles.css.ts](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/styles/sprinkles.css.ts): atomic CSS classes (properties like color, padding, display, and shorthands).
  - [Flex.css.ts](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/styles/Flex.css.ts) & [Grid.css.ts](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/styles/Grid.css.ts): Style definitions for display layout primitives.

### [Primitives (src/primitives)](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/primitives)
- Highly reusable semantic HTML foundations using vanilla-extract sprinkles.
  - [Box](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/primitives/Box.tsx): The primary structural building block supporting polymorphism.
  - [Flex](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/primitives/Flex.tsx): Flexbox layout wrapper.
  - [Grid](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/primitives/Grid.tsx): Grid layout wrapper.

### [Components (src/components)](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/components)
- Rich UI elements and complex interactives built on top of the primitives.
- Includes its own subfolder [context.md](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/components/context.md) documenting details for individual components (`Button`, `ThreeDButton`, `InteractiveCard`, `AppLink`, `Badge`, `TextField`, etc.).

### [Patterns (src/patterns)](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/patterns)
- Specialized higher-level layout sections.
  - [Stack](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/patterns/Stack.tsx): Spaced row/column layouts.
  - [PageGridSection / PageFlexSection](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/patterns/PageGridSection.tsx): Container-wrapped sections.

---

## 3. Shared Assets & Helpers

### Hooks (src/hooks/)
- `useIsMounted() => boolean`: Hook checking if the React component has safely mounted on the client-side to prevent hydration mismatches.

### Build Scripts
- [build.ts](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/build.ts): Compiles and minifies CSS outputs using `lightningcss`.
- [scripts/build-mcp-data.ts](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/scripts/build-mcp-data.ts): Parses TS AST to extract component properties, descriptions, and story patterns to export JSON files for MCP consumption.

---

## 4. Directory Structure (Max Depth 3)
```
packages/design-system/
├── package.json
├── tsconfig.json
├── tsup.config.ts
├── build.ts
├── scripts/
│   └── build-mcp-data.ts
├── dist/                          <- Generated compiled assets & JSON files
│   ├── mcp-tokens.json            <- Shared metadata for MCP server
│   └── mcp-components.json        <- Shared metadata for MCP server
└── src/
    ├── docs/
    ├── hooks/
    ├── tokens/
    ├── styles/
    ├── primitives/
    ├── patterns/
    └── components/
```
