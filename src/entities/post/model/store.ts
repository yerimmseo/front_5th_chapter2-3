import { create } from "zustand"
import { Post, Tag } from "./type"

interface PostStore {
  posts: Post[]
  tags: Tag[]
  total: number
  selectedPost: Post | null

  setPosts: (posts: Post[]) => void
  setTags: (tags: Tag[]) => void
  setTotal: (total: number) => void
  setSelectedPost: (post: Post | null) => void

  getPosts: () => Post[]
  getTotal: () => number
  getSelectedPost: () => Post | null
}

export const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  tags: [],
  total: 0,
  selectedPost: null,

  setPosts: (posts) => set({ posts }),
  setTags: (tags) => set({ tags }),
  setTotal: (total) => set({ total }),
  setSelectedPost: (post) => set({ selectedPost: post }),

  getPosts: () => get().posts,
  getTotal: () => get().total,
  getSelectedPost: () => get().selectedPost,
}))
