import { NextResponse, type NextRequest } from "next/server";
import { validAdminSession } from "./lib/admin-session";
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname !== "/admin/login" && !validAdminSession(request.cookies.get("admin_session")?.value)) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return NextResponse.next();
}
export const config = { matcher: ["/admin/:path*"] };
