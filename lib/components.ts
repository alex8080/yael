export type ComponentMeta = {
  type: string;
  label: string;
  category: string;
  defaultProps: Record<string, unknown>;
};

export const COMPONENT_REGISTRY: ComponentMeta[] = [
  // Inputs
  {
    type: "Button",
    label: "Button",
    category: "Inputs",
    defaultProps: { children: "Button" },
  },
  {
    type: "Input",
    label: "Input",
    category: "Inputs",
    defaultProps: { placeholder: "Type here..." },
  },
  {
    type: "Textarea",
    label: "Textarea",
    category: "Inputs",
    defaultProps: { placeholder: "Enter text..." },
  },
  {
    type: "Checkbox",
    label: "Checkbox",
    category: "Inputs",
    defaultProps: {},
  },
  {
    type: "Switch",
    label: "Switch",
    category: "Inputs",
    defaultProps: {},
  },
  {
    type: "Slider",
    label: "Slider",
    category: "Inputs",
    defaultProps: { defaultValue: [50], max: 100, step: 1 },
  },
  {
    type: "Toggle",
    label: "Toggle",
    category: "Inputs",
    defaultProps: { children: "Toggle" },
  },
  {
    type: "RadioGroup",
    label: "Radio Group",
    category: "Inputs",
    defaultProps: {},
  },
  {
    type: "Select",
    label: "Select",
    category: "Inputs",
    defaultProps: { placeholder: "Select an option" },
  },
  // Display
  {
    type: "Text",
    label: "Text",
    category: "Display",
    defaultProps: { children: "Text block" },
  },
  {
    type: "Badge",
    label: "Badge",
    category: "Display",
    defaultProps: { children: "Badge" },
  },
  {
    type: "Avatar",
    label: "Avatar",
    category: "Display",
    defaultProps: { fallback: "CN" },
  },
  {
    type: "Separator",
    label: "Separator",
    category: "Display",
    defaultProps: {},
  },
  {
    type: "Skeleton",
    label: "Skeleton",
    category: "Display",
    defaultProps: {},
  },
  {
    type: "Progress",
    label: "Progress",
    category: "Display",
    defaultProps: { value: 60 },
  },
  {
    type: "Alert",
    label: "Alert",
    category: "Display",
    defaultProps: { title: "Alert", description: "This is an alert message." },
  },
  // Layout / Containers
  {
    type: "Card",
    label: "Card",
    category: "Layout",
    defaultProps: { title: "Card Title", description: "Card description." },
  },
  {
    type: "Accordion",
    label: "Accordion",
    category: "Layout",
    defaultProps: { items: [{ trigger: "Section 1", content: "Content 1" }, { trigger: "Section 2", content: "Content 2" }] },
  },
  {
    type: "Tabs",
    label: "Tabs",
    category: "Layout",
    defaultProps: { tabs: [{ label: "Tab 1", content: "Content 1" }, { label: "Tab 2", content: "Content 2" }] },
  },
  {
    type: "ScrollArea",
    label: "Scroll Area",
    category: "Layout",
    defaultProps: {},
  },
  // Navigation
  {
    type: "Breadcrumb",
    label: "Breadcrumb",
    category: "Navigation",
    defaultProps: { items: ["Home", "Section", "Page"] },
  },
  {
    type: "Pagination",
    label: "Pagination",
    category: "Navigation",
    defaultProps: {},
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
  },
];

export const REGISTRY_MAP: Record<string, ComponentMeta> = Object.fromEntries(
  COMPONENT_REGISTRY.map((c) => [c.type, c]),
);

export const CATEGORIES = Array.from(
  new Set(COMPONENT_REGISTRY.map((c) => c.category)),
);
