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
      // Redirect to main page if no access
      return NextResponse.redirect(new URL("/", req.url));
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
    "/",
    "/team",
    "/milestones",
    "/budget",
    "/analytics",
    "/roadmap",
  ],
}; 