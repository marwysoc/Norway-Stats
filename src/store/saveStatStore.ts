import create from 'zustand'

import { devtools, persist } from 'zustand/middleware'

import { SavedStat } from '../components/BarChart'

import { initialSavedStats } from './initialSavedStats'

interface SavedStatsStore {
  savedStats: SavedStat[];
  addStat: (stat: SavedStat) => void;
}

export const useSavedStatsStore = create<SavedStatsStore>()(
  devtools(
    persist((set) => ({
      savedStats: initialSavedStats,
      addStat: (stat) => set((state) => ({ savedStats: [stat, ...state.savedStats] }))
    })),
    {
      name: 'savedStats'
    }
  )
)