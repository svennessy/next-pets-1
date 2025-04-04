// required for kinde install
import { NextRequest } from "next/server"
import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server"

export async function GET(request: NextRequest, { params }: any) {
  const endpoint = (await params).kindeAuth
  return handleAuth(request, endpoint)
}
