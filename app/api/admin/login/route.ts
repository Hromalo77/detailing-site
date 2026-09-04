import { createAdminSession, isAdminPassword } from "@/app/admin/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = String(formData.get("password") ?? "");

  if (!(await isAdminPassword(password))) {
    return NextResponse.redirect(new URL("/admin?error=1", request.url));
  }

  await createAdminSession();
  return NextResponse.redirect(new URL("/admin", request.url));
}
