import { useEffect, useState } from "react"
import { Button, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../shared/ui"
import useCommentStore from "../../store/useCommentStore"
import usePostStore from "../../store/usePostStore"

const AddCommentDialog = () => {
  const { selectedPost } = usePostStore()
  const { addComment } = useCommentStore()
  const [newComment, setNewComment] = useState({ body: "", postId: null, userId: 1 })

  useEffect(() => {
    console.log(selectedPost, "selectedPost??")
  }, [selectedPost])

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>새 댓글 추가</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <Textarea
          placeholder="댓글 내용"
          value={newComment.body}
          onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
        />
        <Button onClick={() => addComment(newComment, selectedPost)}>댓글 추가</Button>
      </div>
    </DialogContent>
  )
}

export default AddCommentDialog
