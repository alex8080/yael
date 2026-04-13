"use client";

import { useDraggable } from "@dnd-kit/core";
import { ComponentInstance, useEditorStore } from "@/store/editor";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  instance: ComponentInstance;
  isSelected: boolean;
};

function renderComponent(type: string, props: Record<string, unknown>) {
  switch (type) {
    case "Button":
      return <Button {...(props as React.ComponentProps<typeof Button>)} />;
    case "Text":
      return (
        <p className="text-sm text-foreground">
          {String(props.children ?? "")}
        </p>
      );
    default:
      return (
        <div className="text-xs text-muted-foreground">{type}</div>
      );
  }
}

export default function CanvasInstance({ instance, isSelected }: Props) {
  const selectInstance = useEditorStore((s) => s.selectInstance);
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: instance.id,
      data: { isCanvas: true },
    });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={(e) => {
        e.stopPropagation();
        selectInstance(instance.id);
      }}
      style={{
        gridColumn: `${instance.col} / span ${instance.colSpan}`,
        gridRow: `${instance.row} / span ${instance.rowSpan}`,
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
        zIndex: isDragging ? 50 : isSelected ? 10 : 1,
      }}
      className={cn(
        "flex items-center justify-center cursor-grab active:cursor-grabbing",
        isDragging && "opacity-50",
        isSelected && "ring-2 ring-blue-500 ring-inset rounded",
      )}
    >
      {renderComponent(instance.type, instance.props)}
    </div>
  );
}
