import { commentApi } from "@/entities/comment/api/commentApi"
import { useCommentStore } from "@/entities/comment/model/store"

export const fetchComments = async (postId: number) => {
  // 이미 불러온 댓글이 있으면 다시 불러오지 않음
  const existingComments = useCommentStore.getState().comments[postId]
  if (existingComments) {
    return existingComments
  }

  try {
    const commentData = await commentApi.fetchComments(postId)

    useCommentStore.getState().setComments({
      ...useCommentStore.getState().comments,
      [postId]: commentData.comments,
    })

    return commentData.comments
  } catch (error) {
    console.error("댓글 가져오기 오류: ", error)
    throw error
  }
}
