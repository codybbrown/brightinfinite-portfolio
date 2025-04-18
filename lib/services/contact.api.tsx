import { sanityClient } from "../sanity/client";
import { contactInfoQuery } from "../sanity/queries";
import {
  ContactFormData,
  ContactInfo,
  ContactResponse,
} from "../../types/contact.types";
import { validateEmail, validateRequired } from "../utils/validation";

export async function getContactInfo(): Promise<ContactInfo | null> {
  return await sanityClient.fetch(contactInfoQuery);
}

export async function submitContactForm(
  formData: ContactFormData
): Promise<ContactResponse> {
  // Validate form data
  if (!validateRequired(formData.name)) {
    return {
      success: false,
      message: "Name is required",
      error: "name_required",
    };
  }

  if (!validateEmail(formData.email)) {
    return {
      success: false,
      message: "Invalid email address",
      error: "invalid_email",
    };
  }

  if (!validateRequired(formData.subject)) {
    return {
      success: false,
      message: "Subject is required",
      error: "subject_required",
    };
  }

  if (!validateRequired(formData.message)) {
    return {
      success: false,
      message: "Message is required",
      error: "message_required",
    };
  }

  try {
    // In a real application, you would send this data to your backend
    // or email service. For now, we'll just return a success response.
    return {
      success: true,
      message: "Thank you for your message. We will get back to you soon.",
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      success: false,
      message:
        "An error occurred while submitting your message. Please try again later.",
      error: "submission_error",
    };
  }
}
