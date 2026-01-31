import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Super Admin access
    if (path.startsWith("/superadmin") && token?.role !== "SUPER_ADMIN") {
      // Redirect non-super-admins away
      if (token?.role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin", req.url))
      }
      return NextResponse.redirect(new URL("/student", req.url))
    }

    // Admin access
    if (path.startsWith("/admin") && token?.role !== "ADMIN" && token?.role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/student", req.url))
    }

    // Student access
    if (path.startsWith("/student") && token?.role !== "STUDENT") {
      if (token?.role === "SUPER_ADMIN") {
        return NextResponse.redirect(new URL("/superadmin", req.url))
      }
      if (token?.role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin", req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    "/student/:path*",
    "/admin/:path*",
    "/superadmin/:path*",
  ],
}