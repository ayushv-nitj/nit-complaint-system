import { Badge } from "@/components/ui/badge"
import { Priority } from "@prisma/client"
import { PRIORITY_COLORS } from "@/lib/constants"
import { AlertTriangle } from "lucide-react"

interface PriorityBadgeProps {
  priority: Priority
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  if (priority === "NORMAL") return null

  return (
    <Badge className={PRIORITY_COLORS.HIGH}>
      <AlertTriangle className="w-3 h-3 mr-1" />
      High Priority
    </Badge>
  )
}