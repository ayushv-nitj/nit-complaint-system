import { NextResponse } from "next/server"
import { checkPriorityIncrease, checkEscalation } from "@/services/timeBasedService"

export async function GET(req: Request) {
  // Verify cron secret for security
  const authHeader = req.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    console.log("=== Cron job started ===")
    
    const [priorityIncreased, escalated] = await Promise.all([
      checkPriorityIncrease(),
      checkEscalation(),
    ])

    console.log(`=== Cron job completed: ${priorityIncreased} priority increased, ${escalated} escalated ===`)

    return NextResponse.json({
      success: true,
      priorityIncreased,
      escalated,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Cron job error:", error)
    return NextResponse.json(
      { error: "Cron job failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}