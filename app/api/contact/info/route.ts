import { NextResponse } from "next/server";
import { getContactInfo } from "../../../../lib/services/contact.api";

export async function GET() {
  try {
    const contactInfo = await getContactInfo();
    if (!contactInfo) {
      return NextResponse.json(
        { error: "Contact info not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(contactInfo);
  } catch (error) {
    console.error("Error in contact info API:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact information" },
      { status: 500 }
    );
  }
}
