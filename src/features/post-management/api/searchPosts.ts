import { postApi } from "@/entities/post/api/postApi"
import { Post } from "@/entities/post/model/type"
import { usePostStore } from "@/entities/post/model/store"
import { useUserStore } from "@/entities/user/model/store"

export const searchPosts = async (searchQuery: string) => {
  try {
    if (!searchQuery.trim()) {
      throw new Error("검색어를 입력해주세요.")
    }

    const postsData = await postApi.searchPosts(searchQuery)
    const users = useUserStore.getState().getUsers()

    const postsWithUsers = postsData.posts.map((post: Post) => ({
      ...post,
      author: users.find((user) => user.id === post.userId),
    }))

    usePostStore.getState().setPosts(postsWithUsers)
    usePostStore.getState().setTotal(postsData.total)

    return {
      posts: postsWithUsers,
      total: postsData.total,
    }
  } catch (error) {
    console.error("게시물 검색 오류: ", error)
    throw error
  }
}
