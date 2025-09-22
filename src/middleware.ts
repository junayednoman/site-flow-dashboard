import { NextResponse, NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface DecodedUser {
  _id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  const token = request.cookies.get("constructionAccessToken")?.value;

  let isAuthenticated = false;
  let decodedUser: DecodedUser | null = null;

  if (token) {
    try {
      decodedUser = jwtDecode<DecodedUser>(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedUser.exp > currentTime && decodedUser.role === "admin") {
        isAuthenticated = true;
      }
    } catch {
      // Invalid token; treat as unauthenticated
    }
  }

  const isDashboardPath = pathname.startsWith("/dashboard");
  const isAuthPath = pathname.startsWith("/auth");

  // ✅ Redirect root `/` to `/dashboard`
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isDashboardPath && !isAuthenticated) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set(
      "redirect",
      pathname + (searchParams.toString() ? `?${searchParams}` : "")
    );
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPath && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/:path*", "/dashboard/:path*"], // 👈 add "/" here
};
