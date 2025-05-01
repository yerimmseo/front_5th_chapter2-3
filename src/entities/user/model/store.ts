import { create } from "zustand"
import { User } from "./type"

interface UserStore {
  users: User[]
  selectedUser: User | null

  setUsers: (users: User[]) => void
  setSelectedUser: (user: User | null) => void

  getUsers: () => User[]
  getSelectedUser: () => User | null
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  selectedUser: null,

  setUsers: (users) => set({ users }),
  setSelectedUser: (user) => set({ selectedUser: user }),

  getUsers: () => get().users,
  getSelectedUser: () => get().selectedUser,
}))
