import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (token?.email === process.env.ADM_EMAIL) return;

  return NextResponse.redirect(new URL("/", req.url));
}

export const config = {
  matcher: ["/add-word", "/create-text"],
};
