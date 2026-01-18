import { NextRequest, NextResponse } from "next/server";

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Get access token from cookies
  const accessToken = req.cookies.get("accessToken")?.value;

  // 1️⃣ If user is logged in and visits /signin → redirect to /dashboard
  if (accessToken && pathname === "/signin") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 2️⃣ If user is not logged in and visits any protected route → redirect to /signin
  if (!accessToken && pathname !== "/signin") {
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

// Apply middleware to all routes except Next.js static files
export const config = {
  matcher: ["/((?!_next/static|favicon.ico).*)"],
};
