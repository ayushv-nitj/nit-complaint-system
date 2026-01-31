"use client"
import { useRealtimeComplaints } from "@/hooks/useRealtimeComplaints"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { SubmitComplaintForm } from "@/components/complaints/SubmitComplaintForm"
import { ComplaintList } from "@/components/complaints/ComplaintList"
import { Plus } from "lucide-react"
import { toast } from "sonner"

export default function StudentDashboard() {
  const [complaints, setComplaints] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const fetchComplaints = async () => {
    try {
      const response = await fetch("/api/complaints")
      if (!response.ok) throw new Error("Failed to fetch")
      const data = await response.json()
      setComplaints(data)
    } catch (error) {
      toast.error("Failed to load complaints")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchComplaints()
  }, [])

  useRealtimeComplaints(fetchComplaints)

  const handleSuccess = () => {
    setIsDialogOpen(false)
    fetchComplaints()
  }

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Complaints</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Submit Complaint
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Submit New Complaint</DialogTitle>
            </DialogHeader>
            <SubmitComplaintForm onSuccess={handleSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      <ComplaintList complaints={complaints} />
    </div>
  )
}