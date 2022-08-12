import create from 'zustand'

import { devtools, persist } from 'zustand/middleware'

import { SavedStat } from '../components/BarChart'

import { initialSavedStats } from './initialSavedStats'

export interface CommentData {
  comment: string;
  commentOwner: string;
}

interface SavedStatsStore {
  savedStats: SavedStat[];
  addStatComment: (id: any, comment: CommentData) => void;
  addStat: (stat: SavedStat) => void;
}

export const useSavedStatsStore = create<SavedStatsStore>()(
  devtools(
    persist((set) => ({
      savedStats: initialSavedStats,
      addStatComment: (id, comment) => set((state) => ({
        ...state,
        savedStats: state.savedStats.map((stat) =>
          stat.id === id
            ? ({ ...stat, comment: comment })
            : stat
        )
      })),
      addStat: (stat) => set((state) => ({...state, savedStats: [...state.savedStats, stat] }))
    })),
    {
      name: 'savedStats'
    }
  )
)