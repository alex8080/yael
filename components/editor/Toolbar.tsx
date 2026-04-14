"use client";

import { useEditorStore } from "@/store/editor";
import { downloadComponent, exportLayout, importLayout } from "@/lib/generate";
import { Button } from "@/components/ui/button";

export default function Toolbar() {
  const instances = useEditorStore((s) => s.instances);
  const loadInstances = useEditorStore((s) => s.loadInstances);

  return (
    <header className="h-12 shrink-0 border-b border-border bg-background flex items-center px-4 gap-3">
      <span className="text-sm font-semibold">UI Builder</span>
      <div className="ml-auto flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => importLayout(loadInstances)}
        >
          Load layout
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={instances.length === 0}
          onClick={() => exportLayout(instances)}
        >
          Save layout
        </Button>
        <Button
          size="sm"
          disabled={instances.length === 0}
          onClick={() => downloadComponent(instances)}
        >
          Download component
        </Button>
      </div>
    </header>
  );
}
