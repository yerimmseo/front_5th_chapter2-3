import { DialogContent, DialogHeader, DialogTitle } from "../../shared/ui"
import useControlStore from "../../store/useControlStore"
import usePostStore from "../../store/usePostStore"
import Comments from "../Comments"

const PostDetailDialog = () => {
  const { selectedPost } = usePostStore()
  const { searchQuery } = useControlStore()

  // 하이라이트 함수 추가
  const highlightText = (text: string, highlight: string) => {
    if (!text) return null
    if (!highlight.trim()) {
      return <span>{text}</span>
    }
    const regex = new RegExp(`(${highlight})`, "gi")
    const parts = text.split(regex)
    return (
      <span>
        {parts.map((part, i) => (regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>))}
      </span>
    )
  }

  return (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <p>{highlightText(selectedPost?.body, searchQuery)}</p>
        <Comments postId={selectedPost?.id} />
      </div>
    </DialogContent>
  )
}

export default PostDetailDialog
