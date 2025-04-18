import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pathname = searchParams.get("sanity-preview-pathname");

  // Disable Draft Mode by removing the cookie
  const dm = await draftMode();
  dm.disable();

  // Redirect to the path from the provided pathname
  redirect(pathname || "/");
}
