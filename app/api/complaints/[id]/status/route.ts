import { NextResponse, type NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { pusherServer } from "@/lib/pusher"

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { status, remarks } = await req.json()

    if (!status || !remarks) {
      return NextResponse.json({ error: "Status and remarks are required" }, { status: 400 })
    }

    const complaint = await prisma.complaint.findUnique({
      where: { id },
    })

    if (!complaint) {
      return NextResponse.json({ error: "Complaint not found" }, { status: 404 })
    }

    if (complaint.claimedById !== session.user.id) {
      return NextResponse.json({ error: "You can only update complaints you claimed" }, { status: 403 })
    }

    const validTransitions: Record<string, string[]> = {
      CLAIMED: ["IN_PROGRESS"],
      IN_PROGRESS: ["RESOLVED"],
    }

    const allowed = validTransitions[complaint.status]
    if (!allowed || !allowed.includes(status)) {
      return NextResponse.json(
        { error: `Cannot transition from ${complaint.status} to ${status}` },
        { status: 400 }
      )
    }

    const updateData: any = {
      status,
    }

    if (status === "RESOLVED") {
      updateData.resolvedAt = new Date()
    }

    const updated = await prisma.complaint.update({
      where: { id },
      data: updateData,
    })

    await prisma.activity.create({
      data: {
        complaintId: id,
        userId: session.user.id,
        action: "STATUS_UPDATED",
        previousStatus: complaint.status,
        newStatus: status,
        remarks,
      },
    })

    await prisma.notification.create({
      data: {
        userId: complaint.studentId,
        complaintId: id,
        message: `Your complaint "${complaint.title}" status updated to ${status}. Admin note: ${remarks}`,
      },
    })

    try {
      await pusherServer.trigger("complaints", "complaint-updated", {
        id: updated.id,
        status: updated.status,
        remarks,
      })
    } catch (e) {
      console.error("Pusher error:", e)
    }

    return NextResponse.json(updated)
  } catch (error) {
    console.error("Error updating status:", error)
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 })
  }
}