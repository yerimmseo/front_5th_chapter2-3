import { create } from "zustand"

interface PostDetailStore {
  showPostDetailDialog: boolean

  setShowPostDetailDialog: (show: boolean) => void
}

export const usePostDetailStore = create<PostDetailStore>((set) => ({
  showPostDetailDialog: false,

  setShowPostDetailDialog: (show) => set({ showPostDetailDialog: show }),
}))
