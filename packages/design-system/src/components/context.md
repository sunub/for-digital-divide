# Components Context

## 1. Role and Purpose
- Defines the core design system component library for "For-digital-divide", built using vanilla-extract and Framer Motion (motion). It provides highly customizable, performant, and interactive UI components shared across the monorepo web applications.

## 2. Core Sub-domains
- None (this is a flat directory of reusable presentation and interactive UI components).

## 3. Shared Assets & Helpers

### Components
- [AppLink](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/components/AppLink.tsx#L21): A polymorphic anchor component that can act as a Slot via Radix UI, supporting standard and standout variations with customizable hover colors.
- [Backdrop](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/components/Backdrop.tsx#L22): A fixed fullscreen overlay with customizable backdrop blur intensity (soft, medium, etc.) using vanilla-extract styling.
- [Button](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/components/Button.tsx#L57): A highly customizable button supporting various variants, sizes, fonts, and a custom `pending` state that renders a blocks-based loading animation. It also supports polymorphism using Radix UI's Slot.
- [ButtonGroup](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/components/ButtonGroup.tsx#L12): A container component that groups and aligns multiple buttons horizontally or vertically.
- [InteractiveCard](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/components/InteractiveCard.tsx#L14): A client-side card component that tracks the mouse pointer coordinates to drive an interactive spotlight effect.
- [Surface](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/components/Surface.tsx#L15): A generic layout box serving as a background container with customizable tones, elevation shadows, borders, and paddings.
- [Text](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/components/Text.tsx#L13): A wrapper component utilizing the `Box` primitive to render typography elements (defaults to `p`) with predefined design system text variants.
- [ThreeDButton](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/components/ThreeDButton.tsx#L125): A custom interactive 3D-style button built with motion support (Framer Motion) that exhibits micro-animations, a pressed visual state, custom status handling (e.g. pending state animations), and optional highlighting ripple waves.

### Types & Interfaces
- [AppLinkProps](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/components/AppLink.tsx#L10): Props interface extending standard anchor tag props to customize standout state colors, underline, and variant type.
- [BackdropProps](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/components/Backdrop.tsx#L8): Props interface extending the `Box` primitive properties to manage backdrop blur depth.
- [ButtonProps](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/components/Button.tsx#L55): Union type of `NativeButtonProps` (standard HTML button with styling recipes and status states) and `SlottableButtonProps` (polymorphic Radix Slot version).
- [ButtonStatus](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/components/Button.tsx#L28): Represents the visual states of the button (`"idle"` or `"pending"`).
- [ButtonGroupProps](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/components/ButtonGroup.tsx#L6): Props for the button group supporting horizontal or vertical orientation.
- [InteractiveCardProps](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/components/InteractiveCard.tsx#L7): Props interface extending standard div attributes, supporting hover hints and content class overrides.
- [SurfaceProps](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/components/Surface.tsx#L9): Interface defining custom background tone and elevation shadow layers.
- [TextProps](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/components/Text.tsx#L8): Props defining typography elements and styling variant keys.
- [ThreeDButtonProps](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/components/ThreeDButton.tsx#L19): Props extending custom element properties with motion-specific configuration.
- [ThreeDButtonStatus](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/components/ThreeDButton.tsx#L10): Represents the states of the 3D button (`"idle"`, `"pending"`, `"resolved"`, `"rejected"`).

## 4. Directory Structure (Max Depth 3)
```
.
├── AppLink.css.ts
├── AppLink.stories.tsx
├── AppLink.tsx
├── Backdrop.css.ts
├── Backdrop.tsx
├── Button.css.ts
├── Button.stories.tsx
├── Button.tsx
├── ButtonGroup.css.ts
├── ButtonGroup.tsx
├── InteractiveCard.css.ts
├── InteractiveCard.stories.tsx
├── InteractiveCard.tsx
├── Surface.css.ts
├── Surface.stories.tsx
├── Surface.tsx
├── Text.css.ts
├── Text.stories.tsx
├── Text.tsx
├── ThreeDButton.css.ts
├── ThreeDButton.stories.tsx
├── ThreeDButton.tsx
└── index.ts
```
