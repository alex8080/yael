"use client";

import { useEditorStore } from "@/store/editor";
import { downloadComponent } from "@/lib/generate";
import { Button } from "@/components/ui/button";

export default function Toolbar() {
  const instances = useEditorStore((s) => s.instances);

  return (
    <header className="h-12 shrink-0 border-b border-border bg-background flex items-center px-4 gap-3">
      <span className="text-sm font-semibold">UI Builder</span>
      <div className="ml-auto">
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
