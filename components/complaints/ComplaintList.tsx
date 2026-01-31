"use client"

import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/common/StatusBadge"
import { PriorityBadge } from "@/components/common/PriorityBadge"
import { Complaint, User } from "@prisma/client"

type ComplaintWithRelations = Complaint & {
  student: Pick<User, "name" | "email">
  claimedBy: Pick<User, "name"> | null
}

interface ComplaintListProps {
  complaints: ComplaintWithRelations[]
}

export function ComplaintList({ complaints }: ComplaintListProps) {
  if (complaints.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No complaints found</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {complaints.map((complaint) => (
        <Card key={complaint.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <CardTitle className="text-lg">{complaint.title}</CardTitle>
                <p className="text-sm text-gray-500">
                  {format(new Date(complaint.createdAt), "PPp")}
                </p>
              </div>
              <div className="flex gap-2">
                <StatusBadge status={complaint.status} />
                <PriorityBadge priority={complaint.priority} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">{complaint.description}</p>
            <div className="flex gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">Category:</span> {complaint.category.replace('_', ' ')}
              </div>
              {complaint.location && (
                <div>
                  <span className="font-medium">Location:</span> {complaint.location}
                </div>
              )}
              {complaint.claimedBy && (
                <div>
                  <span className="font-medium">Claimed by:</span> {complaint.claimedBy.name}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}