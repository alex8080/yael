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
pnpm tsc --noEmit  # type check (no typecheck script)
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
  parentId?: string;   // set when instance lives in a container slot
  slotKey?: string;    // identifies which slot, e.g. "content", "tab-0", "item-1"
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
- Root instances: `absolute` div with `top`/`left`/`width`/`height` from `col * CELL_SIZE`
- Container slot children: `slotContentJsx()` helper renders a `relative` wrapper with `absolute` children using the same grid math; called recursively so nested containers work
- `renderJsx(type, props, idx, allInstances?, instanceId?)` — pass `allInstances` + `instanceId` for containers; omitting them yields a static placeholder
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

### Container / Slot Pattern

Components that accept dropped children (Accordion, Card, Tabs, ScrollArea) use:
- A `*Preview` component that renders a `ContainerSlot` CSS grid (same cell size as main canvas)
- `ContainerSlot` is a `useDroppable` grid with id `slot:{parentId}:{slotKey}`; children use `col`/`row`/`colSpan`/`rowSpan` for positioning
- `SlotChild` (in CanvasInstance.tsx) mirrors `CanvasInstance`: `useDraggable`, grid placement, 8 resize handles
- `renderComponent` delegates to the preview when `ctx: RenderCtx` is passed
- Drop handling in `app/page.tsx` recognises `overId.startsWith("slot:")` and calculates col/row from `over.rect` (dnd-kit's droppable bounding rect) — not from the canvas element
- Slot keys: Card/ScrollArea use `"content"`; Tabs use `"tab-{i}"`; Accordion uses `"item-{i}"`
- Internal grid dimensions: `internalCols = parentColSpan`; `internalRows` adjusted per type: Card −2 rows (header), Tabs −1 row (TabsList), Accordion splits `(parentRowSpan − n)` rows across `n` items, ScrollArea uses full `parentRowSpan`. **This formula must stay consistent between `CanvasInstance.tsx` previews and `lib/generate.ts`.**
- Each `*Preview` looks up its own instance via `instances.find(i => i.id === instanceId)` to get current colSpan/rowSpan

### Drag Data Payloads

`onDragEnd` in `app/page.tsx` distinguishes drag sources via `active.data.current`:
- `{ isPalette: true, type, defaultProps }` — from Palette
- `{ isCanvas: true }` — root canvas instance
- `{ isSlotChild: true }` — child inside a container slot

### Store Actions (store/editor.ts)

Key actions beyond CRUD: `moveInstance(id, col, row)`, `resizeInstance(id, colSpan, rowSpan)`, `reparentInstance(id, parentId?, slotKey?)` (moves between slot↔canvas; clears parentId when undefined), `removeInstance` also removes all children with matching `parentId`.

### Component Registry

`lib/components.ts` is the single source of truth for which shadcn components are available in the palette. Each entry declares:
- `type` — string key matching the import name
- `label` — display name in the palette
- `defaultProps` — initial props when placed
- `render` — a function returning the JSX preview on the canvas
