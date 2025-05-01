import { Button, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../shared/ui"
import useCommentStore from "../../store/useCommentStore"

const EditCommentDialog = () => {
  const { selectedComment, setSelectedComment, updateComment } = useCommentStore()

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>댓글 수정</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <Textarea
          placeholder="댓글 내용"
          value={selectedComment?.body || ""}
          onChange={(e) => setSelectedComment({ ...selectedComment, body: e.target.value })}
        />
        <Button onClick={updateComment}>댓글 업데이트</Button>
      </div>
    </DialogContent>
  )
}

export default EditCommentDialog
