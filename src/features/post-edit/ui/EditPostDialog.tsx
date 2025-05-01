import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Textarea,
} from "@/shared/ui"
import { usePostEditStore } from "../store/store"
import { usePostStore } from "@/entities/post/model/store"
import { updatePost } from "../api/updatePost"

export const EditPostDialog = () => {
  const { showEditDialog, setShowEditDialog } = usePostEditStore()
  const { selectedPost, setSelectedPost } = usePostStore()

  const handleSubmit = async () => {
    if (!selectedPost) return

    try {
      await updatePost(selectedPost)
      setShowEditDialog(false)
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={(e) =>
              setSelectedPost({ ...selectedPost, title: e.target.value })
            }
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) =>
              setSelectedPost({ ...selectedPost, body: e.target.value })
            }
          />
          <Button onClick={handleSubmit}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
