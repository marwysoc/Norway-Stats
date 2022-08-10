import create from 'zustand'

import {devtools, persist} from 'zustand/middleware'

import { SavedStat } from '../components/BarChart'

import { initialSavedStats } from './initialSavedStats'

interface SavedStatsState {
  savedStats: SavedStat[];
  addStat: (stat: SavedStat) => void;
}

export const useSavedStatsStore = create<SavedStatsState>()(
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