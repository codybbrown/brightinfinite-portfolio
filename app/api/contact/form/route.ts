import { NextResponse } from "next/server";
import { submitContactForm } from "../../../../lib/services/contact.api";
import { ContactFormData } from "../../../../types/contact.types";

export async function POST(request: Request) {
  try {
    const formData = (await request.json()) as ContactFormData;
    const response = await submitContactForm(formData);

    if (!response.success) {
      return NextResponse.json(response, { status: 400 });
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in contact form API:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while submitting your message",
        error: "submission_error",
      },
      { status: 500 }
    );
  }
}
