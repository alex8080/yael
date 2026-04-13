"use client";

import { useDroppable } from "@dnd-kit/core";
import { useEditorStore } from "@/store/editor";
import CanvasInstance from "./CanvasInstance";

export const CELL_SIZE = 40;
export const COLS = 24;
export const ROWS = 20;

export default function Canvas() {
  const { setNodeRef } = useDroppable({ id: "canvas" });
  const instances = useEditorStore((s) => s.instances);
  const selectedId = useEditorStore((s) => s.selectedId);
  const selectInstance = useEditorStore((s) => s.selectInstance);

  return (
    <div
      className="flex-1 overflow-auto bg-zinc-50"
      onClick={() => selectInstance(null)}
    >
      <div
        id="editor-canvas"
        ref={setNodeRef}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${ROWS}, ${CELL_SIZE}px)`,
          width: COLS * CELL_SIZE,
          height: ROWS * CELL_SIZE,
          backgroundImage: [
            "linear-gradient(to right, #e5e7eb 1px, transparent 1px)",
            "linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
        }}
      >
        {instances.map((inst) => (
          <CanvasInstance
            key={inst.id}
            instance={inst}
            isSelected={inst.id === selectedId}
          />
        ))}
      </div>
    </div>
  );
}
