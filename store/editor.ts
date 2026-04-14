import { create } from "zustand";

export type ComponentInstance = {
  id: string;
  type: string;
  col: number;
  row: number;
  colSpan: number;
  rowSpan: number;
  props: Record<string, unknown>;
};

type EditorState = {
  instances: ComponentInstance[];
  selectedId: string | null;
  fontScale: number;

  addInstance: (
    type: string,
    col: number,
    row: number,
    defaultProps?: Record<string, unknown>,
    colSpan?: number,
    rowSpan?: number,
  ) => void;
  moveInstance: (id: string, col: number, row: number) => void;
  resizeInstance: (id: string, colSpan: number, rowSpan: number) => void;
  selectInstance: (id: string | null) => void;
  removeInstance: (id: string) => void;
  updateProps: (id: string, props: Record<string, unknown>) => void;
  loadInstances: (instances: ComponentInstance[]) => void;
  setFontScale: (scale: number) => void;
};

export const useEditorStore = create<EditorState>((set) => ({
  instances: [],
  selectedId: null,
  fontScale: 1,

  addInstance: (type, col, row, defaultProps = {}, colSpan = 1, rowSpan = 1) =>
    set((state) => ({
      instances: [
        ...state.instances,
        {
          id: crypto.randomUUID(),
          type,
          col,
          row,
          colSpan,
          rowSpan,
          props: defaultProps,
        },
      ],
    })),

  moveInstance: (id, col, row) =>
    set((state) => ({
      instances: state.instances.map((inst) =>
        inst.id === id ? { ...inst, col, row } : inst,
      ),
    })),

  resizeInstance: (id, colSpan, rowSpan) =>
    set((state) => ({
      instances: state.instances.map((inst) =>
        inst.id === id ? { ...inst, colSpan, rowSpan } : inst,
      ),
    })),

  selectInstance: (id) => set({ selectedId: id }),

  removeInstance: (id) =>
    set((state) => ({
      instances: state.instances.filter((inst) => inst.id !== id),
      selectedId: state.selectedId === id ? null : state.selectedId,
    })),

  updateProps: (id, props) =>
    set((state) => ({
      instances: state.instances.map((inst) =>
        inst.id === id ? { ...inst, props: { ...inst.props, ...props } } : inst,
      ),
    })),

  loadInstances: (instances) => set({ instances, selectedId: null }),
  setFontScale: (scale) => set({ fontScale: Math.max(0.5, Math.min(3, Math.round(scale * 4) / 4)) }),
}));
