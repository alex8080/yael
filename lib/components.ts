export type ComponentMeta = {
  type: string;
  label: string;
  category: string;
  defaultProps: Record<string, unknown>;
  defaultColSpan: number;
  defaultRowSpan: number;
};

export const COMPONENT_REGISTRY: ComponentMeta[] = [
  // Inputs
  {
    type: "Button",
    label: "Button",
    category: "Inputs",
    defaultProps: { children: "Button" },
    defaultColSpan: 3,
    defaultRowSpan: 1,
  },
  {
    type: "Input",
    label: "Input",
    category: "Inputs",
    defaultProps: { placeholder: "Type here..." },
    defaultColSpan: 6,
    defaultRowSpan: 1,
  },
  {
    type: "Textarea",
    label: "Textarea",
    category: "Inputs",
    defaultProps: { placeholder: "Enter text..." },
    defaultColSpan: 6,
    defaultRowSpan: 3,
  },
  {
    type: "Checkbox",
    label: "Checkbox",
    category: "Inputs",
    defaultProps: {},
    defaultColSpan: 4,
    defaultRowSpan: 1,
  },
  {
    type: "Switch",
    label: "Switch",
    category: "Inputs",
    defaultProps: {},
    defaultColSpan: 4,
    defaultRowSpan: 1,
  },
  {
    type: "Slider",
    label: "Slider",
    category: "Inputs",
    defaultProps: { defaultValue: [50], max: 100, step: 1 },
    defaultColSpan: 6,
    defaultRowSpan: 1,
  },
  {
    type: "Toggle",
    label: "Toggle",
    category: "Inputs",
    defaultProps: { children: "Toggle" },
    defaultColSpan: 3,
    defaultRowSpan: 1,
  },
  {
    type: "RadioGroup",
    label: "Radio Group",
    category: "Inputs",
    defaultProps: {},
    defaultColSpan: 4,
    defaultRowSpan: 2,
  },
  {
    type: "Select",
    label: "Select",
    category: "Inputs",
    defaultProps: { placeholder: "Select an option" },
    defaultColSpan: 6,
    defaultRowSpan: 1,
  },
  // Display
  {
    type: "Text",
    label: "Text",
    category: "Display",
    defaultProps: { children: "Text block" },
    defaultColSpan: 6,
    defaultRowSpan: 1,
  },
  {
    type: "Badge",
    label: "Badge",
    category: "Display",
    defaultProps: { children: "Badge" },
    defaultColSpan: 2,
    defaultRowSpan: 1,
  },
  {
    type: "Avatar",
    label: "Avatar",
    category: "Display",
    defaultProps: { fallback: "CN" },
    defaultColSpan: 2,
    defaultRowSpan: 2,
  },
  {
    type: "Separator",
    label: "Separator",
    category: "Display",
    defaultProps: {},
    defaultColSpan: 8,
    defaultRowSpan: 1,
  },
  {
    type: "Skeleton",
    label: "Skeleton",
    category: "Display",
    defaultProps: {},
    defaultColSpan: 6,
    defaultRowSpan: 1,
  },
  {
    type: "Progress",
    label: "Progress",
    category: "Display",
    defaultProps: { value: 60 },
    defaultColSpan: 6,
    defaultRowSpan: 1,
  },
  {
    type: "Alert",
    label: "Alert",
    category: "Display",
    defaultProps: { title: "Alert", description: "This is an alert message." },
    defaultColSpan: 8,
    defaultRowSpan: 2,
  },
  // Layout / Containers
  {
    type: "Card",
    label: "Card",
    category: "Layout",
    defaultProps: { title: "Card Title", description: "Card description." },
    defaultColSpan: 6,
    defaultRowSpan: 5,
  },
  {
    type: "Accordion",
    label: "Accordion",
    category: "Layout",
    defaultProps: { items: [{ trigger: "Section 1", content: "Content 1" }, { trigger: "Section 2", content: "Content 2" }] },
    defaultColSpan: 8,
    defaultRowSpan: 5,
  },
  {
    type: "Tabs",
    label: "Tabs",
    category: "Layout",
    defaultProps: { tabs: [{ label: "Tab 1", content: "Content 1" }, { label: "Tab 2", content: "Content 2" }] },
    defaultColSpan: 8,
    defaultRowSpan: 4,
  },
  {
    type: "ScrollArea",
    label: "Scroll Area",
    category: "Layout",
    defaultProps: {},
    defaultColSpan: 6,
    defaultRowSpan: 4,
  },
  // Navigation
  {
    type: "Breadcrumb",
    label: "Breadcrumb",
    category: "Navigation",
    defaultProps: { items: ["Home", "Section", "Page"] },
    defaultColSpan: 8,
    defaultRowSpan: 1,
  },
  {
    type: "Pagination",
    label: "Pagination",
    category: "Navigation",
    defaultProps: {},
    defaultColSpan: 8,
    defaultRowSpan: 1,
  },
  // Data
  {
    type: "Table",
    label: "Table",
    category: "Data",
    defaultProps: {
      headers: ["Name", "Status", "Amount"],
      rows: [
        ["Alice", "Active", "$100"],
        ["Bob", "Inactive", "$200"],
      ],
    },
    defaultColSpan: 10,
    defaultRowSpan: 5,
  },
];

export const REGISTRY_MAP: Record<string, ComponentMeta> = Object.fromEntries(
  COMPONENT_REGISTRY.map((c) => [c.type, c]),
);

export const CATEGORIES = Array.from(
  new Set(COMPONENT_REGISTRY.map((c) => c.category)),
);
