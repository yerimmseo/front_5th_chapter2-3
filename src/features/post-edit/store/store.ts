import { create } from "zustand"

interface PostEditStore {
  newPost: { title: string; body: string; userId: number }
  showAddDialog: boolean
  showEditDialog: boolean

  setNewPost: (post: { title: string; body: string; userId: number }) => void
  setShowAddDialog: (show: boolean) => void
  setShowEditDialog: (show: boolean) => void
  resetNewPost: () => void
}

export const usePostEditStore = create<PostEditStore>((set) => ({
  newPost: { title: "", body: "", userId: 1 },
  showAddDialog: false,
  showEditDialog: false,

  setNewPost: (post) => set({ newPost: post }),
  setShowAddDialog: (show) => set({ showAddDialog: show }),
  setShowEditDialog: (show) => set({ showEditDialog: show }),
  resetNewPost: () => set({ newPost: { title: "", body: "", userId: 1 } }),
}))
