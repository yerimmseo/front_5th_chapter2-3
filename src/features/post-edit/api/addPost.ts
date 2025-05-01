import { postApi } from "@/entities/post/api/postApi"
import { usePostStore } from "@/entities/post/model/store"
import { Post } from "@/entities/post/model/type"

export const addPost = async (postData: Omit<Post, "id">) => {
  try {
    const newPost = await postApi.addPost(postData)

    const { posts } = usePostStore.getState()
    usePostStore.getState().setPosts([newPost, ...posts])

    return newPost
  } catch (error) {
    console.error("게시물 추가 오류: ", error)
    throw error
  }
}
