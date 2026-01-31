"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatusBadge } from "@/components/common/StatusBadge"
import { PriorityBadge } from "@/components/common/PriorityBadge"
import { toast } from "sonner"

interface AdminComplaintCardProps {
  complaint: any
  onUpdate: () => void
  showClaimButton?: boolean
}

export function AdminComplaintCard({ complaint, onUpdate, showClaimButton }: AdminComplaintCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<"IN_PROGRESS" | "RESOLVED">("IN_PROGRESS")
  const [remarks, setRemarks] = useState("")

  const handleClaim = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/complaints/${complaint.id}/claim`, {
        method: "POST",
      })

      if (!response.ok) {
        const error = await response.json()
        toast.error(error.error)
        return
      }

      toast.success("Complaint claimed successfully")
      onUpdate()
    } catch (error) {
      toast.error("Failed to claim complaint")
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusUpdate = async () => {
    if (!remarks.trim()) {
      toast.error("Please add remarks")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/complaints/${complaint.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, remarks }),
      })

      if (!response.ok) {
        const error = await response.json()
        toast.error(error.error)
        return
      }

      toast.success("Status updated successfully")
      setIsDialogOpen(false)
      setRemarks("")
      onUpdate()
    } catch (error) {
      toast.error("Failed to update status")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-lg">{complaint.title}</CardTitle>
            <div className="text-sm text-gray-500 space-y-1">
              <p>Student: {complaint.student.name}</p>
              <p>{format(new Date(complaint.createdAt), "PPp")}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <StatusBadge status={complaint.status} />
            <PriorityBadge priority={complaint.priority} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-700">{complaint.description}</p>
        
        <div className="flex gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Category:</span> {complaint.category.replace('_', ' ')}
          </div>
          {complaint.location && (
            <div>
              <span className="font-medium">Location:</span> {complaint.location}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {showClaimButton && (
            <Button onClick={handleClaim} disabled={isLoading}>
              {isLoading ? "Claiming..." : "Claim"}
            </Button>
          )}

          {!showClaimButton && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>Update Status</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Complaint Status</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>New Status</Label>
                    <Select value={status} onValueChange={(v: any) => setStatus(v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                        <SelectItem value="RESOLVED">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Remarks *</Label>
                    <Textarea
                      placeholder="Add your remarks about this update..."
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <Button onClick={handleStatusUpdate} disabled={isLoading} className="w-full">
                    {isLoading ? "Updating..." : "Update Status"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardContent>
    </Card>
  )
}