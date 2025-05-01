import { postApi } from "@/entities/post/api/postApi"
import { Post } from "@/entities/post/model/type"
import { usePostStore } from "@/entities/post/model/store"
import { useUserStore } from "@/entities/user/model/store"

export const fetchPostsByTag = async (tag: string) => {
  try {
    if (!tag || tag === "all") {
      // throw new Error("태그를 입력해주세요.")
    }

    const postsData = await postApi.fetchPostsByTag(tag)
    const users = useUserStore.getState().getUsers()

    const postsWithUsers = postsData.posts.map((post: Post) => ({
      ...post,
      author: users.find((user) => user.id === post.userId),
    }))

    // 포스트 스토어 업데이트
    usePostStore.getState().setPosts(postsWithUsers)
    usePostStore.getState().setTotal(postsData.total)

    return {
      posts: postsWithUsers,
      total: postsData.total,
    }
  } catch (error) {
    console.error("태그별 게시물 가져오기 오류: ", error)
    throw error
  }
}
