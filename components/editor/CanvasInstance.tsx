"use client";

import { useDraggable, useDroppable } from "@dnd-kit/core";
import { ComponentInstance, useEditorStore } from "@/store/editor";
import { cellSize } from "./Canvas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type RenderCtx = {
  instanceId: string;
  instances: ComponentInstance[];
  selectInstance: (id: string | null) => void;
  selectedId: string | null;
};

type Props = {
  instance: ComponentInstance;
  isSelected: boolean;
};

function getTextStyle(props: Record<string, unknown>): React.CSSProperties {
  const style: React.CSSProperties = {};
  if (props.fontSize) style.fontSize = `${props.fontSize}px`;
  if (props.fontWeight) style.fontWeight = props.fontWeight as string;
  if (props.fontStyle) style.fontStyle = props.fontStyle as string;
  if (props.fontFamily) style.fontFamily = props.fontFamily as string;
  return style;
}

function renderComponent(type: string, props: Record<string, unknown>, ctx?: RenderCtx) {
  switch (type) {
    case "Button": {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { fontSize: _fs, fontWeight: _fw, fontStyle: _fst, fontFamily: _ff, ...rest } = props;
      return (
        <Button
          {...(rest as React.ComponentProps<typeof Button>)}
          style={getTextStyle(props)}
        />
      );
    }

    case "Text":
      return (
        <p
          className="text-foreground"
          style={{ fontSize: "0.875rem", ...getTextStyle(props) }}
        >
          {String(props.children ?? "")}
        </p>
      );

    case "Input":
      return (
        <Input
          placeholder={String(props.placeholder ?? "")}
          style={getTextStyle(props)}
          className="w-full"
        />
      );

    case "Textarea":
      return (
        <Textarea
          placeholder={String(props.placeholder ?? "")}
          style={getTextStyle(props)}
          className="w-full"
        />
      );

    case "Checkbox":
      return (
        <div className="flex items-center gap-2">
          <Checkbox id="cb" />
          <Label htmlFor="cb" style={getTextStyle(props)}>{String(props.label ?? "Option")}</Label>
        </div>
      );

    case "Switch":
      return (
        <div className="flex items-center gap-2">
          <Switch id="sw" />
          <Label htmlFor="sw" style={getTextStyle(props)}>{String(props.label ?? "Toggle")}</Label>
        </div>
      );

    case "Slider":
      return (
        <Slider
          defaultValue={(props.defaultValue as number[]) ?? [50]}
          max={(props.max as number) ?? 100}
          step={(props.step as number) ?? 1}
          className="w-full"
        />
      );

    case "Toggle":
      return (
        <Toggle style={getTextStyle(props)}>
          {String(props.children ?? "Toggle")}
        </Toggle>
      );

    case "RadioGroup": {
      const options = (props.options as string[]) ?? ["Option 1", "Option 2"];
      return (
        <RadioGroup defaultValue={options[0]} className="flex flex-col gap-1">
          {options.map((opt, i) => (
            <div key={i} className="flex items-center gap-2">
              <RadioGroupItem value={opt} id={`r-${i}`} />
              <Label htmlFor={`r-${i}`}>{opt}</Label>
            </div>
          ))}
        </RadioGroup>
      );
    }

    case "Select": {
      const options = (props.options as string[]) ?? ["Option A", "Option B", "Option C"];
      return (
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={String(props.placeholder ?? "Select...")} />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt, i) => (
              <SelectItem key={i} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    case "Badge":
      return (
        <Badge style={getTextStyle(props)}>
          {String(props.children ?? "Badge")}
        </Badge>
      );

    case "Avatar":
      return (
        <Avatar>
          <AvatarFallback>{String(props.fallback ?? "CN")}</AvatarFallback>
        </Avatar>
      );

    case "Separator":
      return <Separator className="w-full" />;

    case "Skeleton":
      return <Skeleton className="w-full h-8 rounded" />;

    case "Progress":
      return <Progress value={(props.value as number) ?? 60} className="w-full" />;

    case "Alert":
      return (
        <Alert className="w-full" style={getTextStyle(props)}>
          <AlertTitle>{String(props.title ?? "Alert")}</AlertTitle>
          <AlertDescription>
            {String(props.description ?? "")}
          </AlertDescription>
        </Alert>
      );

    case "Card":
      if (ctx) {
        return (
          <CardPreview
            instanceId={ctx.instanceId}
            instances={ctx.instances}
            selectInstance={ctx.selectInstance}
            selectedId={ctx.selectedId}
            style={getTextStyle(props)}
            title={String(props.title ?? "Card Title")}
            description={String(props.description ?? "")}
          />
        );
      }
      return (
        <Card className="w-full" style={getTextStyle(props)}>
          <CardHeader>
            <CardTitle>{String(props.title ?? "Card Title")}</CardTitle>
            <CardDescription>
              {String(props.description ?? "")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Card content</p>
          </CardContent>
        </Card>
      );

    case "Accordion": {
      const items = (props.items as { trigger: string; content: string }[]) ?? [];
      if (ctx) {
        return (
          <AccordionPreview
            instanceId={ctx.instanceId}
            items={items}
            instances={ctx.instances}
            selectInstance={ctx.selectInstance}
            selectedId={ctx.selectedId}
            style={getTextStyle(props)}
          />
        );
      }
      // Fallback when ctx is unavailable
      return (
        <Accordion multiple defaultValue={items.map((_, i) => `item-${i}`)} className="w-full" style={getTextStyle(props)}>
          {items.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      );
    }

    case "Tabs": {
      const tabs = (props.tabs as { label: string; content: string }[]) ?? [];
      if (ctx) {
        return (
          <TabsPreview
            instanceId={ctx.instanceId}
            tabs={tabs}
            instances={ctx.instances}
            selectInstance={ctx.selectInstance}
            selectedId={ctx.selectedId}
            style={getTextStyle(props)}
          />
        );
      }
      const first = tabs[0]?.label ?? "tab0";
      return (
        <Tabs defaultValue={first} className="w-full" style={getTextStyle(props)}>
          <TabsList>
            {tabs.map((t) => (
              <TabsTrigger key={t.label} value={t.label}>
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((t) => (
            <TabsContent key={t.label} value={t.label}>
              <p className="text-sm">{t.content}</p>
            </TabsContent>
          ))}
        </Tabs>
      );
    }

    case "ScrollArea":
      if (ctx) {
        return (
          <ScrollAreaPreview
            instanceId={ctx.instanceId}
            instances={ctx.instances}
            selectInstance={ctx.selectInstance}
            selectedId={ctx.selectedId}
            style={getTextStyle(props)}
          />
        );
      }
      return (
        <ScrollArea className="w-full h-24 rounded border p-2">
          <p className="text-sm text-muted-foreground">Scrollable content area</p>
        </ScrollArea>
      );

    case "Breadcrumb": {
      const items = (props.items as string[]) ?? ["Home", "Page"];
      return (
        <Breadcrumb style={getTextStyle(props)}>
          <BreadcrumbList>
            {items.map((item, i) => (
              <span key={i} className="flex items-center gap-1">
                {i < items.length - 1 ? (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">{item}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbPage>{item}</BreadcrumbPage>
                  </BreadcrumbItem>
                )}
              </span>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      );
    }

    case "Pagination":
      return (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );

    case "Table": {
      const headers = (props.headers as string[]) ?? ["Col 1", "Col 2"];
      const rows = (props.rows as string[][]) ?? [["Cell", "Cell"]];
      return (
        <Table style={getTextStyle(props)}>
          <TableHeader>
            <TableRow>
              {headers.map((h) => (
                <TableHead key={h}>{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i}>
                {row.map((cell, j) => (
                  <TableCell key={j}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }

    default:
      return (
        <div className="text-xs text-muted-foreground">{type}</div>
      );
  }
}

type HandlePos = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

const HANDLE_DEFS: { pos: HandlePos; cursor: string; style: React.CSSProperties }[] = [
  { pos: "n",  cursor: "ns-resize",   style: { top: -4,    left: "50%", transform: "translateX(-50%)", width: 16, height: 8  } },
  { pos: "s",  cursor: "ns-resize",   style: { bottom: -4, left: "50%", transform: "translateX(-50%)", width: 16, height: 8  } },
  { pos: "e",  cursor: "ew-resize",   style: { right: -4,  top:  "50%", transform: "translateY(-50%)", width: 8,  height: 16 } },
  { pos: "w",  cursor: "ew-resize",   style: { left: -4,   top:  "50%", transform: "translateY(-50%)", width: 8,  height: 16 } },
  { pos: "ne", cursor: "nesw-resize", style: { top: -4,    right:  -4,  width: 8,  height: 8 } },
  { pos: "nw", cursor: "nwse-resize", style: { top: -4,    left:   -4,  width: 8,  height: 8 } },
  { pos: "se", cursor: "nwse-resize", style: { bottom: -4, right:  -4,  width: 8,  height: 8 } },
  { pos: "sw", cursor: "nesw-resize", style: { bottom: -4, left:   -4,  width: 8,  height: 8 } },
];

function SlotChild({
  child,
  selectInstance,
  selectedId,
}: {
  child: ComponentInstance;
  selectInstance: (id: string | null) => void;
  selectedId: string | null;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: child.id,
    data: { isSlotChild: true },
  });
  const resizeInstance = useEditorStore((s) => s.resizeInstance);
  const moveInstance = useEditorStore((s) => s.moveInstance);
  const fontScale = useEditorStore((s) => s.fontScale);
  const cs = cellSize(fontScale);
  const isSelected = selectedId === child.id;

  function startResize(e: React.PointerEvent, pos: HandlePos) {
    e.stopPropagation();
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const { col, row, colSpan, rowSpan, id } = child;

    function onMove(me: PointerEvent) {
      const dx = Math.round((me.clientX - startX) / cs);
      const dy = Math.round((me.clientY - startY) / cs);
      let newColSpan = colSpan;
      let newRowSpan = rowSpan;
      let newCol = col;
      let newRow = row;
      if (pos.includes("e")) newColSpan = Math.max(1, colSpan + dx);
      if (pos.includes("s")) newRowSpan = Math.max(1, rowSpan + dy);
      if (pos.includes("w")) {
        newColSpan = Math.max(1, colSpan - dx);
        newCol = col + colSpan - newColSpan;
      }
      if (pos.includes("n")) {
        newRowSpan = Math.max(1, rowSpan - dy);
        newRow = row + rowSpan - newRowSpan;
      }
      resizeInstance(id, newColSpan, newRowSpan);
      if (newCol !== col || newRow !== row) moveInstance(id, newCol, newRow);
    }

    function onUp() {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  const col = Math.max(1, child.col);
  const row = Math.max(1, child.row);

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={(e) => {
        e.stopPropagation();
        selectInstance(child.id);
      }}
      style={{
        gridColumn: `${col} / span ${child.colSpan}`,
        gridRow: `${row} / span ${child.rowSpan}`,
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
        zIndex: isDragging ? 50 : isSelected ? 10 : 1,
        position: "relative",
      }}
      className={cn(
        "flex items-stretch overflow-hidden cursor-grab active:cursor-grabbing p-1",
        isDragging && "opacity-50",
        isSelected && "ring-2 ring-blue-500 ring-inset rounded",
      )}
    >
      {renderComponent(child.type, child.props)}
      {isSelected && HANDLE_DEFS.map(({ pos, cursor, style }) => (
        <div
          key={pos}
          onPointerDown={(e) => startResize(e, pos)}
          style={{
            position: "absolute",
            cursor,
            background: "white",
            border: "1.5px solid #3b82f6",
            borderRadius: 2,
            ...style,
          }}
        />
      ))}
    </div>
  );
}

function ContainerSlot({
  slotId,
  slotChildren,
  selectInstance,
  selectedId,
  internalCols,
  internalRows,
}: {
  slotId: string;
  slotChildren: ComponentInstance[];
  selectInstance: (id: string | null) => void;
  selectedId: string | null;
  internalCols: number;
  internalRows: number;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: slotId });
  const fontScale = useEditorStore((s) => s.fontScale);
  const cs = cellSize(fontScale);
  const w = internalCols * cs;
  const h = internalRows * cs;

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "relative rounded transition-colors",
        isOver && "ring-2 ring-blue-400 ring-inset",
      )}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${internalCols}, ${cs}px)`,
        gridTemplateRows: `repeat(${internalRows}, ${cs}px)`,
        width: w,
        height: h,
        backgroundImage: [
          "linear-gradient(to right, #e5e7eb 1px, transparent 1px)",
          "linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
        ].join(", "),
        backgroundSize: `${cs}px ${cs}px`,
        backgroundColor: isOver ? "rgb(239 246 255)" : "transparent",
      }}
    >
      {slotChildren.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-xs text-muted-foreground/40">drop here</p>
        </div>
      )}
      {slotChildren.map((child) => (
        <SlotChild
          key={child.id}
          child={child}
          selectInstance={selectInstance}
          selectedId={selectedId}
        />
      ))}
    </div>
  );
}

function AccordionPreview({
  instanceId,
  items,
  instances,
  selectInstance,
  selectedId,
  style,
}: {
  instanceId: string;
  items: { trigger: string; content: string }[];
  instances: ComponentInstance[];
  selectInstance: (id: string | null) => void;
  selectedId: string | null;
  style?: React.CSSProperties;
}) {
  const parent = instances.find((i) => i.id === instanceId);
  const parentCols = parent?.colSpan ?? 4;
  const parentRows = parent?.rowSpan ?? 4;
  const n = Math.max(1, items.length);
  // Each accordion item has a trigger row; remaining rows split across content slots
  const contentRowsPerSlot = Math.max(2, Math.floor((parentRows - n) / n));

  const allValues = items.map((_, i) => `item-${i}`);
  return (
    <Accordion multiple defaultValue={allValues} className="w-full" style={style}>
      {items.map((item, i) => {
        const slotKey = `item-${i}`;
        const slotId = `slot:${instanceId}:${slotKey}`;
        const slotChildren = instances.filter(
          (inst) => inst.parentId === instanceId && inst.slotKey === slotKey,
        );
        return (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger>{item.trigger}</AccordionTrigger>
            <AccordionContent>
              <ContainerSlot
                slotId={slotId}
                slotChildren={slotChildren}
                selectInstance={selectInstance}
                selectedId={selectedId}
                internalCols={parentCols}
                internalRows={contentRowsPerSlot}
              />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

function CardPreview({
  instanceId,
  instances,
  selectInstance,
  selectedId,
  style,
  title,
  description,
}: {
  instanceId: string;
  instances: ComponentInstance[];
  selectInstance: (id: string | null) => void;
  selectedId: string | null;
  style?: React.CSSProperties;
  title: string;
  description: string;
}) {
  const parent = instances.find((i) => i.id === instanceId);
  const parentCols = parent?.colSpan ?? 4;
  const parentRows = parent?.rowSpan ?? 4;
  // ~2 rows consumed by CardHeader (title + description + padding)
  const contentRows = Math.max(2, parentRows - 2);

  const slotId = `slot:${instanceId}:content`;
  const slotChildren = instances.filter(
    (inst) => inst.parentId === instanceId && inst.slotKey === "content",
  );
  return (
    <Card className="w-full" style={style}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <ContainerSlot
          slotId={slotId}
          slotChildren={slotChildren}
          selectInstance={selectInstance}
          selectedId={selectedId}
          internalCols={parentCols}
          internalRows={contentRows}
        />
      </CardContent>
    </Card>
  );
}

function TabsPreview({
  instanceId,
  tabs,
  instances,
  selectInstance,
  selectedId,
  style,
}: {
  instanceId: string;
  tabs: { label: string; content: string }[];
  instances: ComponentInstance[];
  selectInstance: (id: string | null) => void;
  selectedId: string | null;
  style?: React.CSSProperties;
}) {
  const parent = instances.find((i) => i.id === instanceId);
  const parentCols = parent?.colSpan ?? 4;
  const parentRows = parent?.rowSpan ?? 4;
  // ~1 row consumed by TabsList
  const contentRows = Math.max(2, parentRows - 1);

  const first = tabs[0]?.label ?? "tab0";
  return (
    <Tabs defaultValue={first} className="w-full" style={style}>
      <TabsList>
        {tabs.map((t) => (
          <TabsTrigger key={t.label} value={t.label}>
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((t, i) => {
        const slotKey = `tab-${i}`;
        const slotId = `slot:${instanceId}:${slotKey}`;
        const slotChildren = instances.filter(
          (inst) => inst.parentId === instanceId && inst.slotKey === slotKey,
        );
        return (
          <TabsContent key={t.label} value={t.label} className="mt-1">
            <ContainerSlot
              slotId={slotId}
              slotChildren={slotChildren}
              selectInstance={selectInstance}
              selectedId={selectedId}
              internalCols={parentCols}
              internalRows={contentRows}
            />
          </TabsContent>
        );
      })}
    </Tabs>
  );
}

function ScrollAreaPreview({
  instanceId,
  instances,
  selectInstance,
  selectedId,
  style,
}: {
  instanceId: string;
  instances: ComponentInstance[];
  selectInstance: (id: string | null) => void;
  selectedId: string | null;
  style?: React.CSSProperties;
}) {
  const parent = instances.find((i) => i.id === instanceId);
  const parentCols = parent?.colSpan ?? 4;
  const parentRows = parent?.rowSpan ?? 4;
  const fontScale = useEditorStore((s) => s.fontScale);
  const cs = cellSize(fontScale);

  const slotId = `slot:${instanceId}:content`;
  const slotChildren = instances.filter(
    (inst) => inst.parentId === instanceId && inst.slotKey === "content",
  );
  return (
    <ScrollArea
      className="rounded border"
      style={{ ...style, width: parentCols * cs, height: parentRows * cs }}
    >
      <ContainerSlot
        slotId={slotId}
        slotChildren={slotChildren}
        selectInstance={selectInstance}
        selectedId={selectedId}
        internalCols={parentCols}
        internalRows={parentRows}
      />
    </ScrollArea>
  );
}

export default function CanvasInstance({ instance, isSelected }: Props) {
  const selectInstance = useEditorStore((s) => s.selectInstance);
  const resizeInstance = useEditorStore((s) => s.resizeInstance);
  const moveInstance = useEditorStore((s) => s.moveInstance);
  const fontScale = useEditorStore((s) => s.fontScale);
  const instances = useEditorStore((s) => s.instances);
  const selectedId = useEditorStore((s) => s.selectedId);
  const cs = cellSize(fontScale);
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: instance.id,
      data: { isCanvas: true },
    });

  function startResize(e: React.PointerEvent, pos: HandlePos) {
    e.stopPropagation();
    e.preventDefault();

    const startX = e.clientX;
    const startY = e.clientY;
    const { col, row, colSpan, rowSpan, id } = instance;

    function onMove(me: PointerEvent) {
      const dx = Math.round((me.clientX - startX) / cs);
      const dy = Math.round((me.clientY - startY) / cs);

      let newColSpan = colSpan;
      let newRowSpan = rowSpan;
      let newCol = col;
      let newRow = row;

      if (pos.includes("e")) newColSpan = Math.max(1, colSpan + dx);
      if (pos.includes("s")) newRowSpan = Math.max(1, rowSpan + dy);
      if (pos.includes("w")) {
        newColSpan = Math.max(1, colSpan - dx);
        newCol = col + colSpan - newColSpan;
      }
      if (pos.includes("n")) {
        newRowSpan = Math.max(1, rowSpan - dy);
        newRow = row + rowSpan - newRowSpan;
      }

      resizeInstance(id, newColSpan, newRowSpan);
      if (newCol !== col || newRow !== row) {
        moveInstance(id, newCol, newRow);
      }
    }

    function onUp() {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

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
        position: "relative",
      }}
      className={cn(
        "flex items-stretch justify-start overflow-hidden cursor-grab active:cursor-grabbing p-1",
        isDragging && "opacity-50",
        isSelected && "ring-2 ring-blue-500 ring-inset rounded",
      )}
    >
      {renderComponent(instance.type, instance.props, { instanceId: instance.id, instances, selectInstance, selectedId })}
      {isSelected &&
        HANDLE_DEFS.map(({ pos, cursor, style }) => (
          <div
            key={pos}
            onPointerDown={(e) => startResize(e, pos)}
            style={{
              position: "absolute",
              cursor,
              background: "white",
              border: "1.5px solid #3b82f6",
              borderRadius: 2,
              ...style,
            }}
          />
        ))}
    </div>
  );
}
