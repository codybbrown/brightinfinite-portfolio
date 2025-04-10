import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return new NextResponse("Missing URL parameter", { status: 400 });
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch audio: ${response.statusText}`);
    }

    // Get the content type from the original response
    const contentType = response.headers.get("content-type") || "audio/mpeg";

    // Create a new response with the audio data
    const audioData = await response.arrayBuffer();

    return new NextResponse(audioData, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch (error) {
    console.error("Error proxying audio:", error);
    return new NextResponse("Failed to fetch audio", { status: 500 });
  }
}
