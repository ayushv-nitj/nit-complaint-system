import { NextResponse, type NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { pusherServer } from "@/lib/pusher"

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const complaint = await prisma.complaint.findUnique({
      where: { id },
    })

    if (!complaint) {
      return NextResponse.json({ error: "Complaint not found" }, { status: 404 })
    }

    if (complaint.claimedById) {
      return NextResponse.json({ error: "Complaint already claimed" }, { status: 400 })
    }

    const updated = await prisma.complaint.update({
      where: { id },
      data: {
        status: "CLAIMED",
        claimedById: session.user.id,
        claimedAt: new Date(),
      },
    })

    await prisma.activity.create({
      data: {
        complaintId: id,
        userId: session.user.id,
        action: "CLAIMED",
        previousStatus: "PENDING",
        newStatus: "CLAIMED",
        remarks: `Claimed by ${session.user.name}`,
      },
    })

    await prisma.notification.create({
      data: {
        userId: complaint.studentId,
        complaintId: id,
        message: `Your complaint "${complaint.title}" has been claimed by ${session.user.name}.`,
      },
    })

    try {
      await pusherServer.trigger("complaints", "complaint-claimed", {
        id: updated.id,
        status: updated.status,
        claimedBy: session.user.name,
      })
    } catch (e) {
      console.error("Pusher error:", e)
    }

    return NextResponse.json(updated)
  } catch (error) {
    console.error("Error claiming complaint:", error)
    return NextResponse.json({ error: "Failed to claim complaint" }, { status: 500 })
  }
}