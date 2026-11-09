---
name: Cybernetic Blueprint
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#424655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#727787'
  outline-variant: '#c2c6d8'
  surface-tint: '#0057ce'
  primary: '#0057cd'
  on-primary: '#ffffff'
  primary-container: '#0d6efd'
  on-primary-container: '#ffffff'
  inverse-primary: '#b1c5ff'
  secondary: '#006398'
  on-secondary: '#ffffff'
  secondary-container: '#5bb8fe'
  on-secondary-container: '#00476e'
  tertiary: '#565e74'
  on-tertiary: '#ffffff'
  tertiary-container: '#6f768d'
  on-tertiary-container: '#ffffff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2ff'
  primary-fixed-dim: '#b1c5ff'
  on-primary-fixed: '#001946'
  on-primary-fixed-variant: '#00419e'
  secondary-fixed: '#cce5ff'
  secondary-fixed-dim: '#93ccff'
  on-secondary-fixed: '#001d31'
  on-secondary-fixed-variant: '#004b73'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-mobile:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: '0'
  title-md:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: '0'
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: '0'
  body-md:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: '0'
  body-sm:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: '0'
  label-tech:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.06em
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
  gutter-lg: 2rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an architectural, high-precision visual language engineered for modern software systems. Rooted in the visual economy of computer-aided drafting (CAD), schematic blueprints, and high-performance developer tooling, the aesthetic rejects superficial ornamentation in favor of structural clarity, mechanical rhythm, and deliberate data density.

The interface evokes calculated confidence, technical rigor, and zero-latency operational control. Its audience consists of engineering leads, system architects, and technical decision-makers who evaluate tools by signal-to-noise ratio, legibility under complex workflows, and structural integrity. 

Visual characteristics include:
- **Hairline gridlines and structural datum lines** defining layout zones.
- **Micro-monospaced labels** providing contextual telemetry, coordinate tracking, and status monitoring.
- **High-contrast hierarchy** pairing deep slate typography with luminous electric blue accents on an engineered, ultra-clean neutral surface.
- **Subtle technical accents** such as coordinate markers, crosshair intersections, and precise segmented indicators.

## Colors

The system uses an engineered light-mode palette inspired by technical schematics and precision measurement equipment. High-contrast legibility is maintained across all surface levels.

### Roles and Application
- **Primary Accent (`#0D6EFD`)**: Used strictly for interactive focal points, primary action triggers, active tabs, and key navigational vectors.
- **Secondary Accent (`#0284C7`)**: Applied to telemetry tags, branch status indicators, technical milestones, and secondary structural accents.
- **Tertiary / Base Charcoal (`#0F172A`)**: The anchor hue for high-priority typography, structural badges, and contrasting micro-terminal embeds.
- **Surface Scale**:
  - Canvas: `#F8FAFC` (Slate-50, technical drafting substrate).
  - Surface Pure: `#FFFFFF` (Elevated cards, data grids, modal bodies).
  - Surface Subdued: `#F1F5F9` (Nested panels, table headers, inactive utility strips).
  - Structural Division: `#E2E8F0` and `#CBD5E1` (Hairline rules, blueprint coordinate grids).
- **Code & Console Canvas**: `#0B1430` operates as an inverted micro-environment for inline code execution blocks, command-line snippets, and syntax displays.
- **Functional Semantics**: System alerts follow unambiguous parameters: Success (`#10B981`), Warning (`#F59E0B`), and Critical Error (`#EF4444`).

## Typography

The typographic system utilizes a dual-engine architecture:
- **Space Grotesk** serves as the primary structural voice across headings and body text. Its sharp geometric proportions and idiosyncratic mechanical ink-traps reflect precision engineering without sacrificing human legibility.
- **JetBrains Mono** delivers unambiguous telemetry, numerical readouts, data tables, inline code, and interface status badges.

### Typographic Guidelines
- All `label-tech` styles enforce uppercase transformation for telemetry metadata (e.g., `SYS.STATUS.200`, `LATENCY // 14MS`).
- Maintain strict baseline relationships; avoid loose line-heights in high-density analytical dashboards.
- Numeric displays and balance sheets must always implement tabular figures (`font-variant-numeric: tabular-nums`).

## Layout & Spacing

The layout model is governed by a responsive 12-column fluid engineering grid, structured around a strict 4px/8px incremental rhythm.

### Grid Matrix & Breakpoints
- **Mobile (< 640px)**: 4-column layout, `margin-mobile` (16px), 16px gutters. Structural lines span the full canvas width.
- **Tablet (640px - 1024px)**: 8-column layout, 24px margins, 16px gutters. Two-pane modular panels split 50/50.
- **Desktop (> 1024px)**: 12-column layout, `margin` (32px), `gutter` (24px). Primary work area bound to a maximum readable width of 1440px with dynamic flanking datum margins.

