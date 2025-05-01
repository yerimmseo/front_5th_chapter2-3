import { HighlightText } from "@/shared/ui/HighlightText"

interface PostContentProps {
  body: string
  searchQuery?: string
}

export const PostContent = ({ body, searchQuery = "" }: PostContentProps) => {
  return (
    <p>
      <HighlightText text={body} highlight={searchQuery} />
    </p>
  )
}
