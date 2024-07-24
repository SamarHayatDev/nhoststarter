// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);

  const accessToken: any =
    url.searchParams.get("refreshToken") ||
    request.cookies.get("nhostRefreshToken")?.value;

  const loggedInUserNotAccessPaths = request.nextUrl.pathname === "/login";

  if (loggedInUserNotAccessPaths) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      return;
    }
  }

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/:path", "/login"],
};
