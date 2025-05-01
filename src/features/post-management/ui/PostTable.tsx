import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui"
import { usePostStore } from "@/entities/post/model/store"
import { usePostManagementStore } from "../model/store"
import { PostTitle } from "@/entities/post/ui/PostTitle"
import { PostTags } from "@/entities/post/ui/PostTags"
import { UserCell } from "@/entities/user/ui/UserCell"
import { PostReactions } from "@/entities/post/ui/PostReactions"
import { PostActions } from "@/entities/post/ui/PostActions"
import { Post } from "@/entities/post/model/type"
import { User } from "@/entities/user/model/type"

interface PostTableProps {
  onViewPost?: (post: Post) => void
  onEditPost?: (post: Post) => void
  onDeletePost?: (postId: number) => void
  onUserClick?: (user: User) => void
  onTagClick?: (tag: string) => void
}

export const PostTable = ({
  onViewPost,
  onEditPost,
  onDeletePost,
  onUserClick,
  onTagClick,
}: PostTableProps) => {
  const { posts } = usePostStore()
  const { searchQuery, selectedTag } = usePostManagementStore()

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
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <div>
                  <PostTitle title={post.title} searchQuery={searchQuery} />
                </div>
                <PostTags
                  tags={post.tags}
                  selectedTag={selectedTag}
                  onTagClick={onTagClick}
                />
              </div>
            </TableCell>
            <TableCell>
              {/* onClick 필요 */}
              {post.author && (
                <UserCell
                  user={post.author}
                  onClick={() => onUserClick(post.author)}
                />
              )}
            </TableCell>
            <TableCell>
              <PostReactions
                likes={post.reactions?.likes}
                dislikes={post.reactions?.dislikes}
              />
            </TableCell>
            <TableCell>
              {/* onView, onEdit, onDelete 필요 */}
              <PostActions
                onView={() => onViewPost && onViewPost(post)}
                onEdit={() => onEditPost && onEditPost(post)}
                onDelete={() => onDeletePost && onDeletePost(post.id)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
