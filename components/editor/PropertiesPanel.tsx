"use client";

import { useEditorStore } from "@/store/editor";
import { REGISTRY_MAP } from "@/lib/components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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

function FontSizeField({
  value,
  onChange,
}: {
  value: number | undefined;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-xs font-medium">Font Size (px)</Label>
      <Input
        type="number"
        value={value ?? 14}
        min={8}
        max={72}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-7 text-xs"
      />
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
            <FontSizeField
              value={props.fontSize as number | undefined}
              onChange={(v) => update({ fontSize: v })}
            />
          </>
        );

      case "Text":
        return (
          <>
            <TextField label="Content" propKey="children" props={props} update={update} />
            <FontSizeField
              value={props.fontSize as number | undefined}
              onChange={(v) => update({ fontSize: v })}
            />
          </>
        );

      case "Toggle":
        return (
          <>
            <TextField label="Label" propKey="children" props={props} update={update} />
            <FontSizeField
              value={props.fontSize as number | undefined}
              onChange={(v) => update({ fontSize: v })}
            />
          </>
        );

      case "Badge":
        return (
          <>
            <TextField label="Label" propKey="children" props={props} update={update} />
            <FontSizeField
              value={props.fontSize as number | undefined}
              onChange={(v) => update({ fontSize: v })}
            />
          </>
        );

      case "Input":
        return (
          <>
            <TextField label="Placeholder" propKey="placeholder" props={props} update={update} />
            <FontSizeField
              value={props.fontSize as number | undefined}
              onChange={(v) => update({ fontSize: v })}
            />
          </>
        );

      case "Textarea":
        return (
          <>
            <TextField label="Placeholder" propKey="placeholder" props={props} update={update} />
            <FontSizeField
              value={props.fontSize as number | undefined}
              onChange={(v) => update({ fontSize: v })}
            />
          </>
        );

      case "Checkbox":
        return <TextField label="Label" propKey="label" props={props} update={update} />;

      case "Switch":
        return <TextField label="Label" propKey="label" props={props} update={update} />;

      case "Avatar":
        return <TextField label="Fallback text" propKey="fallback" props={props} update={update} />;

      case "Alert":
        return (
          <>
            <TextField label="Title" propKey="title" props={props} update={update} />
            <TextField label="Description" propKey="description" props={props} update={update} />
          </>
        );

      case "Card":
        return (
          <>
            <TextField label="Title" propKey="title" props={props} update={update} />
            <TextField label="Description" propKey="description" props={props} update={update} />
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
        );
      }

      case "Tabs": {
        const tabs = (props.tabs as { label: string; content: string }[]) ?? [];
        return (
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
        );
      }

      case "Breadcrumb": {
        const items = (props.items as string[]) ?? ["Home", "Page"];
        return (
          <StringListEditor
            label="Items"
            values={items}
            newItemLabel="New item"
            onChange={(v) => update({ items: v })}
          />
        );
      }

      case "Table": {
        const headers = (props.headers as string[]) ?? ["Col 1", "Col 2"];
        return (
          <StringListEditor
            label="Headers"
            values={headers}
            newItemLabel="New column"
            onChange={(v) => update({ headers: v })}
          />
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
