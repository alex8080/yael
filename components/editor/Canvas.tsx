"use client";

import { useDroppable } from "@dnd-kit/core";
import { useEditorStore } from "@/store/editor";
import CanvasInstance from "./CanvasInstance";

export const COLS = 24;
export const ROWS = 20;

/** Cell size in px given a font scale multiplier. Default: 40px at 1em. */
export function cellSize(fontScale: number) {
  return Math.round(40 * fontScale);
}

export default function Canvas() {
  const { setNodeRef } = useDroppable({ id: "canvas" });
  const instances = useEditorStore((s) => s.instances);
  const selectedId = useEditorStore((s) => s.selectedId);
  const selectInstance = useEditorStore((s) => s.selectInstance);
  const fontScale = useEditorStore((s) => s.fontScale);

  const cs = cellSize(fontScale);

  return (
    <div
      className="flex-1 overflow-auto bg-zinc-50"
      onClick={() => selectInstance(null)}
    >
      <div
        id="editor-canvas"
        ref={setNodeRef}
        style={{
          fontSize: `${fontScale}em`,
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, ${cs}px)`,
          gridTemplateRows: `repeat(${ROWS}, ${cs}px)`,
          width: COLS * cs,
          height: ROWS * cs,
          backgroundImage: [
            "linear-gradient(to right, #e5e7eb 1px, transparent 1px)",
            "linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: `${cs}px ${cs}px`,
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
