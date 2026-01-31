import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const complaint = await prisma.complaint.findUnique({
      where: { id },
      include: {
        student: {
          select: {
            name: true,
            email: true,
            department: true,
            hostel: true,
          },
        },
        claimedBy: {
          select: {
            name: true,
            email: true,
          },
        },
        activities: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
          orderBy: {
            timestamp: "desc",
          },
        },
      },
    })

    if (!complaint) {
      return NextResponse.json({ error: "Complaint not found" }, { status: 404 })
    }

    if (session.user.role === "STUDENT" && complaint.studentId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    return NextResponse.json(complaint)
  } catch (error) {
    console.error("Error fetching complaint:", error)
    return NextResponse.json({ error: "Failed to fetch complaint" }, { status: 500 })
  }
}