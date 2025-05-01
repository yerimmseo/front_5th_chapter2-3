import { Button } from "@/shared/ui"
import { Edit2, MessageSquare, Trash2 } from "lucide-react"

interface PostActionsProps {
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export const PostActions = ({ onView, onEdit, onDelete }: PostActionsProps) => {
  return (
    <div className="flex items-center gap-2">
      {onView && (
        <Button variant="ghost" size="sm" onClick={onView}>
          <MessageSquare className="w-4 h-4" />
        </Button>
      )}
      {onEdit && (
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <Edit2 className="w-4 h-4" />
        </Button>
      )}
      {onDelete && (
        <Button variant="ghost" size="sm" onClick={onDelete}>
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  )
}
