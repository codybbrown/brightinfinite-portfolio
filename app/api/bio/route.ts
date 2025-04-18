import { NextResponse } from "next/server";
import { getBio, updateBio } from "../../../lib/services/bio.api";

export async function GET() {
  try {
    const bio = await getBio();
    if (!bio) {
      return NextResponse.json({ error: "Bio not found" }, { status: 404 });
    }
    return NextResponse.json(bio);
  } catch (error) {
    console.error("Error in bio API:", error);
    return NextResponse.json(
      { error: "Failed to fetch bio data" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const bioData = await request.json();
    const updatedBio = await updateBio(bioData);

    if (!updatedBio) {
      return NextResponse.json(
        { error: "Failed to update bio" },
        { status: 400 }
      );
    }

    return NextResponse.json(updatedBio);
  } catch (error) {
    console.error("Error in bio API:", error);
    return NextResponse.json(
      { error: "Failed to update bio data" },
      { status: 500 }
    );
  }
}