### Spatial Discipline
- Spacing follows absolute mechanical consistency. Internal component padding scales directly with component hierarchy: micro-controls use `space-xs` and `space-sm`, standard interactive targets leverage `space-md`, and containment cards rely on `space-lg`.
- Dividers between sections use 1px solid boundaries rather than wide, unstructured whitespace voids, preserving the technical drafting aesthetic.

## Elevation & Depth

This design system avoids heavy ambient shadows and fuzzy blur techniques. Depth is communicated strictly through surface layering, micro-borders, and high-precision CAD outlines.

### Depth Rules
- **Layer 0 (Canvas)**: Background tone (`#F8FAFC`), often overlaid with a faint 24px x 24px coordinate grid pattern (`rgba(15, 23, 42, 0.03)`).
- **Layer 1 (Card & Module Surfaces)**: Pure white (`#FFFFFF`) with a 1px solid outline (`#CBD5E1`).
- **Layer 2 (Hover States & Active Insets)**: Outlines shift to `#0D6EFD` with an optional crisp offset indicator (e.g., `box-shadow: 0 0 0 1px #0D6EFD, 2px 2px 0px 0px rgba(13, 110, 253, 0.12)`).
- **Layer 3 (Floating Overlays, Modals, Menus)**: Solid white fill, 1px `#CBD5E1` boundary, reinforced by a directional technical shadow: `0 8px 24px -4px rgba(15, 23, 42, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.04)`.
- **Inverted Surfaces (Terminal / Code Layer)**: Solid `#0B1430` surface with a subtle 1px border (`#1E293B`), creating a clear optical separation between schematic UI and direct machine output.

## Shapes

The design system implements a controlled `roundedness: 2` scale (0.5rem / 8px standard corner radius). This standardizes interface modules, striking a balance between structural CAD precision and contemporary UI ergonomics.

### Shape Geometry Rules
- **Base Components (Inputs, Buttons, Badges)**: 8px corner radius (`0.5rem`).
- **Surface Containers (Panels, Modal Windows, Cards)**: 12px to 16px corner radius (`0.75rem` to `1rem`).
- **Terminal Consoles & Code Blocks**: 8px corner radius (`0.5rem`) with crisp 1px division rules separating console header bars from code execution bodies.
- **Telemetry Indicators & Micro-tags**: 4px radius (`0.25rem`) for compact tags; fully circular elements (`9999px`) are reserved exclusively for live execution pulse dots and avatar viewports.

## Components

### Buttons
- **Primary**: Solid background `#0D6EFD`, label in `#FFFFFF`, font `Space Grotesk` 14px weight 600. Border radius 8px. Hover: `#0B5ED7`. Active: `#0A58CA` with an inset active ring.
- **Secondary / Blueprint**: Surface `#FFFFFF`, 1px solid `#CBD5E1`, text `#0F172A`. Hover: Border `#0D6EFD`, text `#0D6EFD`, background `#EBF3FE`.
- **Terminal Action**: Dark fill `#0F172A`, text `#FFFFFF`, mono font. Used for copy commands, deploy triggers, and git actions.

### Chips & Telemetry Badges
- Built using `JetBrains Mono` 11px uppercase (`label-tech`).
- Height: 24px. Padding: 0 8px. Radius: 4px.
- Status variants:
  - *Active / Operational*: Background `#ECFDF5`, text `#065F46`, 1px solid `#A7F3D0` with a 6px green indicator pip.
  - *Build / Processing*: Background `#EBF3FE`, text `#0284C7`, 1px solid `#BAE6FD`.
  - *Muted Tag*: Background `#F1F5F9`, text `#475569`, 1px solid `#E2E8F0`.

### Form Controls & Inputs
- **Text Inputs**: Height 40px, pure white surface, 1px solid `#CBD5E1`, text `#0F172A`, radius 8px. Placeholder `#64748B`. Focus state: Border color `#0D6EFD`, accompanied by a 2px outer ring with `rgba(13, 110, 253, 0.15)`.
- **Checkboxes & Radios**: 18px x 18px footprint, 4px radius for checkboxes, full circle for radios. 1.5px solid `#CBD5E1`. Checked state: Fill `#0D6EFD`, white icon graphic.

### Cards & Data Panels
- Surface `#FFFFFF`, border 1px solid `#E2E8F0`, radius 12px.
- Top bar contains contextual CAD-like metadata (e.g., node reference number or coordinates).
- Hover effect: Subtle border shift to `#CBD5E1` and precise 2px accent line highlighting the card edge.

### Code & Terminal Embeds
- Container fill: `#0B1430`. Radius: 8px. Border: 1px solid `#1E293B`.
- Header bar: Surface `#0F172A` with monospace directory pathing, terminal action controls, and copy status.
- Text: Syntax highlighted using electric blue, emerald green, and slate gray on high-contrast dark space.