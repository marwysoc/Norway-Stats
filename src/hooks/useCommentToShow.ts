import { useSavedStatsStore } from "../store"

const useCommentToShow = (id: any) => {
    const savedStatsStore = useSavedStatsStore()

    const index = savedStatsStore.savedStats.findIndex((stat) => stat.id === id)
    const commentToShow = savedStatsStore.savedStats[index].comment

    return commentToShow
}

export { useCommentToShow }