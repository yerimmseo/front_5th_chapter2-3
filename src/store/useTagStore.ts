import { create } from "zustand"

const useTagStore = create((set, get) => ({
  tags: [],

  fetchTags: async () => {
    try {
      const response = await fetch("/api/posts/tags")
      const data = await response.json()

      set({ tags: data })
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  },
}))

export default useTagStore
