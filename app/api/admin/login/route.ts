import {
  createAdminSession,
  hasAdminPassword,
  isAdminPassword,
} from "@/app/admin/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = String(formData.get("password") ?? "");

  if (!hasAdminPassword()) {
    return NextResponse.redirect(new URL("/admin?error=config", request.url), 303);
  }

  if (!(await isAdminPassword(password))) {
    return NextResponse.redirect(new URL("/admin?error=1", request.url), 303);
  }

  await createAdminSession();
  return NextResponse.redirect(new URL("/admin", request.url), 303);
}
