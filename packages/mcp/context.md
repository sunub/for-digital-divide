# Design System MCP Context

## 1. Role and Purpose
- This package implements a Model Context Protocol (MCP) server that provides AI agents with read access and search utilities for the design system's tokens and React components.
- It also supports refreshing the compiled design system metadata on-demand using the `refresh_mcp_data` tool.

## 2. Core Sub-domains
- [src/tools](file:///Users/sunub/workspace/for-digital-divide/packages/mcp/src/tools): Contains individual tool implementations mapped to the Model Context Protocol.

## 3. Shared Assets & Helpers
### Utilities (utils/)
- `loadData() => void`: Dynamically loads theme tokens and components metadata JSON files from the design system's `dist/` folder.
- `designSystemData`: An object with getters for `tokens`, `components`, and the `designSystemRoot` path.

### Types & Interfaces (types/)
- `interface McpTool<T extends z.ZodRawShape>`: Structure for registering a tool on the MCP server.
- `interface TokenCategoryData`: Mapping of token names to their values or records.
- `interface TokensData`: Mapping of categories to token data.
- `interface ComponentPropInfo`: Info about a component property (type, description, default).
- `interface ComponentInfo`: Metadata for a specific React component.
- `interface ComponentsData`: Mapping of component names to component info.

## 4. Directory Structure (Max Depth 3)
```
packages/mcp/
├── package.json
├── tsconfig.json
└── src/
    ├── data.ts
    ├── index.ts
    ├── server.ts
    └── tools/
        ├── category.ts
        ├── get_component_detail.ts
        ├── get_theme_tokens.ts
        ├── index.ts
        ├── refresh_mcp_data.ts
        ├── search_components.ts
        ├── suggest_sprinkles_match.ts
        └── types.ts
```
