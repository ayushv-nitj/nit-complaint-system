"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/common/StatusBadge"
import { PriorityBadge } from "@/components/common/PriorityBadge"
import { ActivityTimeline } from "@/components/complaints/ActivityTimeline"
import { ArrowLeft } from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"

export default function ComplaintDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [complaint, setComplaint] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await fetch(`/api/complaints/${params.id}`)
        if (!response.ok) throw new Error("Failed to fetch")
        const data = await response.json()
        setComplaint(data)
      } catch (error) {
        toast.error("Failed to load complaint details")
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchComplaint()
    }
  }, [params.id])

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>
  }

  if (!complaint) {
    return <div className="text-center py-12">Complaint not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl mb-2">{complaint.title}</CardTitle>
              <p className="text-sm text-gray-500">
                Submitted on {format(new Date(complaint.createdAt), "PPP")}
              </p>
            </div>
            <div className="flex gap-2">
              <StatusBadge status={complaint.status} />
              <PriorityBadge priority={complaint.priority} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-gray-700">{complaint.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm text-gray-600">Category</p>
              <p className="font-medium">{complaint.category.replace(/_/g, " ")}</p>
            </div>

            {complaint.location && (
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium">{complaint.location}</p>
              </div>
            )}

            {complaint.claimedBy && (
              <div>
                <p className="text-sm text-gray-600">Claimed By</p>
                <p className="font-medium">{complaint.claimedBy.name}</p>
              </div>
            )}

            {complaint.resolvedAt && (
              <div>
                <p className="text-sm text-gray-600">Resolved On</p>
                <p className="font-medium">
                  {format(new Date(complaint.resolvedAt), "PPP")}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <ActivityTimeline activities={complaint.activities} />
    </div>
  )
}