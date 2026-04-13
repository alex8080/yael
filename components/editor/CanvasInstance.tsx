"use client";

import { useDraggable } from "@dnd-kit/core";
import { ComponentInstance, useEditorStore } from "@/store/editor";
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

function renderComponent(type: string, props: Record<string, unknown>) {
  switch (type) {
    case "Button":
      return <Button {...(props as React.ComponentProps<typeof Button>)} />;

    case "Text":
      return (
        <p className="text-sm text-foreground">
          {String(props.children ?? "")}
        </p>
      );

    case "Input":
      return (
        <Input
          placeholder={String(props.placeholder ?? "")}
          className="w-full"
        />
      );

    case "Textarea":
      return (
        <Textarea
          placeholder={String(props.placeholder ?? "")}
          className="w-full"
        />
      );

    case "Checkbox":
      return (
        <div className="flex items-center gap-2">
          <Checkbox id="cb" />
          <Label htmlFor="cb">{String(props.label ?? "Option")}</Label>
        </div>
      );

    case "Switch":
      return (
        <div className="flex items-center gap-2">
          <Switch id="sw" />
          <Label htmlFor="sw">{String(props.label ?? "Toggle")}</Label>
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
      return <Toggle>{String(props.children ?? "Toggle")}</Toggle>;

    case "RadioGroup":
      return (
        <RadioGroup defaultValue="option1" className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option1" id="r1" />
            <Label htmlFor="r1">Option 1</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option2" id="r2" />
            <Label htmlFor="r2">Option 2</Label>
          </div>
        </RadioGroup>
      );

    case "Select":
      return (
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={String(props.placeholder ?? "Select...")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Option A</SelectItem>
            <SelectItem value="b">Option B</SelectItem>
            <SelectItem value="c">Option C</SelectItem>
          </SelectContent>
        </Select>
      );

    case "Badge":
      return <Badge>{String(props.children ?? "Badge")}</Badge>;

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
        <Alert className="w-full">
          <AlertTitle>{String(props.title ?? "Alert")}</AlertTitle>
          <AlertDescription>
            {String(props.description ?? "")}
          </AlertDescription>
        </Alert>
      );

    case "Card":
      return (
        <Card className="w-full">
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
        <Accordion className="w-full">
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
        <Tabs defaultValue={first} className="w-full">
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
        <Breadcrumb>
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
        <Table>
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

export default function CanvasInstance({ instance, isSelected }: Props) {
  const selectInstance = useEditorStore((s) => s.selectInstance);
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: instance.id,
      data: { isCanvas: true },
    });

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
      }}
      className={cn(
        "flex items-center justify-center cursor-grab active:cursor-grabbing",
        isDragging && "opacity-50",
        isSelected && "ring-2 ring-blue-500 ring-inset rounded",
      )}
    >
      {renderComponent(instance.type, instance.props)}
    </div>
  );
}
