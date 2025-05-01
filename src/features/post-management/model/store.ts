import { create } from "zustand"

interface PostManagementStore {
  searchQuery: string
  selectedTag: string
  sortBy: string
  sortOrder: string
  skip: number
  limit: number
  loading: boolean

  setSearchQuery: (query: string) => void
  setSelectedTag: (tag: string) => void
  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  setSortBy: (sortBy: string) => void
  setSortOrder: (sortOrder: string) => void
}

export const usePostManagementStore = create<PostManagementStore>((set) => ({
  searchQuery: "",
  selectedTag: "",
  sortBy: "",
  sortOrder: "asc",
  skip: 0,
  limit: 10,
  loading: false,

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedTag: (tag) => set({ selectedTag: tag }),
  setSkip: (skip) => set({ skip }),
  setLimit: (limit) => set({ limit }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
}))
