import { getHighlightParts } from "../lib/textHighlight"

interface HighlightTextProps {
  text: string
  highlight?: string
}

export const HighlightText = ({ text, highlight = "" }: HighlightTextProps) => {
  const parts = getHighlightParts(text, highlight)

  return (
    <span>
      {parts.map((part, i) =>
        part.isHighlighted ? (
          <mark key={i}>{part.text}</mark>
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
    </span>
  )
}
