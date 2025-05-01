import { useEffect } from "react"
import { usePostStore } from "@/entities/post/model/store"
import { usePostDetailStore } from "../model/store"
import { usePostManagementStore } from "@/features/post-management/model/store"
import { fetchComments } from "../api/fetchComments"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  HighlightText,
} from "@/shared/ui"
import { CommentList } from "@/entities/comment/ui/CommentList"

export const PostDetailDialog = () => {
  const { showPostDetailDialog, setShowPostDetailDialog } = usePostDetailStore()
  const { selectedPost } = usePostStore()
  const { searchQuery } = usePostManagementStore()

  // 대화상자가 열릴 때 댓글 가져오기
  useEffect(() => {
    if (showPostDetailDialog && selectedPost) {
      fetchComments(selectedPost.id)
    }
  }, [showPostDetailDialog, selectedPost])

  if (!selectedPost) {
    return null
  }

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            <HighlightText text={selectedPost.title} highlight={searchQuery} />
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            <HighlightText text={selectedPost.body} highlight={searchQuery} />
          </p>
          {/* <CommentList  /> */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
