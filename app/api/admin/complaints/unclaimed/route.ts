import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const complaints = await prisma.complaint.findMany({
      where: {
        status: "PENDING",
        claimedById: null,
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
      },
      orderBy: [
        { priority: "desc" },
        { createdAt: "asc" },
      ],
    })

    return NextResponse.json(complaints)
  } catch (error) {
    console.error("Error fetching unclaimed complaints:", error)
    return NextResponse.json(
      { error: "Failed to fetch complaints" },
      { status: 500 }
    )
  }
}