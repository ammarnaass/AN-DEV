---
name: Cybernetic Precision
colors:
  surface: '#0B1430'
  surface-dim: '#0f1321'
  surface-bright: '#353849'
  surface-container-lowest: '#0a0d1c'
  surface-container-low: '#171b2a'
  surface-container: '#1b1f2e'
  surface-container-high: '#262939'
  surface-container-highest: '#303444'
  on-surface: '#dfe1f6'
  on-surface-variant: '#c2c6d8'
  inverse-surface: '#dfe1f6'
  inverse-on-surface: '#2c303f'
  outline: '#8c90a1'
  outline-variant: '#424655'
  surface-tint: '#b1c5ff'
  primary: '#b1c5ff'
  on-primary: '#002c70'
  primary-container: '#0d6efd'
  on-primary-container: '#ffffff'
  inverse-primary: '#0057ce'
  secondary: '#95dbff'
  on-secondary: '#003548'
  secondary-container: '#14c4ff'
  on-secondary-container: '#004d67'
  tertiary: '#ffb599'
  on-tertiary: '#5a1c00'
  tertiary-container: '#cf4b00'
  on-tertiary-container: '#ffffff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dae2ff'
  primary-fixed-dim: '#b1c5ff'
  on-primary-fixed: '#001946'
  on-primary-fixed-variant: '#00419e'
  secondary-fixed: '#c1e8ff'
  secondary-fixed-dim: '#73d1ff'
  on-secondary-fixed: '#001e2b'
  on-secondary-fixed-variant: '#004d67'
  tertiary-fixed: '#ffdbce'
  tertiary-fixed-dim: '#ffb599'
  on-tertiary-fixed: '#370e00'
  on-tertiary-fixed-variant: '#7f2b00'
  background: '#0f1321'
  on-background: '#dfe1f6'
  surface-variant: '#303444'
  surface-elevated: '#101D42'
  line: '#1A2850'
  line-subtle: '#121E3E'
  text-primary: '#E6E6E6'
  text-muted: '#8D99B3'
  status-ok: '#00E5A3'
  status-warn: '#FFB020'
  status-err: '#FF486A'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 52px
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 42px
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
  code-block:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-sm: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies high-tier software engineering, developer-centric precision, and modern algorithmic authority tailored for an Algerian and global technological presence. The personality is sharp, dependable, disciplined, and visionary.

The aesthetic fuses **Corporate Technical Modernism** with subtle **Cybernetic Glassmorphism**:
- Deep cosmic slate canvas layers that eliminate visual fatigue.
- Restrained cyan luminescence and electric cobalt highlights that direct operational focus.
- Bi-directional architectural clarity (RTL primary for Arabic, LTR seamless support for Latin/code environments).
- Geometric structural integrity via razor-sharp 1px boundary lines, controlled radii, and data-dense layouts.

## Colors

The color palette establishes an uncompromising dark-mode architecture built on depth, optical contrast, and selective neon luminescence.

- **Primary (`#0D6EFD`)**: Vibrant cobalt blue commanding primary user flows, state activations, and focal interactive anchors.
- **Secondary / Accent (`#00C3FF`)**: Electric cyan used strictly for precision markers, metrics, active glowing indicators, and code accents.
- **Neutral Canvas (`#050816`)**: An ultra-deep indigo-tinted void functioning as the default view background.
- **Surfaces (`#0B1430`, `#101D42`)**: Structured mid-tier layers designed for panels, elevated data containers, and modal sheets.
- **Line Tokens (`#1A2850`, `#121E3E`)**: Structural dividers and containment borders that preserve architecture without relying on muddy dark shadows.
- **Text Layers**: High-legibility off-white (`#E6E6E6`) maintains AA/AAA contrast ratios against dark containers; muted slate (`#8D99B3`) governs secondary data, labels, and code metadata.

## Typography

The typographic hierarchy is engineered for dual-mode technical fluency:

- **Arabic Context (RTL)**: `Cairo` acts as the primary systemic Arabic typeface across all visual weights, pairing natural mechanical strokes with high legibility in dense Arabic technical vocabulary.
- **Latin & Universal Engineering Context**: `Space Grotesk` governs primary display headings with technical, geometric tension. `Inter` provides high-density, neutral body text. `JetBrains Mono` manages codeblocks, terminal logs, data metrics, and technical labels.
- RTL alignments strictly apply reversed letter-spacing considerations (letter-spacing is set to normal or slightly tighter for Arabic script to prevent ligatures breaking, while monospace retains fixed metrics).

## Layout & Spacing

A disciplined 8-point base grid governs vertical and horizontal rhythm. The system enforces strict architectural alignment:

