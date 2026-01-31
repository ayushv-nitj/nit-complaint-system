import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")
    const category = searchParams.get("category")

    const where: any = {}
    
    if (status) {
      where.status = status
    }
    
    if (category) {
      where.category = category
    }

    const complaints = await prisma.complaint.findMany({
      where,
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
      orderBy: [
        { priority: "desc" },
        { createdAt: "desc" },
      ],
    })

    return NextResponse.json(complaints)
  } catch (error) {
    console.error("Error fetching complaints:", error)
    return NextResponse.json(
      { error: "Failed to fetch complaints" },
      { status: 500 }
    )
  }
}