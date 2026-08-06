import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const HOME_PREFIX = "/home/";
const HOME_ROOT = "/home";

function stripHomePrefixRedirect(request) {
  const { pathname, search } = request.nextUrl;
  let newPath = pathname;

  if (pathname === HOME_ROOT || pathname === `${HOME_ROOT}/`) {
    newPath = "/";
  } else if (pathname.startsWith(HOME_PREFIX)) {
    newPath = pathname.slice(HOME_PREFIX.length - 1);
    if (!newPath.startsWith("/")) newPath = "/" + newPath;
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = newPath === "" ? "/" : newPath;
  redirectUrl.search = search;

  return NextResponse.redirect(redirectUrl, { status: 301 });
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // 301 permanent redirect: /home/* -> /* (SEO URL migration)
  if (
    pathname === HOME_ROOT ||
    pathname === `${HOME_ROOT}/` ||
    pathname.startsWith(HOME_PREFIX)
  ) {
    return stripHomePrefixRedirect(request);
  }

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
  matcher: [
    "/home",
    "/home/:path*",
    "/dashboard",
    "/dashboard/:path*",
    "/login",
    "/register",
    "/reset-password",
  ],
};
