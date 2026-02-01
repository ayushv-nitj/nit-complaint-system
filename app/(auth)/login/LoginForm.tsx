"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import Link from "next/link"
import { ArrowLeft, GraduationCap, Shield, ShieldCheck } from "lucide-react"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

type LoginForm = z.infer<typeof loginSchema>

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const role = searchParams.get("role") || "student"

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const getRoleConfig = () => {
    switch (role) {
      case "admin":
        return {
          title: "Admin Login",
          icon: Shield,
          color: "green",
          bgColor: "bg-green-100",
          iconColor: "text-green-600",
          buttonColor: "bg-green-600 hover:bg-green-700",
        }
      case "superadmin":
        return {
          title: "Super Admin Login",
          icon: ShieldCheck,
          color: "purple",
          bgColor: "bg-purple-100",
          iconColor: "text-purple-600",
          buttonColor: "bg-purple-600 hover:bg-purple-700",
        }
      default:
        return {
          title: "Student Login",
          icon: GraduationCap,
          color: "blue",
          bgColor: "bg-blue-100",
          iconColor: "text-blue-600",
          buttonColor: "bg-blue-600 hover:bg-blue-700",
        }
    }
  }

  const config = getRoleConfig()
  const Icon = config.icon

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true)
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        toast.error("Invalid credentials")
        return
      }

      // Get user session to determine actual role
      const response = await fetch("/api/auth/session")
      const session = await response.json()

      if (session?.user?.role) {
        const userRole = session.user.role.toLowerCase()
        
        // Redirect based on actual user role
        if (userRole === "super_admin") {
          router.push("/superadmin")
        } else if (userRole === "admin") {
          router.push("/admin")
        } else {
          router.push("/student")
        }
        
        router.refresh()
      } else {
        router.push("/student")
        router.refresh()
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
          
          <div className={`mx-auto w-16 h-16 ${config.bgColor} rounded-full flex items-center justify-center mb-4`}>
            <Icon className={`w-8 h-8 ${config.iconColor}`} />
          </div>
          
          <CardTitle className="text-2xl font-bold text-center">
            {config.title}
          </CardTitle>
          <CardDescription className="text-center">
            NIT Jamshedpur Complaint Management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your-email@nitjsr.ac.in"
                {...register("email")}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full ${config.buttonColor}`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-6 border-t pt-6">
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href={`/register?role=${role}`} className="text-blue-600 hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}