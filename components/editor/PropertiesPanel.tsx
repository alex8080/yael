"use client";

import { useEditorStore } from "@/store/editor";
import { REGISTRY_MAP } from "@/lib/components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

function TextField({
  label,
  propKey,
  props,
  update,
}: {
  label: string;
  propKey: string;
  props: Record<string, unknown>;
  update: (p: Record<string, unknown>) => void;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-xs font-medium">{label}</Label>
      <Input
        value={String(props[propKey] ?? "")}
        onChange={(e) => update({ [propKey]: e.target.value })}
        className="h-7 text-xs"
      />
    </div>
  );
}

const FONT_FAMILIES: { label: string; value: string }[] = [
  { label: "Default", value: "" },
  { label: "Sans-serif", value: "ui-sans-serif, system-ui, sans-serif" },
  { label: "Serif", value: "ui-serif, Georgia, serif" },
  { label: "Monospace", value: "ui-monospace, monospace" },
  { label: "Inter", value: "Inter, sans-serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Courier New", value: "'Courier New', monospace" },
  { label: "Times New Roman", value: "'Times New Roman', serif" },
];

function FontControls({
  props,
  update,
}: {
  props: Record<string, unknown>;
  update: (p: Record<string, unknown>) => void;
}) {
  const isBold = props.fontWeight === "bold";
  const isItalic = props.fontStyle === "italic";
  const fontFamily = (props.fontFamily as string) ?? "";
  const fontSize = props.fontSize as number | undefined;

  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium">Font</Label>
      <div className="flex items-center gap-1">
        <button
          className={cn(
            "h-7 w-7 text-xs border rounded font-bold flex items-center justify-center shrink-0",
            isBold
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background hover:bg-muted",
          )}
          onClick={() => update({ fontWeight: isBold ? "normal" : "bold" })}
          title="Bold"
          type="button"
        >
          B
        </button>
        <button
          className={cn(
            "h-7 w-7 text-xs border rounded italic flex items-center justify-center shrink-0",
            isItalic
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background hover:bg-muted",
          )}
          onClick={() => update({ fontStyle: isItalic ? "normal" : "italic" })}
          title="Italic"
          type="button"
        >
          I
        </button>
        <Input
          type="number"
          value={fontSize ?? 14}
          min={8}
          max={96}
          onChange={(e) => update({ fontSize: Number(e.target.value) })}
          className="h-7 text-xs w-16 shrink-0"
          title="Font size (px)"
        />
        <span className="text-xs text-muted-foreground">px</span>
      </div>
      <select
        value={fontFamily}
        onChange={(e) => update({ fontFamily: e.target.value })}
        className="w-full h-7 text-xs border rounded bg-background px-1"
      >
        {FONT_FAMILIES.map((f) => (
          <option key={f.value} value={f.value}>
            {f.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function StringListEditor({
  label,
  values,
  onChange,
  newItemLabel = "New option",
}: {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
  newItemLabel?: string;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-xs font-medium">{label}</Label>
      {values.map((v, i) => (
        <div key={i} className="flex gap-1">
          <Input
            value={v}
            onChange={(e) => {
              const next = [...values];
              next[i] = e.target.value;
              onChange(next);
            }}
            className="h-7 text-xs"
          />
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs shrink-0"
            onClick={() => onChange(values.filter((_, j) => j !== i))}
          >
            ×
          </Button>
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        className="h-7 text-xs w-full"
        onClick={() => onChange([...values, newItemLabel])}
      >
        + Add
      </Button>
    </div>
  );
}

function PairListEditor({
  label,
  values,
  keyA,
  keyB,
  placeholderA,
  placeholderB,
  newItem,
  onChange,
}: {
  label: string;
  values: Record<string, string>[];
  keyA: string;
  keyB: string;
  placeholderA?: string;
  placeholderB?: string;
  newItem: Record<string, string>;
  onChange: (v: Record<string, string>[]) => void;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium">{label}</Label>
      {values.map((item, i) => (
        <div key={i} className="border rounded p-2 space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Item {i + 1}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs"
              onClick={() => onChange(values.filter((_, j) => j !== i))}
            >
              ×
            </Button>
          </div>
          <Input
            value={item[keyA] ?? ""}
            placeholder={placeholderA ?? keyA}
            onChange={(e) => {
              const next = [...values];
              next[i] = { ...next[i], [keyA]: e.target.value };
              onChange(next);
            }}
            className="h-7 text-xs"
          />
          <Input
            value={item[keyB] ?? ""}
            placeholder={placeholderB ?? keyB}
            onChange={(e) => {
              const next = [...values];
              next[i] = { ...next[i], [keyB]: e.target.value };
              onChange(next);
            }}
            className="h-7 text-xs"
          />
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        className="h-7 text-xs w-full"
        onClick={() => onChange([...values, { ...newItem }])}
      >
        + Add
      </Button>
    </div>
  );
}

export default function PropertiesPanel() {
  const instances = useEditorStore((s) => s.instances);
  const selectedId = useEditorStore((s) => s.selectedId);
  const updateProps = useEditorStore((s) => s.updateProps);

  const instance = instances.find((i) => i.id === selectedId);

  if (!instance) {
    return (
      <div className="w-60 shrink-0 border-l border-border bg-background p-4">
        <p className="text-xs text-muted-foreground">
          Select a component to edit its properties.
        </p>
      </div>
    );
  }

  const { type, props } = instance;
  const update = (p: Record<string, unknown>) => updateProps(instance.id, p);
  const meta = REGISTRY_MAP[type];

  function renderFields() {
    switch (type) {
      case "Button":
        return (
          <>
            <TextField label="Label" propKey="children" props={props} update={update} />
            <FontControls props={props} update={update} />
          </>
        );

      case "Text":
        return (
          <>
            <TextField label="Content" propKey="children" props={props} update={update} />
            <FontControls props={props} update={update} />
          </>
        );

      case "Toggle":
        return (
          <>
            <TextField label="Label" propKey="children" props={props} update={update} />
            <FontControls props={props} update={update} />
          </>
        );

      case "Badge":
        return (
          <>
            <TextField label="Label" propKey="children" props={props} update={update} />
            <FontControls props={props} update={update} />
          </>
        );

      case "Input":
        return (
          <>
            <TextField label="Placeholder" propKey="placeholder" props={props} update={update} />
            <FontControls props={props} update={update} />
          </>
        );

      case "Textarea":
        return (
          <>
            <TextField label="Placeholder" propKey="placeholder" props={props} update={update} />
            <FontControls props={props} update={update} />
          </>
        );

      case "Checkbox":
        return (
          <>
            <TextField label="Label" propKey="label" props={props} update={update} />
            <FontControls props={props} update={update} />
          </>
        );

      case "Switch":
        return (
          <>
            <TextField label="Label" propKey="label" props={props} update={update} />
            <FontControls props={props} update={update} />
          </>
        );

      case "Avatar":
        return <TextField label="Fallback text" propKey="fallback" props={props} update={update} />;

      case "Alert":
        return (
          <>
            <TextField label="Title" propKey="title" props={props} update={update} />
            <TextField label="Description" propKey="description" props={props} update={update} />
            <FontControls props={props} update={update} />
          </>
        );

      case "Card":
        return (
          <>
            <TextField label="Title" propKey="title" props={props} update={update} />
            <TextField label="Description" propKey="description" props={props} update={update} />
            <FontControls props={props} update={update} />
          </>
        );

      case "Progress":
        return (
          <div className="space-y-1">
            <Label className="text-xs font-medium">Value (0–100)</Label>
            <Input
              type="number"
              min={0}
              max={100}
              value={String(props.value ?? 60)}
              onChange={(e) => update({ value: Number(e.target.value) })}
              className="h-7 text-xs"
            />
          </div>
        );

      case "Slider":
        return (
          <>
            <div className="space-y-1">
              <Label className="text-xs font-medium">Max</Label>
              <Input
                type="number"
                value={String(props.max ?? 100)}
                onChange={(e) => update({ max: Number(e.target.value) })}
                className="h-7 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-medium">Step</Label>
              <Input
                type="number"
                value={String(props.step ?? 1)}
                onChange={(e) => update({ step: Number(e.target.value) })}
                className="h-7 text-xs"
              />
            </div>
          </>
        );

      case "RadioGroup": {
        const options = (props.options as string[]) ?? ["Option 1", "Option 2"];
        return (
          <StringListEditor
            label="Options"
            values={options}
            newItemLabel="New option"
            onChange={(v) => update({ options: v })}
          />
        );
      }

      case "Select": {
        const options = (props.options as string[]) ?? ["Option A", "Option B", "Option C"];
        return (
          <>
            <TextField label="Placeholder" propKey="placeholder" props={props} update={update} />
            <StringListEditor
              label="Options"
              values={options}
              newItemLabel="New option"
              onChange={(v) => update({ options: v })}
            />
          </>
        );
      }

      case "Accordion": {
        const items = (props.items as { trigger: string; content: string }[]) ?? [];
        return (
          <>
            <PairListEditor
              label="Items"
              values={items as Record<string, string>[]}
              keyA="trigger"
              keyB="content"
              placeholderA="Header"
              placeholderB="Content"
              newItem={{ trigger: "New Section", content: "Content here" }}
              onChange={(v) => update({ items: v })}
            />
            <FontControls props={props} update={update} />
          </>
        );
      }

      case "Tabs": {
        const tabs = (props.tabs as { label: string; content: string }[]) ?? [];
        return (
          <>
            <PairListEditor
              label="Tabs"
              values={tabs as Record<string, string>[]}
              keyA="label"
              keyB="content"
              placeholderA="Tab label"
              placeholderB="Content"
              newItem={{ label: "New Tab", content: "Content here" }}
              onChange={(v) => update({ tabs: v })}
            />
            <FontControls props={props} update={update} />
          </>
        );
      }

      case "Breadcrumb": {
        const items = (props.items as string[]) ?? ["Home", "Page"];
        return (
          <>
            <StringListEditor
              label="Items"
              values={items}
              newItemLabel="New item"
              onChange={(v) => update({ items: v })}
            />
            <FontControls props={props} update={update} />
          </>
        );
      }

      case "Table": {
        const headers = (props.headers as string[]) ?? ["Col 1", "Col 2"];
        return (
          <>
            <StringListEditor
              label="Headers"
              values={headers}
              newItemLabel="New column"
              onChange={(v) => update({ headers: v })}
            />
            <FontControls props={props} update={update} />
          </>
        );
      }

      default:
        return (
          <p className="text-xs text-muted-foreground">No editable properties.</p>
        );
    }
  }

  return (
    <div className="w-60 shrink-0 border-l border-border bg-background overflow-y-auto">
      <div className="p-4 space-y-4">
        <div>
          <p className="text-xs font-semibold text-foreground">{meta?.label ?? type}</p>
          <p className="text-xs text-muted-foreground">Properties</p>
        </div>
        <Separator />
        {renderFields()}
      </div>
    </div>
  );
}
