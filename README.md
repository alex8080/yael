# Framework

A locally-run web-based UI prototyping tool. Select shadcn/ui components from a palette, place them on a grid canvas, position and resize them, then download a generated Next.js page file.

## Getting Started

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to use the editor.

## Usage

1. **Palette** — drag a component from the left panel onto the canvas
2. **Move** — drag placed components to reposition them on the grid
3. **Resize** — select a component and drag its handles to change size
4. **Props** — edit component properties in the right panel
5. **Download** — click the toolbar button to export a `.tsx` page file

## Tech Stack

- **Framework**: Next.js (App Router), TypeScript
- **UI Components**: shadcn/ui (Radix UI + Tailwind CSS)
- **State**: Zustand
- **Drag & Drop**: @dnd-kit
- **Package manager**: pnpm

## Commands

```bash
pnpm dev        # Start development server
pnpm build      # Production build
pnpm lint       # ESLint
pnpm typecheck  # Type check
```

Adding a shadcn component to the palette:

```bash
pnpm dlx shadcn@latest add <component>
```

Then register it in `lib/components.ts`.
