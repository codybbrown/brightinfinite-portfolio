export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: string;
  socialMedia?: {
    platform: string;
    url: string;
  }[];
  businessHours?: {
    day: string;
    hours: string;
  }[];
}

export interface ContactResponse {
  success: boolean;
  message: string;
  error?: string;
}
