# For-Digital-Divide Global Context

This repository is a monorepo for "For-digital-divide", encompassing the frontend, backend, and a shared design system with its own MCP server for AI-assisted development.

## Language

**Progressive Fallback**:
A 3-step strategy (Shallow Inference -> Scoped Search -> Actionable Prompting) used by the AI agent to resolve ambiguous design system queries autonomously before interrupting the developer.
_Avoid_: Human-in-the-loop, constant prompting, manual disambiguation

**MCP Server (Design System)**:
A Model Context Protocol server that dynamically loads AST-parsed component metadata and theme tokens, enabling AI agents to read and apply precise design specifications contextually.
_Avoid_: Design system docs, Storybook (in the context of AI reads)

**D3 Controller Pattern**:
An architectural pattern that encapsulates imperative D3.js SVG manipulation and high-frequency coordinate calculation logic within a vanilla JS/TS class, exposing a declarative update interface to React to prevent rendering bottlenecks and Layout Shifts.
_Avoid_: Direct D3 DOM manipulation inside React render lifecycle, frequent React state updates on mouse move

**CSS-Variable Styling for D3**:
The practice of binding CSS Custom Properties (`var(--...)`) directly to D3 SVG stroke/fill properties instead of hardcoded hex values, allowing theme transitions (such as dark mode) to be rendered instantly by the browser engine without JS repaint overhead.
_Avoid_: Hex color hardcoding inside visualization scripts, React re-render for charting themes

**TransferService**:
A dedicated orchestration component responsible for executing financial transfers across multiple accounts within a single ACID transaction. It enforces pessimistic locking (`FOR UPDATE`) to ensure absolute data integrity and applies PK-based lock ordering to prevent deadlocks.
_Avoid_: Updating balances directly in `accounts.repository.ts`, relying on application-level read-modify-write without row locks.
