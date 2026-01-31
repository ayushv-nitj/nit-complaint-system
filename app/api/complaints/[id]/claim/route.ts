import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const complaint = await prisma.complaint.findUnique({
      where: { id: params.id },
    })

    if (!complaint) {
      return NextResponse.json({ error: "Complaint not found" }, { status: 404 })
    }

    if (complaint.claimedById) {
      return NextResponse.json(
        { error: "This complaint has already been claimed" },
        { status: 400 }
      )
    }

    const updated = await prisma.complaint.update({
      where: { id: params.id },
      data: {
        status: "CLAIMED",
        claimedById: session.user.id,
        claimedAt: new Date(),
      },
      include: {
        student: true,
        claimedBy: true,
      },
    })

    // Create activity log
    await prisma.activity.create({
      data: {
        complaintId: params.id,
        userId: session.user.id,
        action: "CLAIMED",
        previousStatus: complaint.status,
        newStatus: "CLAIMED",
        remarks: `Claimed by ${session.user.name}`,
      },
    })

    // Create notification for student
    await prisma.notification.create({
      data: {
        userId: complaint.studentId,
        complaintId: params.id,
        message: `Your complaint "${complaint.title}" has been claimed by ${session.user.name}`,
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error("Error claiming complaint:", error)
    return NextResponse.json(
      { error: "Failed to claim complaint" },
      { status: 500 }
    )
  }
}