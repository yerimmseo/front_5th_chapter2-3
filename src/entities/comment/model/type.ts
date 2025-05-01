import { User } from "@/entities/user/model/type"

export interface Comment {
  id: number
  body: string
  postId: number
  userId?: number
  likes?: number
  user?: User
}
