"use client";

import { useDraggable } from "@dnd-kit/core";
import { ComponentInstance, useEditorStore } from "@/store/editor";
import { CELL_SIZE } from "./Canvas";
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

function renderComponent(type: string, props: Record<string, unknown>) {
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
      return (
        <Accordion className="w-full" style={getTextStyle(props)}>
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

export default function CanvasInstance({ instance, isSelected }: Props) {
  const selectInstance = useEditorStore((s) => s.selectInstance);
  const resizeInstance = useEditorStore((s) => s.resizeInstance);
  const moveInstance = useEditorStore((s) => s.moveInstance);
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
      const dx = Math.round((me.clientX - startX) / CELL_SIZE);
      const dy = Math.round((me.clientY - startY) / CELL_SIZE);

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
        "flex items-start justify-start overflow-hidden cursor-grab active:cursor-grabbing p-1",
        isDragging && "opacity-50",
        isSelected && "ring-2 ring-blue-500 ring-inset rounded",
      )}
    >
      {renderComponent(instance.type, instance.props)}
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
