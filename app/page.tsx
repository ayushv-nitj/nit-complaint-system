import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center space-y-6 max-w-3xl px-4">
        <h1 className="text-5xl font-bold text-gray-900">
          NIT Jamshedpur
        </h1>
        <h2 className="text-3xl font-semibold text-gray-700">
          Complaint Management System
        </h2>
        <p className="text-lg text-gray-600">
          A real-time platform for managing and resolving campus issues with transparency and accountability.
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Button asChild size="lg">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}