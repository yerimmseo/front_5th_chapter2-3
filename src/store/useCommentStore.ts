import { create } from "zustand"

const useCommentStore = create((set, get) => ({
  comments: {},
  selectedComment: null,

  setComments: (comments) => set({ comments }),
  setSelectedComment: (comment) => set({ selectedComment: comment }),

  fetchComments: async (postId) => {
    // if (get().comments[postId]) {
    //   return
    // }

    try {
      const response = await fetch(`/api/comments/post/${postId}`)
      const data = await response.json()

      set((state) => ({ comments: { ...state.comments, [postId]: data.comments } }))
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  },

  addComment: async (newComment, selectedPost) => {
    // {...newComment, postId: selectedPost.id} 개선 필요
    try {
      const response = await fetch("/api/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newComment, postId: selectedPost.id }),
      })
      const data = await response.json()

      set((state) => ({
        comments: { ...state.comments, [data.postId]: [...(state.comments[data.postId] || []), data] },
      }))

      return data
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  },

  updateComment: async () => {
    try {
      const response = await fetch(`/api/comments/${get().selectedComment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: get().selectedComment.body }),
      })
      const data = await response.json()

      set((state) => ({
        comments: {
          ...state.comments,
          [data.postId]: state.comments[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
        },
      }))

      return data
      // dialog 닫는 옵션 필요
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  },

  deleteComment: async (id, postId) => {
    try {
      await fetch(`/api/comments/${id}`, {
        method: "DELETE",
      })

      set((state) => ({
        comments: {
          ...state.comments,
          [postId]: state.comments[postId].filter((comment) => comment.id !== id),
        },
      }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  },

  likeComment: async (id, postId) => {
    try {
      const comment = get().comments[postId].find((comment) => comment.id === id)
      const response = await fetch(`/api/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: comment.likes + 1 }),
      })
      const data = await response.json()

      set((state) => ({
        comments: {
          ...state.comments,
          [postId]: state.comments[postId].map((comment) =>
            comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment,
          ),
        },
      }))
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  },
}))

export default useCommentStore
