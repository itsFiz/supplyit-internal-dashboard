import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { canAccessRoute, Role } from "./lib/rbac";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Check if user has access to the route
    if (token) {
      const userRole = token.role as Role;
      if (!canAccessRoute(userRole, pathname)) {
        // Redirect to main page if no access
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
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
    "/dashboard",
    "/strategy",
    "/legal",
    "/fundraising",
    "/product",
    "/operations",
    "/brand",
    "/documents",
    "/team",
    "/milestones",
    "/financial-metrics",
    "/financial-projections",
    "/budget",
    "/analytics",
    "/roadmap",
  ],
}; 