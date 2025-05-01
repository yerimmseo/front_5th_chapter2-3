import { Plus } from "lucide-react"
import { CommentItem } from "./CommentItem"
import { Button } from "@/shared/ui"
import { Comment } from "../model/type"

interface CommentListProps {
  comments: Comment[]
  searchQuery?: string
  onAddComment: () => void
  onLikeComment: (commentId: number) => void
  onEditComment: (comment: Comment) => void
  onDeleteComment: (commentId: number) => void
}

export const CommentList = ({
  comments,
  searchQuery = "",
  onAddComment,
  onLikeComment,
  onEditComment,
  onDeleteComment,
}: CommentListProps) => {
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button size="sm" onClick={onAddComment}>
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              searchQuery={searchQuery}
              onLike={
                onLikeComment ? () => onLikeComment(comment.id) : undefined
              }
              onEdit={onEditComment ? () => onEditComment(comment) : undefined}
              onDelete={
                onDeleteComment ? () => onDeleteComment(comment.id) : undefined
              }
            />
          ))
        ) : (
          <div className="text-sm text-gray-500 py-2">댓글이 없습니다.</div>
        )}
      </div>
    </div>
  )
}
