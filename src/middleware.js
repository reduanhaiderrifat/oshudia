import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("next-auth.session-token");
  const { pathname } = req.nextUrl;

  // Allow requests to the authentication API routes
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Redirect to login if the token is missing
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
 matcher: ['/dashboard/:path*'],
};