import { create } from "zustand"

const usePostStore = create((set, get) => ({
  posts: [],
  total: 0,
  selectedPost: null,
  loading: false,

  setSelectedPost: (post) => set({ selectedPost: post }),

  fetchPosts: async (limit, skip) => {
    set({ loading: true })
    try {
      const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
      const data = await response.json()

      set({ posts: data.posts, total: data.total, loading: false })

      return data
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
    } finally {
      set({ loading: false })
    }
  },

  searchPosts: async (searchQuery) => {
    if (!searchQuery) {
      return get().fetchPosts()
    }

    set({ loading: true })
    try {
      const response = await fetch(`/api/posts/search?q=${searchQuery}`)
      const data = await response.json()

      set({ posts: data.posts, total: data.total, loading: false })
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    } finally {
      set({ loading: false })
    }
  },

  fetchPostsByTag: async (tag) => {
    if (!tag || tag === "all") {
      return get().fetchPosts()
    }

    set({ loading: true })
    try {
      const response = await fetch(`/api/posts/tag/${tag}`)
      const data = await response.json()

      set({ posts: data.posts, total: data.total, loading: false })
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    } finally {
      set({ loading: false })
    }
  },

  addPost: async (newPost) => {
    try {
      const response = await fetch("/api/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      })
      const data = await response.json()

      set((state) => ({ posts: [data, ...state.posts] }))

      return data
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    } finally {
      set({ loading: false })
    }
  },

  updatePost: async (selectedPost) => {
    try {
      const response = await fetch(`/api/posts/${selectedPost.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedPost),
      })
      const data = await response.json()

      set((state) => ({
        posts: state.posts.map((post) => (post.id === data.id ? data : post)),
      }))

      return data
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    } finally {
      set({ loading: false })
    }
  },

  deletePost: async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      })

      set((state) => ({
        posts: state.posts.filter((post) => post.id !== id),
      }))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  },
}))

export default usePostStore
