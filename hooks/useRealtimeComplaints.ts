"use client"

import { useEffect } from "react"
import { pusherClient } from "@/lib/pusher-client"

export function useRealtimeComplaints(onUpdate: () => void) {
  useEffect(() => {
    const channel = pusherClient.subscribe("complaints")

    channel.bind("complaint-created", () => {
      console.log("New complaint created - refreshing...")
      onUpdate()
    })

    channel.bind("complaint-claimed", () => {
      console.log("Complaint claimed - refreshing...")
      onUpdate()
    })

    channel.bind("complaint-updated", () => {
      console.log("Complaint updated - refreshing...")
      onUpdate()
    })

    channel.bind("priority-increased", () => {
      console.log("Priority increased - refreshing...")
      onUpdate()
    })

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [onUpdate])
}