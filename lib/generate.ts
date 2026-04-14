import { ComponentInstance } from "@/store/editor";

const CELL_SIZE = 40;

// Maps each component type to its shadcn import statements
const IMPORT_MAP: Record<string, { from: string; named: string[] }[]> = {
  Button: [{ from: "@/components/ui/button", named: ["Button"] }],
  Input: [{ from: "@/components/ui/input", named: ["Input"] }],
  Textarea: [{ from: "@/components/ui/textarea", named: ["Textarea"] }],
  Checkbox: [
    { from: "@/components/ui/checkbox", named: ["Checkbox"] },
    { from: "@/components/ui/label", named: ["Label"] },
  ],
  Switch: [
    { from: "@/components/ui/switch", named: ["Switch"] },
    { from: "@/components/ui/label", named: ["Label"] },
  ],
  Slider: [{ from: "@/components/ui/slider", named: ["Slider"] }],
  Toggle: [{ from: "@/components/ui/toggle", named: ["Toggle"] }],
  RadioGroup: [
    { from: "@/components/ui/radio-group", named: ["RadioGroup", "RadioGroupItem"] },
    { from: "@/components/ui/label", named: ["Label"] },
  ],
  Select: [
    {
      from: "@/components/ui/select",
      named: ["Select", "SelectTrigger", "SelectValue", "SelectContent", "SelectItem"],
    },
  ],
  Text: [],
  Badge: [{ from: "@/components/ui/badge", named: ["Badge"] }],
  Avatar: [{ from: "@/components/ui/avatar", named: ["Avatar", "AvatarFallback"] }],
  Separator: [{ from: "@/components/ui/separator", named: ["Separator"] }],
  Skeleton: [{ from: "@/components/ui/skeleton", named: ["Skeleton"] }],
  Progress: [{ from: "@/components/ui/progress", named: ["Progress"] }],
  Alert: [
    {
      from: "@/components/ui/alert",
      named: ["Alert", "AlertTitle", "AlertDescription"],
    },
  ],
  Card: [
    {
      from: "@/components/ui/card",
      named: ["Card", "CardHeader", "CardTitle", "CardDescription", "CardContent"],
    },
  ],
  Accordion: [
    {
      from: "@/components/ui/accordion",
      named: ["Accordion", "AccordionItem", "AccordionTrigger", "AccordionContent"],
    },
  ],
  Tabs: [
    {
      from: "@/components/ui/tabs",
      named: ["Tabs", "TabsList", "TabsTrigger", "TabsContent"],
    },
  ],
  ScrollArea: [{ from: "@/components/ui/scroll-area", named: ["ScrollArea"] }],
  Breadcrumb: [
    {
      from: "@/components/ui/breadcrumb",
      named: [
        "Breadcrumb",
        "BreadcrumbList",
        "BreadcrumbItem",
        "BreadcrumbLink",
        "BreadcrumbSeparator",
        "BreadcrumbPage",
      ],
    },
  ],
  Pagination: [
    {
      from: "@/components/ui/pagination",
      named: [
        "Pagination",
        "PaginationContent",
        "PaginationItem",
        "PaginationPrevious",
        "PaginationLink",
        "PaginationNext",
      ],
    },
  ],
  Table: [
    {
      from: "@/components/ui/table",
      named: ["Table", "TableHeader", "TableBody", "TableRow", "TableHead", "TableCell"],
    },
  ],
};

function ind(code: string, spaces: number): string {
  const pad = " ".repeat(spaces);
  return code
    .split("\n")
    .map((line) => (line.trim() ? pad + line : line))
    .join("\n");
}