- **Grid Strategy**: Fluid 12-column grid on desktop screens (`1280px+`), scaling to 8 columns on tablet displays (`768px - 1024px`), and transitioning to a continuous single/dual-column fluid grid on mobile (`< 768px`).
- **Margins & Gutters**: Outer viewport margins lock to `2rem` (desktop) and `1rem` (mobile). Gutters enforce `1.5rem` on desktop and `1rem` on compact displays.
- **RTL Sizing Inversion**: All layout flows, flex directions, padding offsets, and margin margins invert logically using CSS logical properties (`margin-inline-start`, `padding-inline-end`).

## Elevation & Depth

Rather than relying on heavy, fuzzy drop shadows that compromise clean dark interfaces, depth is expressed through **Tonal Boundary Layering** combined with **Low-Contrast Structural Outlines** and **Micro-Glow Diffusions**:

1. **Ground Base (`#050816`)**: Canvas plane; zero elevation.
2. **Surface Tier (`#0B1430`)**: Standard modular cards, sidebars, and panels. Defined by a crisp 1px stroke of `Line (#1A2850)`.
3. **Elevated Tier (`#101D42`)**: Popovers, active dropdowns, hover card states, and floating toolbars. Reinforced with 1px `rgba(0, 195, 255, 0.25)` top-line highlights.
4. **Neon Accent Radiance**: Interactive focal items (such as active CTAs or live terminal indicators) deploy subtle localized radial diffusion: `box-shadow: 0 0 20px -4px rgba(0, 195, 255, 0.35)`.
5. **Glass Paneling**: Modal backdrops and pinned headers use `backdrop-filter: blur(12px)` over `rgba(11, 20, 48, 0.75)` with a solid `#1A2850` partition boundary.

## Shapes

The geometric form factor strikes a balance between aerodynamic modernism and technical discipline:

- Containers, cards, dialog windows, and terminal panels utilize an intermediate curvature range of **10px to 14px** (mapped through token tier `2`).
- Compact controls (buttons, input fields, badges) normalize at **8px to 10px**.
- Pill rounding is reserved exclusively for operational status badges, notification pips, and toggle tracks.
- Every container boundary carries an explicit 1px stroke (`Line: #1A2850`), reinforcing physical structural bounds.

## Components

### Buttons
- **Primary**: Solid background `#0D6EFD`, label `#FFFFFF`, border `transparent`, radius `10px`. Hover initiates a gradient shift toward `#00C3FF` and a subtle neon bloom (`box-shadow: 0 0 16px rgba(13, 110, 253, 0.4)`).
- **Secondary / Technical**: Background `#0B1430`, 1px border `#1A2850`, label `#E6E6E6`. On hover, border illuminates to `#00C3FF` with label highlighting.
- **Ghost / Code Action**: Background `transparent`, border `transparent`, text `#8D99B3`. Hover transitions text to `#00C3FF` and background to `rgba(26, 40, 80, 0.3)`.

### Inputs & Fields
- Height `44px`, background `#0B1430`, border `1px solid #1A2850`, corner radius `10px`, font `Inter` or `Cairo`, text `#E6E6E6`.
- Focus state: Outline disabled; border transitions to `#00C3FF` with an inner/outer neon line wash `0 0 0 1px #00C3FF, 0 0 12px -2px rgba(0, 195, 255, 0.3)`.
- Helper & Validation Text: Rendered in `label-sm` with semantic colors (`#00E5A3` for valid, `#FF486A` for invalid).

### Cards & Modular Panels
- Background `#0B1430`, structural border `1px solid #1A2850`, corner radius `14px`, internal padding `space-lg`.
- Top-edge micro gradient: subtle inner 1px gradient line across card headers using `linear-gradient(90deg, rgba(0, 195, 255, 0.4) 0%, transparent 60%)`.

### Chips & Terminal Tags
- Height `24px` to `28px`, radius `6px` to `8px`, typography `label-sm` (Monospace).
- Inactive: background `rgba(26, 40, 80, 0.5)`, text `#8D99B3`, border `1px solid #1A2850`.
- Active / Live: background `rgba(0, 195, 255, 0.1)`, text `#00C3FF`, border `1px solid rgba(0, 195, 255, 0.4)`.

### Checkboxes & Radios
- Dimensions `18px × 18px`, radius `4px` (checkbox) / `50%` (radio).
- Surface `#0B1430`, stroke `1px solid #1A2850`. Active state triggers background `#0D6EFD` with electric cyan (`#00C3FF`) checkmark and pulse glow.

### Code Displays & Terminal Panels
- Surface `#050816`, boundary `1px solid #1A2850`, internal radius `12px`, typography `JetBrains Mono` (`code-block`).
- Header bar includes traffic light indicators (`#FF486A`, `#FFB020`, `#00E5A3`) aligned opposite to the document flow (left on LTR, right on RTL).