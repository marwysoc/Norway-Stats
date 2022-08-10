import { SavedStat } from '../components/BarChart'

const savedStats: SavedStat[] = JSON.parse(localStorage.getItem('savedStats') || '[]') || []

export const initialSavedStats: SavedStat[] = savedStats
