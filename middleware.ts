import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    if (path.startsWith("/admin") && token?.role !== "ADMIN" && token?.role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/student", req.url))
    }

    if (path.startsWith("/superadmin") && token?.role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/student", req.url))
    }

    if (path.startsWith("/student") && token?.role !== "STUDENT") {
      const redirectPath = token?.role === "SUPER_ADMIN" ? "/superadmin" : "/admin"
      return NextResponse.redirect(new URL(redirectPath, req.url))
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