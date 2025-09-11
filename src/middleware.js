import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.NEXT_AUTH_SECRET,
  });

  const protectedRoutes = ["/dashboard"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Not authenticated
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Authenticated but role not admin
  if (isProtectedRoute && token && token.role !== "admin" && token.role !== "super_admin") {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("unauthorized", "true");
    return NextResponse.redirect(loginUrl);
  }

  // Redirect logged-in user from login/register
  if (
    token &&
    (pathname.startsWith("/login") || pathname.startsWith("/register") || pathname.startsWith("/reset-password"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/login", "/register", "/reset-password"],
};
