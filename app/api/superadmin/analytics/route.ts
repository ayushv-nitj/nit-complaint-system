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

    // Get analytics data
    const [
      total,
      pending,
      claimed,
      inProgress,
      resolved,
      escalated,
      categoryStats,
      recentComplaints,
    ] = await Promise.all([
      prisma.complaint.count(),
      prisma.complaint.count({ where: { status: "PENDING" } }),
      prisma.complaint.count({ where: { status: "CLAIMED" } }),
      prisma.complaint.count({ where: { status: "IN_PROGRESS" } }),
      prisma.complaint.count({ where: { status: "RESOLVED" } }),
      prisma.complaint.count({ where: { status: "ESCALATED" } }),
      prisma.complaint.groupBy({
        by: ["category"],
        _count: true,
      }),
      prisma.complaint.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          student: { 
            select: { 
              name: true 
            } 
          },
        },
      }),
    ])

    return NextResponse.json({
      overview: {
        total,
        pending,
        claimed,
        inProgress,
        resolved,
        escalated,
      },
      categoryStats: categoryStats.map((stat) => ({
        category: stat.category,
        count: stat._count,
      })),
      recentComplaints,
    })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    )
  }
}