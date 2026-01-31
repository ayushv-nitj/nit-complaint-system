import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { GraduationCap, Shield, ShieldCheck } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-5xl font-bold text-gray-900">
            NIT Jamshedpur
          </h1>
          <h2 className="text-3xl font-semibold text-gray-700">
            Complaint Management System
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A real-time platform for managing and resolving campus issues with transparency and accountability.
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800">
            Select Your Role
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Student Card */}
            <Card className="hover:shadow-xl transition-shadow border-2 hover:border-blue-500">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <GraduationCap className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Student</CardTitle>
                <CardDescription>
                  Submit and track your complaints
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="text-sm text-gray-600 space-y-2 mb-4">
                  <li>• Submit new complaints</li>
                  <li>• Track complaint status</li>
                  <li>• Receive real-time updates</li>
                  <li>• View complaint history</li>
                </ul>
                <div className="space-y-2">
                  <Button asChild className="w-full" size="lg">
                    <Link href="/login?role=student">Student Login</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/register">New Student? Register</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Admin Card */}
            <Card className="hover:shadow-xl transition-shadow border-2 hover:border-green-500">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Admin</CardTitle>
                <CardDescription>
                  Manage and resolve complaints
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="text-sm text-gray-600 space-y-2 mb-4">
                  <li>• Claim complaints</li>
                  <li>• Update complaint status</li>
                  <li>• Add remarks</li>
                  <li>• Track your assignments</li>
                </ul>
                <div className="space-y-2">
                  <Button asChild className="w-full bg-green-600 hover:bg-green-700" size="lg">
                    <Link href="/login?role=admin">Admin Login</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                    <Link href="/register/admin">New Admin? Register</Link>
                  </Button>
                 </div>
            </CardContent>
            </Card>

            {/* Super Admin Card */}
            <Card className="hover:shadow-xl transition-shadow border-2 hover:border-purple-500">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Super Admin</CardTitle>
                <CardDescription>
                  Monitor system-wide performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="text-sm text-gray-600 space-y-2 mb-4">
                  <li>• View all complaints</li>
                  <li>• Access analytics</li>
                  <li>• Monitor escalations</li>
                  <li>• Generate reports</li>
                </ul>
                <div className="space-y-2">
                  <Button asChild className="w-full bg-purple-600 hover:bg-purple-700" size="lg">
                    <Link href="/login?role=superadmin">Super Admin Login</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50">
                    <Link href="/register/superadmin">New Super Admin? Register</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Demo Credentials Section */}
        <div className="max-w-3xl mx-auto mt-12">
          <Card className="bg-gray-50 border-gray-200">
            <CardHeader>
              <CardTitle className="text-center text-lg">Demo Credentials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <p className="font-semibold text-blue-600 mb-1">Student</p>
                  <p className="text-gray-600">student1@nitjsr.ac.in</p>
                  <p className="text-gray-600">Password123!</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-green-600 mb-1">Admin</p>
                  <p className="text-gray-600">admin@nitjsr.ac.in</p>
                  <p className="text-gray-600">Password123!</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-purple-600 mb-1">Super Admin</p>
                  <p className="text-gray-600">superadmin@nitjsr.ac.in</p>
                  <p className="text-gray-600">Password123!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Key Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Real-Time Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get instant notifications when your complaint status changes. No manual refresh needed.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Time-Based Intelligence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Automatic priority escalation after 30 minutes and super admin escalation after 24 hours.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Complete Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Full activity history and audit trail for every complaint from submission to resolution.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Accountability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Clear ownership with exclusive claim system. One admin per complaint ensures responsibility.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}