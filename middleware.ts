import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside

const legacyPrefixes = ["/signin", "/signup", "/signout"];
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const url = request.nextUrl.clone();

  if (token) {
    const checkPRefixes = legacyPrefixes.some((prefix) => {
      return url.pathname.startsWith(prefix);
    });

    if (checkPRefixes) {
      return NextResponse.redirect(new URL("/", url.origin));
    }
  } else {
    if (
      url.pathname === "/profile" ||
      url.pathname === "/product" ||
      url.pathname === "/"
    ) {
      return NextResponse.redirect(new URL("/signin", url.origin));
    }
    return NextResponse.next();
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/product", "/profile", "/signin"],
};
