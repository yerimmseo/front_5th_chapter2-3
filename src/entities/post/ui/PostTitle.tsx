import { HighlightText } from "@/shared/ui/HighlightText"

interface PostTitleProps {
  title: string
  searchQuery?: string
}

export const PostTitle = ({ title, searchQuery = "" }: PostTitleProps) => {
  return <HighlightText text={title} highlight={searchQuery} />
}
