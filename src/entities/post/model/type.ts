export interface Post {
  id?: number
  title: string
  body: string
  tags?: string[]
  views?: number
  userId: number
  reactions?: Reactions
}

export type Reactions = {
  dislikes: number
  likes: number
}
