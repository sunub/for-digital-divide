# Intro Domain Context

This document provides a concise overview of the directory structure, purpose, core components, and styling mechanisms used within the `intro` domain.

## Directory Structure

```text
frontend/src/app/intro/
├── intro-2026-06-11-context.md  # Domain context documentation
├── page.css.ts                  # Styles for the intro page (vanilla-extract)
├── page.tsx                     # Main page component for the /intro route
└── ui/                          # Sub-components directory
    ├── SmallPhone.css.ts        # Styles and recipes for SmallPhone
    ├── SmallPhone.tsx           # 3D interactive smartphone component
    ├── SmallPhoneLoading.tsx    # Loading indicator inside the virtual phone
    └── SmallPhoneSvg.tsx        # Vector representation of the smartphone mock
```

## Domain Overview & Purpose

The `intro` domain serves two distinct responsibilities:
1. **Financial Certificate Issuance Guide (`/intro` Route)**: Provides an onboarding flow designed for digitally vulnerable users. It guides them through why a certificate is necessary and details the subsequent steps of the process.
2. **Interactive 3D Smartphone (`ui/SmallPhone`)**: A reusable component that models a smartphone in 3D space using [framer-motion](https://www.framer.com/motion/). Although structured inside `intro/ui`, this component is currently imported and controlled by the landing/home page ([page.tsx](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/page.tsx)) to animate (tilt and scale up) when the user hovers over the "Get Started" (시작하기) button.

---

## Core Components

### 1. [IntroPage](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/intro/page.tsx)
* **Description**: Renders the complete `/intro` page. It utilizes a split-pane layout (Grid) with instructions on the left and a mock mobile preview frame on the right.
* **Layout Structure**:
  * Left Panel: [Instruction.Panel](file:///Users/sunub/workspace/for-digital-divide/frontend/src/components/Instruction/InstructionPanel.tsx) displaying:
    * `InformationGuide`: Explains the security benefit of financial certificates.
    * `StepGuide`: Lists step-by-step phases following certificate issuance.
  * Right Panel: [Device.Frame](file:///Users/sunub/workspace/for-digital-divide/frontend/src/shared/layout/index.ts) embedding a simulated mobile banking UI featuring quick value propositions and navigation actions.
* **Key Interactions**:
  * Clicking **"인증서 발급하기" (Issue Certificate)** records the current route in session history via `useHistory().add()` and pushes the user to `/login`.
  * Clicking **"나중에 발급할게요" (Cancel)** redirects the user back to the landing page `/`.

### 2. [SmallPhone](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/intro/ui/SmallPhone.tsx)
* **Description**: An interactive mock mobile phone using `motion.div`.
* **Props**:
  ```typescript
  interface SmallPhoneProps {
    isOpen: boolean;
  }
  ```
* **Variants & Animations**:
  * `closed`: Tilted, 3D angled view (`rotateX: 66, rotateZ: 45, scale: 1`).
  * `open`: Straight, scaled-up view (`rotateX: 0, rotateZ: 0, scale: 2.5`).
* **Sub-components**:
  * [SmallPhoneSvg](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/intro/ui/SmallPhoneSvg.tsx): Embeds the vector SVG representing the physical phone shape and display.
  * [SmallPhoneLoading](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/intro/ui/SmallPhoneLoading.tsx): Renders a loading spinner over the screen when `isOpen` is active.

---

## Styling & Animations

The styling is implemented via `@vanilla-extract/css` (and `@vanilla-extract/recipes`), compiling TypeScript files into static CSS.

### 1. [page.css.ts](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/intro/page.css.ts)
* Defines page layouts, feature cards (`featureCard`), and primary action buttons.
* Key Animation: `pulseCircle` – soft pulse animation keyframe applying `scale` and `opacity` changes on the certificate badge to guide the user's attention.

### 2. [SmallPhone.css.ts](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/intro/ui/SmallPhone.css.ts)
* Contains styling definitions for the 3D phone model and its inner viewport.
* Key Features:
  * `layerColorsVar`: CSS Custom Property used to map a multi-layered OKLCH shadow for the 3D depth effect.
  * `screenBrighter` keyframes: Simulates a screen brightness flash loop when the phone is closed.
  * `phone`, `icon`, `screen`: Component style recipes controlling variant behaviors based on the `isOpen` state.
