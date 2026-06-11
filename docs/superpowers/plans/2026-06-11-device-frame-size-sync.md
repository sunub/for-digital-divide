# Device Frame Size Sync Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Synchronize the size of DeviceFrame with SmallPhone (open state) responsively using design system tokens and CSS custom properties without CLS.

**Architecture:** We will declare `deviceWidth` and `deviceHeight` theme tokens in `@internal/design-system` mapped to `--device-width` and `--device-height` CSS variables. We will define responsive values for these CSS variables in `globals.css` using container queries. Then, we will update `DeviceFrame` to use these tokens, and calculate `SmallPhone`'s size automatically from them.

**Tech Stack:** Next.js (app router), Vanilla-Extract CSS, TypeScript, pnpm (monorepo).

---

### Task 1: Add deviceWidth and deviceHeight to Design System Tokens

**Files:**
- Modify: `packages/design-system/src/tokens/theme.css.ts`

- [ ] **Step 1: Add tokens to theme contract**
  Modify [theme.css.ts](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/tokens/theme.css.ts) to define the new tokens inside the `size` property of the theme object.

  ```typescript
  // Find "size" object around line 233 and replace with:
    size: {
      phone: "376px",
      numpad: "40px",
      button: "100px",
      deviceWidth: "var(--device-width, 437.5px)",
      deviceHeight: "var(--device-height, 875px)",
    },
  ```

- [ ] **Step 2: Build the design system package**
  Run: `pnpm --filter @internal/design-system build`
  Expected output: Build completes successfully and generates `dist` files including type definitions.

- [ ] **Step 3: Commit**
  Run:
  ```bash
  git add packages/design-system/src/tokens/theme.css.ts
  git commit -m "feat(design-system): add deviceWidth and deviceHeight size tokens"
  ```

---

### Task 2: Configure Responsive CSS Variables in Globals CSS

**Files:**
- Modify: `frontend/src/app/globals.css`

- [ ] **Step 1: Declare responsiveness for device frame size**
  Modify [globals.css](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/globals.css) to set the custom properties in `:root` and calculate `--intro-phone-height` directly from `--device-height`.

  ```css
  /* Find :root block around line 25, add --device-width/--device-height, and replace --intro-phone-height */
  :root {
    /* ... */
    --device-width: 437.5px;
    --device-height: 875px;
    --intro-phone-height: calc(var(--device-height) / 2.5);
  }
  ```

- [ ] **Step 2: Add responsive height-based override**
  Add a container query inside [globals.css](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/globals.css) to scale down the device width/height when the container height is small.

  ```css
  /* Add this override block */
  @container devsite-content (height < 1035px) {
    :root {
      --device-width: 312.5px;
      --device-height: 625px;
    }
  }
  ```

- [ ] **Step 3: Remove redundant media queries**
  Remove the duplicate `--intro-phone-height` override inside the `@container devsite-content (height < 1035px)` block in [globals.css](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/globals.css) (around line 377), since it is now automatically computed from `--device-height`.

  ```css
  /* Find and remove: */
  --intro-phone-height: 250px;
  ```

- [ ] **Step 4: Commit**
  Run:
  ```bash
  git add frontend/src/app/globals.css
  git commit -m "style(frontend): define responsive device variables in globals.css"
  ```

---

### Task 3: Apply Design System Tokens to DeviceFrame Container

**Files:**
- Modify: `frontend/src/shared/layout/style/layout.css.ts`

- [ ] **Step 1: Replace container dimensions with design system tokens**
  Modify [layout.css.ts](file:///Users/sunub/workspace/for-digital-divide/frontend/src/shared/layout/style/layout.css.ts) to set the container width and height to the design system size tokens, removing the old conflicting min/max width and height properties.

  ```typescript
  // Find "container" styles around line 108 and replace with:
  export const container = style({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: vars.size.deviceWidth,
    height: vars.size.deviceHeight,
    flexShrink: 0,
    borderRadius: "40px",
    overflow: "hidden",
    zIndex: 100,
  });
  ```

- [ ] **Step 2: Commit**
  Run:
  ```bash
  git add frontend/src/shared/layout/style/layout.css.ts
  git commit -m "refactor(layout): bind DeviceFrame container size to design system tokens"
  ```

---

### Task 4: Monorepo Build and Verification

**Files:**
- Verify: Whole project build

- [ ] **Step 1: Build the entire monorepo**
  Run: `pnpm build`
  Expected output: Build completes successfully across both frontend and backend.

- [ ] **Step 2: Commit**
  Run:
  ```bash
  git commit --allow-empty -m "chore: verify build successful after device frame sync"
  ```
