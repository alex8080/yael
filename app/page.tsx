"use client";

import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEditorStore } from "@/store/editor";
import Canvas, { CELL_SIZE } from "@/components/editor/Canvas";
import Palette from "@/components/editor/Palette";
import Toolbar from "@/components/editor/Toolbar";
import { REGISTRY_MAP } from "@/lib/components";

export default function Home() {
  const addInstance = useEditorStore((s) => s.addInstance);
  const moveInstance = useEditorStore((s) => s.moveInstance);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
  );

  function onDragEnd(event: DragEndEvent) {
    const { active, over, delta } = event;
    if (!over || over.id !== "canvas") return;

    const canvasEl = document.getElementById("editor-canvas");
    if (!canvasEl) return;
    const canvasRect = canvasEl.getBoundingClientRect();

    const initialRect = active.rect.current.initial;
    if (!initialRect) return;

    const finalX = initialRect.left + delta.x - canvasRect.left;
    const finalY = initialRect.top + delta.y - canvasRect.top;

    const col = Math.max(1, Math.floor(finalX / CELL_SIZE) + 1);
    const row = Math.max(1, Math.floor(finalY / CELL_SIZE) + 1);

    if (active.data.current?.isPalette) {
      const { type, defaultProps } = active.data.current as {
        type: string;
        defaultProps: Record<string, unknown>;
      };
      const meta = REGISTRY_MAP[type];
      if (meta) addInstance(type, col, row, defaultProps, meta.defaultColSpan, meta.defaultRowSpan);
    } else if (active.data.current?.isCanvas) {
      moveInstance(active.id as string, col, row);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <DndContext sensors={sensors} onDragEnd={onDragEnd}>
        <Toolbar />
        <div className="flex flex-1 overflow-hidden">
          <Palette />
          <Canvas />
        </div>
      </DndContext>
    </div>
  );
}
