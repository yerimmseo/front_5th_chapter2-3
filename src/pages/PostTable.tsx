import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../shared/ui"
import useControlStore from "../store/useControlStore"
import usePostStore from "../store/usePostStore"
import useUserStore from "../store/useUserStore"
import useCommentStore from "../store/useCommentStore"

const PostTable = () => {
  const { posts, setSelectedPost, deletePost } = usePostStore()
  const { searchQuery, selectedTag, setSelectedTag, setShowUserModal, setShowEditDialog, setShowPostDetailDialog } =
    useControlStore()
  const { users, fetchUserDetail } = useUserStore()

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

  const openUserModal = (user) => {
    fetchUserDetail(user.id)
    setShowUserModal(true)
  }

  const openPostDetail = (post) => {
    setSelectedPost(post)
    useCommentStore.getState().fetchComments(post.id)
    setShowPostDetailDialog(true)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => {
          const author = users.find((user) => user.id === post.userId)

          return (
            <TableRow key={post.id}>
              <TableCell>{post.id}</TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div>{highlightText(post.title, searchQuery)}</div>

                  <div className="flex flex-wrap gap-1">
                    {post.tags?.map((tag) => (
                      <span
                        key={tag}
                        className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                          selectedTag === tag
                            ? "text-white bg-blue-500 hover:bg-blue-600"
                            : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                        }`}
                        onClick={() => {
                          setSelectedTag(tag)
                          updateURL()
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserModal(author)}>
                  <img src={author?.image} alt={author?.username} className="w-8 h-8 rounded-full" />
                  <span>{author?.username}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{post.reactions?.likes || 0}</span>
                  <ThumbsDown className="w-4 h-4" />
                  <span>{post.reactions?.dislikes || 0}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedPost(post)
                      setShowEditDialog(true)
                    }}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default PostTable
