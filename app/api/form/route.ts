import { UserSchema } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

// Handles POST requests to /api
export async function POST(request: Request) {
  const body = await request.json();
  // const body = await request;

  // console.log("POST in route.ts", request);
  // console.log("POST body", body);
  console.log("POST messages", body);
  // Use Zod to validate the received data against the UserSchema
  const result = UserSchema.safeParse(body);

  // // // Check if the validation is successful
  // if (result.success) {
  //   return NextResponse.json({ success: true });
  // }

  // // // If validation errors, map them into an object
  const serverErrors = Object.fromEntries(
    result.error?.issues?.map((issue) => [issue.path[0], issue.message]) || []
  );

  // ...
  return NextResponse.json({ errors: serverErrors });
}

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const data = req.body;
//   console.log(data);
//   console.log(
//     "ENV",
//     process.env.NEXT_PUBLIC_ANALYTICS_ID,
//     process.env.USERNAME
//   );
//   //   const id = await createItem(data);
//   // setTimeout for UI status feedback
//   await setTimeout(() => res.status(200).json({ id: 333 }), 100);
// }