function renderJsx(type: string, props: Record<string, unknown>, idx: number): string {
  switch (type) {
    case "Button": {
      const fs = props.fontSize ? ` style={{ fontSize: "${props.fontSize}px" }}` : "";
      const variant = props.variant ? ` variant="${props.variant}"` : "";
      return `<Button${variant}${fs}>${props.children ?? "Button"}</Button>`;
    }

    case "Text": {
      const fs = props.fontSize ? `${props.fontSize}px` : "0.875rem";
      return `<p className="text-foreground" style={{ fontSize: "${fs}" }}>${props.children ?? ""}</p>`;
    }

    case "Input": {
      const placeholder = props.placeholder ?? "";
      const fs = props.fontSize ? ` style={{ fontSize: "${props.fontSize}px" }}` : "";
      return `<Input placeholder="${placeholder}"${fs} className="w-full" />`;
    }

    case "Textarea": {
      const placeholder = props.placeholder ?? "";
      const fs = props.fontSize ? ` style={{ fontSize: "${props.fontSize}px" }}` : "";
      return `<Textarea placeholder="${placeholder}"${fs} className="w-full" />`;
    }

    case "Checkbox": {
      const label = props.label ?? "Option";
      const id = `cb-${idx}`;
      return [
        `<div className="flex items-center gap-2">`,
        `  <Checkbox id="${id}" />`,
        `  <Label htmlFor="${id}">${label}</Label>`,
        `</div>`,
      ].join("\n");
    }

    case "Switch": {
      const label = props.label ?? "Toggle";
      const id = `sw-${idx}`;
      return [
        `<div className="flex items-center gap-2">`,
        `  <Switch id="${id}" />`,
        `  <Label htmlFor="${id}">${label}</Label>`,
        `</div>`,
      ].join("\n");
    }

    case "Slider": {
      const dv = JSON.stringify(props.defaultValue ?? [50]);
      const max = props.max ?? 100;
      const step = props.step ?? 1;
      return `<Slider defaultValue={${dv}} max={${max}} step={${step}} className="w-full" />`;
    }

    case "Toggle": {
      const fs = props.fontSize ? ` style={{ fontSize: "${props.fontSize}px" }}` : "";
      return `<Toggle${fs}>${props.children ?? "Toggle"}</Toggle>`;
    }

    case "RadioGroup": {
      const options = (props.options as string[]) ?? ["Option 1", "Option 2"];
      const items = options
        .map(
          (opt, i) =>
            `  <div className="flex items-center gap-2">\n    <RadioGroupItem value="${opt}" id="r-${idx}-${i}" />\n    <Label htmlFor="r-${idx}-${i}">${opt}</Label>\n  </div>`,
        )
        .join("\n");
      return `<RadioGroup defaultValue="${options[0]}" className="flex flex-col gap-1">\n${items}\n</RadioGroup>`;
    }

    case "Select": {
      const options = (props.options as string[]) ?? ["Option A", "Option B", "Option C"];
      const placeholder = props.placeholder ?? "Select...";
      const items = options
        .map((opt) => `    <SelectItem value="${opt}">${opt}</SelectItem>`)
        .join("\n");
      return [
        `<Select>`,
        `  <SelectTrigger className="w-full">`,
        `    <SelectValue placeholder="${placeholder}" />`,
        `  </SelectTrigger>`,
        `  <SelectContent>`,
        items,
        `  </SelectContent>`,
        `</Select>`,
      ].join("\n");
    }

    case "Badge": {
      const fs = props.fontSize ? ` style={{ fontSize: "${props.fontSize}px" }}` : "";
      return `<Badge${fs}>${props.children ?? "Badge"}</Badge>`;
    }

    case "Avatar":
      return `<Avatar>\n  <AvatarFallback>${props.fallback ?? "CN"}</AvatarFallback>\n</Avatar>`;

    case "Separator":
      return `<Separator className="w-full" />`;

    case "Skeleton":
      return `<Skeleton className="w-full h-8 rounded" />`;

    case "Progress":
      return `<Progress value={${props.value ?? 60}} className="w-full" />`;

    case "Alert":
      return [
        `<Alert className="w-full">`,
        `  <AlertTitle>${props.title ?? "Alert"}</AlertTitle>`,
        `  <AlertDescription>${props.description ?? ""}</AlertDescription>`,
        `</Alert>`,
      ].join("\n");

    case "Card":
      return [
        `<Card className="w-full">`,
        `  <CardHeader>`,
        `    <CardTitle>${props.title ?? "Card Title"}</CardTitle>`,
        `    <CardDescription>${props.description ?? ""}</CardDescription>`,
        `  </CardHeader>`,
        `  <CardContent>`,
        `    <p className="text-sm text-muted-foreground">Card content</p>`,
        `  </CardContent>`,
        `</Card>`,
      ].join("\n");

    case "Accordion": {
      const items = (props.items as { trigger: string; content: string }[]) ?? [];
      const children = items
        .map(
          (item, i) =>
            `  <AccordionItem value="item-${i}">\n    <AccordionTrigger>${item.trigger}</AccordionTrigger>\n    <AccordionContent>${item.content}</AccordionContent>\n  </AccordionItem>`,
        )
        .join("\n");
      return `<Accordion type="single" collapsible className="w-full">\n${children}\n</Accordion>`;
    }

    case "Tabs": {
      const tabs = (props.tabs as { label: string; content: string }[]) ?? [];
      const first = tabs[0]?.label ?? "tab0";
      const triggers = tabs
        .map((t) => `    <TabsTrigger value="${t.label}">${t.label}</TabsTrigger>`)
        .join("\n");
      const contents = tabs
        .map(
          (t) =>
            `  <TabsContent value="${t.label}">\n    <p className="text-sm">${t.content}</p>\n  </TabsContent>`,
        )
        .join("\n");
      return [
        `<Tabs defaultValue="${first}" className="w-full">`,
        `  <TabsList>`,
        triggers,
        `  </TabsList>`,
        contents,
        `</Tabs>`,
      ].join("\n");
    }

    case "ScrollArea":
      return [
        `<ScrollArea className="w-full h-24 rounded border p-2">`,
        `  <p className="text-sm text-muted-foreground">Scrollable content area</p>`,
        `</ScrollArea>`,
      ].join("\n");

    case "Breadcrumb": {
      const items = (props.items as string[]) ?? ["Home", "Page"];
      const crumbs = items
        .map((item, i) => {
          if (i < items.length - 1) {
            return [
              `    <BreadcrumbItem>`,
              `      <BreadcrumbLink href="#">${item}</BreadcrumbLink>`,
              `    </BreadcrumbItem>`,
              `    <BreadcrumbSeparator />`,
            ].join("\n");
          }
          return [
            `    <BreadcrumbItem>`,
            `      <BreadcrumbPage>${item}</BreadcrumbPage>`,
            `    </BreadcrumbItem>`,
          ].join("\n");
        })
        .join("\n");
      return [
        `<Breadcrumb>`,
        `  <BreadcrumbList>`,
        crumbs,
        `  </BreadcrumbList>`,
        `</Breadcrumb>`,
      ].join("\n");
    }

    case "Pagination":
      return [
        `<Pagination>`,
        `  <PaginationContent>`,
        `    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>`,
        `    <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>`,
        `    <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>`,
        `    <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>`,
        `    <PaginationItem><PaginationNext href="#" /></PaginationItem>`,
        `  </PaginationContent>`,
        `</Pagination>`,
      ].join("\n");

    case "Table": {
      const headers = (props.headers as string[]) ?? ["Col 1", "Col 2"];
      const rows = (props.rows as string[][]) ?? [["Cell", "Cell"]];
      const headerCells = headers
        .map((h) => `        <TableHead>${h}</TableHead>`)
        .join("\n");
      const bodyRows = rows
        .map((row) => {
          const cells = row
            .map((cell) => `        <TableCell>${cell}</TableCell>`)
            .join("\n");
          return `      <TableRow>\n${cells}\n      </TableRow>`;
        })
        .join("\n");
      return [
        `<Table>`,
        `  <TableHeader>`,
        `    <TableRow>`,
        headerCells,
        `    </TableRow>`,
        `  </TableHeader>`,
        `  <TableBody>`,
        bodyRows,
        `  </TableBody>`,
        `</Table>`,
      ].join("\n");
    }

    default:
      return `<div className="text-xs text-muted-foreground">{/* ${type} */}</div>`;
  }
}

