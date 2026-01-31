import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from "@prisma/client"
import { User } from "lucide-react"

interface ActivityWithUser extends Activity {
  user: {
    name: string
  }
}

interface ActivityTimelineProps {
  activities: ActivityWithUser[]
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  const getActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      CREATED: "Complaint Created",
      CLAIMED: "Claimed by Admin",
      STATUS_UPDATED: "Status Updated",
      COMMENT_ADDED: "Comment Added",
      RESOLVED: "Marked as Resolved",
      ESCALATED: "Escalated",
      PRIORITY_INCREASED: "Priority Increased",
    }
    return labels[action] || action
  }

  const getActionColor = (action: string) => {
    const colors: Record<string, string> = {
      CREATED: "bg-blue-100 text-blue-800",
      CLAIMED: "bg-green-100 text-green-800",
      STATUS_UPDATED: "bg-purple-100 text-purple-800",
      RESOLVED: "bg-green-100 text-green-800",
      ESCALATED: "bg-red-100 text-red-800",
      PRIORITY_INCREASED: "bg-orange-100 text-orange-800",
    }
    return colors[action] || "bg-gray-100 text-gray-800"
  }

  if (activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Activity History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-4">No activity yet</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={activity.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActionColor(activity.action)}`}>
                  <User className="w-4 h-4" />
                </div>
                {index !== activities.length - 1 && (
                  <div className="w-0.5 h-full bg-gray-200 mt-2" />
                )}
              </div>
              
              <div className="flex-1 pb-4">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-medium">{getActionLabel(activity.action)}</p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(activity.timestamp), "MMM d, h:mm a")}
                  </p>
                </div>
                
                <p className="text-sm text-gray-600 mb-1">
                  By {activity.user.name}
                </p>
                
                {activity.remarks && (
                  <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded mt-2">
                    {activity.remarks}
                  </p>
                )}
                
                {activity.previousStatus && activity.newStatus && (
                  <p className="text-sm text-gray-600 mt-1">
                    Status changed: {activity.previousStatus} → {activity.newStatus}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}