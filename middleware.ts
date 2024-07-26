import { NextRequest, NextResponse } from "next/server";
import { nhost } from "@/lib/nhost";

// Middleware function to handle redirects based on authentication
export async function middleware(req: NextRequest) {
  const token = req.cookies.get("nhost-auth-token");

  // List of paths that should not be redirected
  const publicPaths = ["/signup", "/login"];

  // Check if user is logged in
  if (token) {
    // Redirect logged-in users from signup and login pages to the home page
    if (publicPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else {
    // Redirect users without token to the signup page
    if (publicPaths.every((path) => !req.nextUrl.pathname.startsWith(path))) {
      return NextResponse.redirect(new URL("/signup", req.url));
    }
  }

  // Allow request to continue
  return NextResponse.next();
}

// Middleware configuration
export const config = {
  matcher: ["/((?!api|_next|static|public).*)"], // Exclude API, static files, and public paths
};
