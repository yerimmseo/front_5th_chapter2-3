import { Post } from "../model/type"

export const postApi = {
  fetchPosts: async (limit: number, skip: number) => {
    const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
    const data = await response.json()

    return data
  },

  fetchPostsByTag: async (tag: string) => {
    const response = await fetch(`/api/posts/tag/${tag}`)
    const data = await response.json()

    return data
  },

  searchPosts: async (searchQuery: string) => {
    const response = await fetch(`/api/posts/search?q=${searchQuery}`)
    const data = await response.json()

    return data
  },

  addPost: async (newPost: Post) => {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
    const data = await response.json()

    return data
  },

  updatePost: async (selectedPost: Post) => {
    const response = await fetch(`/api/posts/${selectedPost.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedPost),
    })
    const data = await response.json()

    return data
  },

  deletePost: async (id: number) => {
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    })
  },
}
