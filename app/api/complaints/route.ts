import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const complaintSchema = z.object({
  title: z.string().min(10).max(100),
  description: z.string().min(20).max(1000),
  category: z.enum(["HOSTEL", "MESS", "ACADEMIC", "INTERNET_NETWORK", "INFRASTRUCTURE", "OTHERS"]),
  location: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "STUDENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check for existing in-progress complaint
    const existingComplaint = await prisma.complaint.findFirst({
      where: {
        studentId: session.user.id,
        status: "IN_PROGRESS",
      },
    })

    if (existingComplaint) {
      return NextResponse.json(
        {
          error: "You cannot submit a new complaint while you have one in progress",
          code: "COMPLAINT_IN_PROGRESS",
        },
        { status: 400 }
      )
    }

    const body = await req.json()
    const data = complaintSchema.parse(body)

    const complaint = await prisma.complaint.create({
      data: {
        ...data,
        studentId: session.user.id,
      },
      include: {
        student: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    // Create activity log
    await prisma.activity.create({
      data: {
        complaintId: complaint.id,
        userId: session.user.id,
        action: "CREATED",
        newStatus: "PENDING",
        remarks: "Complaint submitted",
      },
    })

    // TODO: Trigger real-time update

    return NextResponse.json(complaint, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }
    console.error("Error creating complaint:", error)
    return NextResponse.json(
      { error: "Failed to create complaint" },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Students see only their complaints
    if (session.user.role === "STUDENT") {
      const complaints = await prisma.complaint.findMany({
        where: {
          studentId: session.user.id,
        },
        include: {
          student: {
            select: {
              name: true,
              email: true,
            },
          },
          claimedBy: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      })

      return NextResponse.json(complaints)
    }

    // Admins and super admins see all
    const complaints = await prisma.complaint.findMany({
      include: {
        student: {
          select: {
            name: true,
            email: true,
          },
        },
        claimedBy: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
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