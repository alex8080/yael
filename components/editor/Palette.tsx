"use client";

import { useDraggable } from "@dnd-kit/core";
import { COMPONENT_REGISTRY, CATEGORIES, ComponentMeta } from "@/lib/components";

function PaletteItem({ meta }: { meta: ComponentMeta }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${meta.type}`,
    data: { isPalette: true, type: meta.type, defaultProps: meta.defaultProps },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ opacity: isDragging ? 0.4 : 1 }}
      className="flex items-center justify-center rounded border border-border bg-background px-2 py-1.5 text-xs cursor-grab active:cursor-grabbing select-none hover:bg-muted transition-colors"
    >
      {meta.label}
    </div>
  );
}

export default function Palette() {
  return (
    <aside className="w-44 shrink-0 border-r border-border bg-sidebar p-3 flex flex-col gap-3 overflow-y-auto">
      {CATEGORIES.map((category) => (
        <div key={category}>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
            {category}
          </p>
          <div className="flex flex-col gap-1">
            {COMPONENT_REGISTRY.filter((c) => c.category === category).map((meta) => (
              <PaletteItem key={meta.type} meta={meta} />
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
