import prisma from "@/lib/prisma"
import { pusherServer } from "@/lib/pusher"

export async function checkPriorityIncrease() {
  console.log("Checking for priority increases...")
  
  const thirtyMinutesAgo = new Date(Date.now() - 1 * 60 * 1000)

  const complaintsToEscalate = await prisma.complaint.findMany({
    where: {
      status: "PENDING",
      priority: "NORMAL",
      createdAt: { lte: thirtyMinutesAgo },
    },
  })

  console.log(`Found ${complaintsToEscalate.length} complaints to increase priority`)

  for (const complaint of complaintsToEscalate) {
    await prisma.complaint.update({
      where: { id: complaint.id },
      data: { priority: "HIGH" },
    })

    // Log activity
    await prisma.activity.create({
      data: {
        complaintId: complaint.id,
        userId: complaint.studentId,
        action: "PRIORITY_INCREASED",
        remarks: "Auto-escalated to HIGH priority after 30 minutes",
      },
    })

    // Trigger real-time update
    await pusherServer.trigger("complaints", "priority-increased", {
      id: complaint.id,
      priority: "HIGH",
    })

    console.log(`Priority increased for complaint ${complaint.id}`)
  }

  return complaintsToEscalate.length
}

export async function checkEscalation() {
  console.log("Checking for escalations...")
  
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)

  const complaintsToEscalate = await prisma.complaint.findMany({
    where: {
      status: { in: ["CLAIMED", "IN_PROGRESS"] },
      escalatedAt: null,
      claimedAt: { lte: twentyFourHoursAgo },
    },
    include: {
      student: true,
      claimedBy: true,
    },
  })

  console.log(`Found ${complaintsToEscalate.length} complaints to escalate`)

  for (const complaint of complaintsToEscalate) {
    await prisma.complaint.update({
      where: { id: complaint.id },
      data: {
        status: "ESCALATED",
        escalatedAt: new Date(),
      },
    })

    // Log activity
    await prisma.activity.create({
      data: {
        complaintId: complaint.id,
        userId: complaint.claimedById!,
        action: "ESCALATED",
        previousStatus: complaint.status,
        newStatus: "ESCALATED",
        remarks: "Auto-escalated after 24 hours of no resolution",
      },
    })

    // Notify student
    await prisma.notification.create({
      data: {
        userId: complaint.studentId,
        complaintId: complaint.id,
        message: `Your complaint "${complaint.title}" has been escalated to higher authorities.`,
      },
    })

    // Notify all super admins
    const superAdmins = await prisma.user.findMany({
      where: { role: "SUPER_ADMIN" },
    })

    for (const admin of superAdmins) {
      await prisma.notification.create({
        data: {
          userId: admin.id,
          complaintId: complaint.id,
          message: `Complaint "${complaint.title}" has been escalated due to delayed resolution.`,
        },
      })
    }

    // Trigger real-time update
    await pusherServer.trigger("complaints", "complaint-updated", {
      id: complaint.id,
      status: "ESCALATED",
    })

    console.log(`Escalated complaint ${complaint.id}`)
  }

  return complaintsToEscalate.length
}