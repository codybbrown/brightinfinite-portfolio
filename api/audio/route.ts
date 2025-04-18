import { NextRequest } from "next/server";
import { proxyAudio } from "./proxy";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return new Response("Missing URL parameter", { status: 400 });
  }

  return proxyAudio(url);
}
