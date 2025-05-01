import { postApi } from "@/entities/post/api/postApi"
import { usePostStore } from "@/entities/post/model/store"
import { Post } from "@/entities/post/model/type"

export const updatePost = async (postData: Post) => {
  try {
    const updatedPost = await postApi.updatePost(postData)

    const { posts } = usePostStore.getState()
    const updatedPosts = posts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post,
    )

    usePostStore.getState().setPosts(updatedPosts)
  } catch (error) {
    console.error("게시물 업데이트 오류: ", error)
    throw error
  }
}
