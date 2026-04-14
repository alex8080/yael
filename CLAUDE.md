# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project Overview

A locally-run web-based UI prototyping tool built with Next.js and TypeScript. Users select shadcn/ui components from a palette, place them on a grid canvas, position and resize them, then download a generated Next.js page file.

## Tech Stack

- **Framework**: Next.js (App Router), TypeScript
- **UI Components**: shadcn/ui (Radix UI + Tailwind CSS)
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Drag & Drop**: @dnd-kit (palette→canvas drag + canvas move); custom pointer events for resize handles
- **Package manager**: pnpm

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm lint         # ESLint
pnpm typecheck    # tsc --noEmit
```

Adding a new shadcn component:
```bash
pnpm dlx shadcn@latest add <component>
```

## Architecture

### Editor State (Zustand)

Single store in `store/editor.ts`:

```ts
type ComponentInstance = {
  id: string;
  type: string;          // shadcn component name, e.g. "Button", "Card"
  col: number;           // grid column (origin)
  row: number;           // grid row (origin)
  colSpan: number;       // grid columns occupied (default 1, user-overridable)
  rowSpan: number;       // grid rows occupied (default 1, user-overridable)
  props: Record<string, unknown>;
};

type EditorState = {
  instances: ComponentInstance[];
  selectedId: string | null;
  // actions...
};
```

Grid uses fixed cell size (e.g. 40px). `colSpan`/`rowSpan` allow custom sizing per instance.

### Canvas Model

The canvas is a CSS grid container (`display: grid`). Each instance renders inside a grid cell range via `grid-column` / `grid-row` CSS. Snap-to-grid is natural — positions are always integer cell coordinates. Resize changes `colSpan`/`rowSpan`.

`fontScale` drives both cell size (`40 * fontScale` px) and canvas `font-size` (`fontScale em`). Tailwind v4 font utilities use CSS custom properties (`--text-sm: 0.875rem` etc.), so `font-size` alone won't scale shadcn component text — `app/globals.css` overrides `--text-*` on `#editor-canvas` with `em` units so they resolve against the canvas `font-size` and scale correctly.

### Drag & Drop

- **Palette → Canvas** (`@dnd-kit`): dragging a palette item creates a new `ComponentInstance` at the drop target cell.
- **Move on canvas** (`@dnd-kit`): dragging an existing instance updates its `col`/`row`.
- **Resize handles** (custom pointer events): 8-handle resize on the selected instance; `onPointerMove` delta is divided by cell size and rounded to update `colSpan`/`rowSpan`.

### Code Generation

`lib/generate.ts` — takes `ComponentInstance[]`, emits a `.tsx` string:
- Page wrapper: `relative` div matching canvas dimensions
- Each instance: `absolute` div with `top`/`left`/`width`/`height` derived from `col * cellSize`, etc., containing the shadcn component with its stored `props`
- Output triggered by a toolbar button; browser `<a download>` delivers the file

### Key Directories

```
app/              # Next.js App Router — single route (the editor)
components/
  ui/             # shadcn-generated files — do not edit directly
  editor/         # Canvas, Palette, ResizeHandle, Toolbar, etc.
  properties/     # Props panel for the selected component
store/
  editor.ts       # Zustand editor store
lib/
  generate.ts     # Code generation logic
  components.ts   # Registry: maps component type name → metadata + default props
```

### Component Registry

`lib/components.ts` is the single source of truth for which shadcn components are available in the palette. Each entry declares:
- `type` — string key matching the import name
- `label` — display name in the palette
- `defaultProps` — initial props when placed
- `render` — a function returning the JSX preview on the canvas
