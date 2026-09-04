import { clearAdminSession } from "@/app/admin/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await clearAdminSession();
  return NextResponse.redirect(new URL("/admin", request.url));
}
