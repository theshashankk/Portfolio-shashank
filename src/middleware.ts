import { NextResponse } from "next/server";

export function middleware() {
  const response = NextResponse.next();

  // Build a clean Content-Security-Policy string
  const cspHeader = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.hcaptcha.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://hcaptcha.com https://*.hcaptcha.com",
    "frame-src 'self' https://hcaptcha.com https://*.hcaptcha.com",
    "connect-src 'self' https://hcaptcha.com https://*.hcaptcha.com",
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "block-all-mixed-content",
    "upgrade-insecure-requests",
  ].join("; ");

  response.headers.set("Content-Security-Policy", cspHeader);

  return response;
}

// Apply middleware to all paths except api, _next/static, _next/image, and favicon.ico
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
