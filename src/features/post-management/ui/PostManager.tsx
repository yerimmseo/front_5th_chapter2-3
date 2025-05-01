import { useEffect, useState } from "react"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui"
import { Plus, Search } from "lucide-react"
import { usePostManagementStore } from "../model/store"
import { fetchPosts } from "../api/fetchPosts"
import { PostTable } from "./PostTable"
import { Post } from "@/entities/post/model/type"
import { usePostStore } from "@/entities/post/model/store"
import { User } from "@/entities/user/model/type"
import { Pagination } from "@/widgets/ui/Pagination"
import { PostFilters } from "./PostFilters"

export const PostsManager = () => {
  const { total, setSelectedPost } = usePostStore()
  const {
    searchQuery,
    selectedTag,
    sortBy,
    sortOrder,
    skip,
    limit,
    setSearchQuery,
    setSkip,
    setLimit,
    setSortBy,
    setSortOrder,
  } = usePostManagementStore()

  const [loading, setLoading] = useState(false)

  const loadPosts = async () => {
    setLoading(true)
    try {
      await fetchPosts(limit, skip)
      setLoading(false)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip, limit])

  const handleViewPost = (post: Post) => {
    setSelectedPost(post)
  }

  const handleEditPost = (post: Post) => {
    setSelectedPost(post)
  }

  const handleDeletePost = (postId: number) => {}

  const handleUserClick = (user: User) => {}

  const handleTagClick = (tag: string) => {}

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <PostFilters />

          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable />
          )}

          <Pagination
            skip={skip}
            limit={limit}
            total={total}
            setSkip={setSkip}
            setLimit={setLimit}
          />
        </div>
      </CardContent>
    </Card>
  )
}
