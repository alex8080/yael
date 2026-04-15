"use client";

import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEditorStore } from "@/store/editor";
import Canvas, { cellSize } from "@/components/editor/Canvas";
import Palette from "@/components/editor/Palette";
import Toolbar from "@/components/editor/Toolbar";
import PropertiesPanel from "@/components/editor/PropertiesPanel";
import { REGISTRY_MAP } from "@/lib/components";

export default function Home() {
  const addInstance = useEditorStore((s) => s.addInstance);
  const moveInstance = useEditorStore((s) => s.moveInstance);
  const fontScale = useEditorStore((s) => s.fontScale);
  const cs = cellSize(fontScale);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
  );

  function onDragEnd(event: DragEndEvent) {
    const { active, over, delta } = event;
    if (!over) return;

    const overId = String(over.id);

    // Drop onto an accordion (or other container) content slot
    if (overId.startsWith("slot:")) {
      if (!active.data.current?.isPalette) return;
      // Format: slot:{parentId}:{slotKey}  — UUIDs contain no ":" so split is safe
      const colonIdx = overId.indexOf(":", "slot:".length);
      const parentId = overId.slice("slot:".length, colonIdx);
      const slotKey = overId.slice(colonIdx + 1);
      const { type, defaultProps } = active.data.current as {
        type: string;
        defaultProps: Record<string, unknown>;
      };
      const meta = REGISTRY_MAP[type];
      if (meta) addInstance(type, 0, 0, defaultProps, meta.defaultColSpan, meta.defaultRowSpan, parentId, slotKey);
      return;
    }

    if (overId !== "canvas") return;

    const canvasEl = document.getElementById("editor-canvas");
    if (!canvasEl) return;
    const canvasRect = canvasEl.getBoundingClientRect();

    const initialRect = active.rect.current.initial;
    if (!initialRect) return;

    const finalX = initialRect.left + delta.x - canvasRect.left;
    const finalY = initialRect.top + delta.y - canvasRect.top;

    const col = Math.max(1, Math.floor(finalX / cs) + 1);
    const row = Math.max(1, Math.floor(finalY / cs) + 1);

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
          <PropertiesPanel />
        </div>
      </DndContext>
    </div>
  );
}
