import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const escalatedComplaints = await prisma.complaint.findMany({
      where: {
        status: "ESCALATED",
      },
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
      },
      orderBy: {
        escalatedAt: "desc",
      },
    })

    return NextResponse.json(escalatedComplaints)
  } catch (error) {
    console.error("Error fetching escalated complaints:", error)
    return NextResponse.json(
      { error: "Failed to fetch escalated complaints" },
      { status: 500 }
    )
  }
}