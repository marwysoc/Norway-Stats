import create from "zustand";

interface GraphData {
  prices: Array<number>;
  labels: Array<string>;
}

interface GraphStore {
  graphData: GraphData | null;
  setGraphData: (payload: GraphData) => void;
}

export const useGraphStore = create<GraphStore>((set) => ({
  graphData: null,

  setGraphData: (payload) => set((state) => ({ ...state, graphData: payload }))
}));
