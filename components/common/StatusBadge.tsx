import { Badge } from "@/components/ui/badge"
import { ComplaintStatus } from "@prisma/client"
import { COMPLAINT_STATUS_COLORS } from "@/lib/constants"

interface StatusBadgeProps {
  status: ComplaintStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const labels = {
    PENDING: "Pending",
    CLAIMED: "Claimed",
    IN_PROGRESS: "In Progress",
    RESOLVED: "Resolved",
    ESCALATED: "Escalated",
  }

  return (
    <Badge variant="outline" className={COMPLAINT_STATUS_COLORS[status]}>
      {labels[status]}
    </Badge>
  )
}