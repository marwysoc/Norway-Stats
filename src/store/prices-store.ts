import create from "zustand";

interface GraphData {
  prices: Array<string>;
  labels: Array<string>;
}

interface PricesStore {
  graphData: GraphData | null;
  setGraphData: (payload: GraphData) => void;
}

export const usePricesStore = create<PricesStore>((set) => ({
  graphData: null,

  setGraphData: (payload) => set((state) => ({ ...state, graphData: payload })),
}));
