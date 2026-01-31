"use client"
import { useRealtimeComplaints } from "@/hooks/useRealtimeComplaints"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminComplaintCard } from "@/components/admin/AdminComplaintCard"
import { toast } from "sonner"

export default function AdminDashboard() {
  const [unclaimed, setUnclaimed] = useState([])
  const [myClaims, setMyClaims] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchComplaints = async () => {
    try {
      const [unclaimedRes, myClaimsRes] = await Promise.all([
        fetch("/api/admin/complaints/unclaimed"),
        fetch("/api/admin/complaints/my"),
      ])

      if (!unclaimedRes.ok || !myClaimsRes.ok) throw new Error("Failed to fetch")

      const [unclaimedData, myClaimsData] = await Promise.all([
        unclaimedRes.json(),
        myClaimsRes.json(),
      ])

      setUnclaimed(unclaimedData)
      setMyClaims(myClaimsData)
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

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <Tabs defaultValue="unclaimed">
        <TabsList>
          <TabsTrigger value="unclaimed">
            Unclaimed Complaints ({unclaimed.length})
          </TabsTrigger>
          <TabsTrigger value="my">
            My Claimed Complaints ({myClaims.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="unclaimed" className="space-y-4">
          {unclaimed.length === 0 ? (
            <p className="text-center py-12 text-gray-500">No unclaimed complaints</p>
          ) : (
            unclaimed.map((complaint: any) => (
              <AdminComplaintCard
                key={complaint.id}
                complaint={complaint}
                onUpdate={fetchComplaints}
                showClaimButton
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="my" className="space-y-4">
          {myClaims.length === 0 ? (
            <p className="text-center py-12 text-gray-500">You haven't claimed any complaints yet</p>
          ) : (
            myClaims.map((complaint: any) => (
              <AdminComplaintCard
                key={complaint.id}
                complaint={complaint}
                onUpdate={fetchComplaints}
              />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}