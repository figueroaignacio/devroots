import { getToken } from "next-auth/jwt";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./config/i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

async function handleAuth(request: NextRequest) {
  const token = await getToken({ req: request });

  const isAuthPage = request.nextUrl.pathname.startsWith("/login");
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return null;
}

export async function middleware(request: NextRequest) {
  const intlResponse = await intlMiddleware(request);

  if (intlResponse instanceof NextResponse) {
    return intlResponse;
  }

  const authResponse = await handleAuth(request);
  if (authResponse) {
    return authResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)", "/", "/(en|es)/:path*"],
};
