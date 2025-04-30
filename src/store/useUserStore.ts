import { create } from "zustand"

const useUserStore = create((set, get) => ({
  users: [],
  selectedUser: null,
  loading: false,

  setSelectedUser: (user) => set({ selectedUser: user }),

  fetchUsers: async () => {
    set({ loading: true })
    try {
      const response = await fetch("/api/users?limit=0&select=username,image")
      const data = await response.json()

      set({ users: data.users, loading: false })
    } catch (error) {
      console.error("사용자 가져오기 오류:", error)
    } finally {
      set({ loading: false })
    }
  },

  fetchUserDetail: async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`)
      const data = await response.json()

      set({ selectedUser: data })
    } catch (error) {
      console.error("사용자 상세 정보 가져오기 오류:", error)
    }
  },
}))

export default useUserStore
