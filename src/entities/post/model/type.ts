import { User } from "@/entities/user/model/type"

export interface Post {
  id?: number
  title: string
  body: string
  tags?: string[]
  views?: number
  userId: number
  reactions?: Reactions
  author?: User
}

export interface Reactions {
  dislikes: number
  likes: number
}

export interface Tag {
  name: string
  slug: string
  url: string
}