function buildImports(types: string[]): string {
  // Collect all named imports, grouped by module path
  const byModule = new Map<string, Set<string>>();

  for (const type of types) {
    const specs = IMPORT_MAP[type] ?? [];
    for (const { from, named } of specs) {
      if (!byModule.has(from)) byModule.set(from, new Set());
      for (const n of named) byModule.get(from)!.add(n);
    }
  }

  return Array.from(byModule.entries())
    .map(([from, names]) => {
      const sorted = Array.from(names).sort();
      return `import { ${sorted.join(", ")} } from "${from}";`;
    })
    .join("\n");
}

export function generateComponent(
  instances: ComponentInstance[],
  name = "GeneratedComponent",
): string {
  if (instances.length === 0) {
    return [
      `"use client";`,
      ``,
      `export default function ${name}() {`,
      `  return <div />;`,
      `}`,
    ].join("\n");
  }

  // Bounding box — only render the used region
  const maxCol = Math.max(...instances.map((i) => i.col + i.colSpan - 1));
  const maxRow = Math.max(...instances.map((i) => i.row + i.rowSpan - 1));
  const width = maxCol * CELL_SIZE;
  const height = maxRow * CELL_SIZE;

  const usedTypes = Array.from(new Set(instances.map((i) => i.type)));
  const imports = buildImports(usedTypes);

  const children = instances
    .map((inst, idx) => {
      const top = (inst.row - 1) * CELL_SIZE;
      const left = (inst.col - 1) * CELL_SIZE;
      const w = inst.colSpan * CELL_SIZE;
      const h = inst.rowSpan * CELL_SIZE;
      const jsx = ind(renderJsx(inst.type, inst.props, idx), 8);
      return [
        `      <div`,
        `        style={{`,
        `          position: "absolute",`,
        `          top: ${top},`,
        `          left: ${left},`,
        `          width: ${w},`,
        `          height: ${h},`,
        `        }}`,
        `      >`,
        jsx,
        `      </div>`,
      ].join("\n");
    })
    .join("\n");

  return [
    `"use client";`,
    ``,
    imports,
    ``,
    `export default function ${name}() {`,
    `  return (`,
    `    <div className="relative" style={{ width: ${width}, height: ${height} }}>`,
    children,
    `    </div>`,
    `  );`,
    `}`,
  ].join("\n");
}

export function exportLayout(instances: ComponentInstance[], name = "layout") {
  const json = JSON.stringify(instances, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importLayout(
  onLoad: (instances: ComponentInstance[]) => void,
) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json,application/json";
  input.onchange = () => {
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (Array.isArray(data)) onLoad(data as ComponentInstance[]);
      } catch {
        // ignore malformed files
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

export function downloadComponent(instances: ComponentInstance[], name = "GeneratedComponent") {
  const code = generateComponent(instances, name);
  const blob = new Blob([code], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name}.tsx`;
  a.click();
  URL.revokeObjectURL(url);
}
