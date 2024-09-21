import { UserSchema } from "@/types";
import { NextResponse } from "next/server";

// Handles POST requests to /api
export async function POST(request: Request) {
  const body = await request.json();

  const result = UserSchema.safeParse(body);

  const serverErrors = Object.fromEntries(
    result.error?.issues?.map((issue) => [issue.path[0], issue.message]) || []
  );

  console.log("serverErrors", serverErrors);

  if (result.success && !serverErrors.length) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({
    errors: serverErrors,
  });
}
