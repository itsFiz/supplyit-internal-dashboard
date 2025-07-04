import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { canAccessRoute, Role } from "./lib/rbac";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // If no token, redirect to signin
    if (!token) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    // Check if user has access to the route
    const userRole = token.role as Role;
    if (!canAccessRoute(userRole, pathname)) {
      // Redirect to dashboard if no access
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/team/:path*",
    "/milestones/:path*",
    "/budget/:path*",
    "/analytics/:path*",
    "/reports/:path*",
    "/roadmap/:path*",
    "/settings/:path*",
  ],
}; 