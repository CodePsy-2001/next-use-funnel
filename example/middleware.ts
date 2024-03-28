import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const SID = "sid" as const;

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });

  if (!cookies().get(SID))
    response.cookies.set(SID, crypto.randomUUID(), {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

  return response;
}
