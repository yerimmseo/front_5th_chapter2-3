import { Button, Input, Textarea } from "@/shared/ui"
import { Post } from "../model/type"
import { ChangeEvent, useEffect, useState } from "react"

interface PostEditFormProps {
  post: Post
  onSubmit: (post: Post) => void
}

export const PostEditForm = ({ post, onSubmit }: PostEditFormProps) => {
  const [formData, setFormData] = useState<Post>(post)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  useEffect(() => {
    setFormData(post)
  }, [post])

  return (
    <div className="space-y-4">
      <Input
        placeholder="제목"
        value={formData.title || ""}
        onChange={handleChange}
      />
      <Textarea
        rows={15}
        placeholder="내용"
        value={formData.body || ""}
        onChange={handleChange}
      />
      <Button onClick={() => onSubmit(formData)}>게시물 업데이트</Button>
    </div>
  )
}
