"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

interface AnalyticsData {
  overview: {
    total: number
    pending: number
    claimed: number
    inProgress: number
    resolved: number
    escalated: number
  }
  categoryStats: Array<{
    category: string
    count: number
  }>
  recentComplaints: Array<{
    id: string
    title: string
    student: {
      name: string
    }
  }>
}

export default function SuperAdminDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch("/api/superadmin/analytics")
        if (!response.ok) throw new Error("Failed to fetch")
        const data = await response.json()
        setAnalytics(data)
      } catch (error) {
        toast.error("Failed to load analytics")
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No data available</p>
      </div>
    )
  }

  const { overview, categoryStats, recentComplaints } = analytics

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
        <div className="text-sm text-gray-500">
          System Overview & Analytics
        </div>
      </div>

      {/* Overview Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Complaints
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{overview.total}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">{overview.pending}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Escalated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">{overview.escalated}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{overview.inProgress}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Resolved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{overview.resolved}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Claimed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">{overview.claimed}</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Complaints by Category</CardTitle>
        </CardHeader>
        <CardContent>
          {categoryStats.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No data available</p>
          ) : (
            <div className="space-y-3">
              {categoryStats.map((stat) => (
                <div key={stat.category} className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    {stat.category.replace(/_/g, ' ')}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(stat.count / overview.total) * 100}%`
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {stat.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Complaints */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Complaints</CardTitle>
        </CardHeader>
        <CardContent>
          {recentComplaints.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No complaints yet</p>
          ) : (
            <div className="space-y-3">
              {recentComplaints.map((complaint) => (
                <div key={complaint.id} className="border-b pb-3 last:border-b-0">
                  <p className="font-medium">{complaint.title}</p>
                  <p className="text-sm text-gray-600">By {complaint.student.name}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}