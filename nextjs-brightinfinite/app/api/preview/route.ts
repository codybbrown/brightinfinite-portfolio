import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("sanity-preview-secret");
  const pathname = searchParams.get("sanity-preview-pathname");

  // For development, we'll accept any preview secret
  if (process.env.NODE_ENV === "development") {
    const dm = await draftMode();
    dm.enable();
    redirect(pathname || "/");
  }

  // In production, we'll check against our secret
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  const dm = await draftMode();
  dm.enable();
  redirect(pathname || "/");
}
