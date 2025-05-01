import { postApi } from "@/entities/post/api/postApi"
import { usePostStore } from "@/entities/post/model/store"
import { userApi } from "@/entities/user/api/userApi"
import { useUserStore } from "@/entities/user/model/store"

export const initializeApp = async () => {
  try {
    const users = await userApi.fetchUsers()
    const tags = await postApi.fetchTags()

    useUserStore.getState().setUsers(users.users)
    usePostStore.getState().setTags(tags)

    return true
  } catch (error) {
    console.error("앱 초기화 에러: ", error)
    return false
  }
}
