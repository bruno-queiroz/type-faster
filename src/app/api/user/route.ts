import { CreateUser } from "@/services/api/createUser";
import { NextResponse } from "next/server";

const userStack: CreateUser[] = [];
export function GET() {
  const user = userStack.pop();
  return new NextResponse(JSON.stringify(user || {}), { status: 200 });
}

export async function POST(request: Request) {
  const user = await request.json();
  userStack.push(user);

  return new NextResponse(JSON.stringify({}), { status: 201 });
}
