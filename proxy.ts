import { NextRequest, NextResponse } from "next/server";

// Define public routes that don't require authentication
const publicRoutes = [
  "/forgot-password",
  "/join",
  "/reset-password",
  "/signin",
  "/success",
  "/verification",
];

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Get access token from cookies
  const accessToken = req.cookies.get("accessToken")?.value;

  // 1️⃣ If user is logged in and tries to access authentication pages (like /signin or /join)
  // Redirect them to the dashboard
  if (accessToken && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 2️⃣ If user is NOT logged in and tries to access a PROTECTED route
  // (A route that is NOT in the publicRoutes list)
  const isPublicRoute = publicRoutes.includes(pathname);
  if (!accessToken && !isPublicRoute) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // 3️⃣ Handle your existing redirects
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (pathname === "/settings") {
    return NextResponse.redirect(new URL("/settings/organization", req.url));
  }

  // 4️⃣ If all checks pass, continue
  return NextResponse.next();
}

// Apply middleware to all routes except:
// - Next.js internals (_next/static, _next/image)
// - Favicon and static image extensions
// - Specific public folders (authImages, public)
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|authImages|public|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)$).*)",
  ],
};