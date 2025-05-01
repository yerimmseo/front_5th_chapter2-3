import { create } from "zustand"
import { Post } from "./type"

interface PostStore {
  posts: Post[]
  total: number
  selectedPost: Post | null

  setPosts: (posts: Post[]) => void
  setTotal: (total: number) => void
  setSelectedPost: (post: Post | null) => void

  getPosts: () => Post[]
  getTotal: () => number
  getSelectedPost: () => Post | null
}

export const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  total: 0,
  selectedPost: null,

  setPosts: (posts) => set({ posts }),
  setTotal: (total) => set({ total }),
  setSelectedPost: (post) => set({ selectedPost: post }),

  getPosts: () => get().posts,
  getTotal: () => get().total,
  getSelectedPost: () => get().selectedPost,
}))
