import { Comment } from "../model/type"

export const commentApi = {
  fetchComments: async (postId: number) => {
    const response = await fetch(`/api/comments/post/${postId}`)
    const data = await response.json()

    return data
  },

  addComment: async (newComment: Comment) => {
    const response = await fetch("/api/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })
    const data = await response.json()

    return data
  },

  updateComment: async (commentId: number, body: string) => {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: body }),
    })
    const data = await response.json()

    return data
  },

  deleteComment: async (commentId: number) => {
    await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
    })
  },

  likeComment: async (commentId: number, currentLikes: number) => {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: currentLikes + 1 }),
    })
    const data = await response.json()

    return data
  },
}
