import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const statusUpdateSchema = z.object({
  status: z.enum(["IN_PROGRESS", "RESOLVED"]),
  remarks: z.string().min(1).max(500),
})

export async function PATCH(
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

    if (complaint.claimedById !== session.user.id && session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "You can only update complaints you have claimed" },
        { status: 403 }
      )
    }

    const body = await req.json()
    const { status, remarks } = statusUpdateSchema.parse(body)

    const updated = await prisma.complaint.update({
      where: { id: params.id },
      data: {
        status,
        ...(status === "RESOLVED" && { resolvedAt: new Date() }),
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
        action: "STATUS_UPDATED",
        previousStatus: complaint.status,
        newStatus: status,
        remarks,
      },
    })

    // Create notification for student
    const statusText = status === "RESOLVED" ? "resolved" : "updated to In Progress"
    await prisma.notification.create({
      data: {
        userId: complaint.studentId,
        complaintId: params.id,
        message: `Your complaint "${complaint.title}" has been ${statusText}. Remarks: ${remarks}`,
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }
    console.error("Error updating status:", error)
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 }
    )
  }
}