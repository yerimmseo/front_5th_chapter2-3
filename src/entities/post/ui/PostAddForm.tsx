import { Button, Input, Textarea } from "@/shared/ui"
import { Post } from "../model/type"
import { ChangeEvent, useState } from "react"

interface PostAddFormProps {
  initialData: Post
  onSubmit: (post: Post) => void
}

export const PostAddForm = ({ initialData, onSubmit }: PostAddFormProps) => {
  const [formData, setFormData] = useState<Post>(initialData)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "userId" ? Number(value) : value,
    }))
  }

  return (
    <div className="space-y-4">
      <Input name="title" placeholder="제목" value={formData.title} onChange={handleChange} />
      <Textarea
        name="body"
        rows={30}
        placeholder="내용"
        value={formData.body}
        onChange={handleChange}
      />
      <Input
        name="userId"
        type="number"
        placeholder="사용자 ID"
        value={formData.userId}
        onChange={handleChange}
      />
      <Button onClick={() => onSubmit(formData)}>게시물 추가</Button>
    </div>
  )
}
