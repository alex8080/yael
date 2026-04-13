export type ComponentMeta = {
  type: string;
  label: string;
  defaultProps: Record<string, unknown>;
};

export const COMPONENT_REGISTRY: ComponentMeta[] = [
  {
    type: "Button",
    label: "Button",
    defaultProps: { children: "Button" },
  },
  {
    type: "Text",
    label: "Text",
    defaultProps: { children: "Text block" },
  },
];

export const REGISTRY_MAP: Record<string, ComponentMeta> = Object.fromEntries(
  COMPONENT_REGISTRY.map((c) => [c.type, c]),
);
