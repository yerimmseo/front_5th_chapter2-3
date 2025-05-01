export const getHighlightParts = (text: string, highlight?: string) => {
  if (!highlight || !highlight.trim()) {
    return [{ text, isHighlighted: false }]
  }

  try {
    const regex = new RegExp(`(${highlight})`, "gi")
    const parts = text.split(regex)

    return parts.map((part) => ({
      text: part,
      isHighlighted: regex.test(part),
    }))
  } catch (error) {
    console.error("Highlight Error: ", error)
    return [{ text, isHighlighted: false }]
  }
}
