import { create } from "zustand"
import { Comment } from "./type"

interface CommentStore {
  comments: Comment[]
  selectedComment: Comment | null

  setComments: (comments: Comment[]) => void
}

export const useCommentStore = create<CommentStore>((set) => ({
  comments: [],
  selectedComment: null,

  setComments: (comments) => set({ comments }),
}))
