"use client";

import { useState } from "react";
import { ContactFormData } from "../../../types/contact.types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { validateEmail, validateRequired } from "../../../lib/utils/validation";

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<ContactFormData> = {};

    if (!validateRequired(formData.name)) {
      newErrors.name = "Name is required";
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!validateRequired(formData.subject)) {
      newErrors.subject = "Subject is required";
    }

    if (!validateRequired(formData.message)) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await onSubmit(formData);
      setSubmitStatus({
        success: true,
        message: "Your message has been sent successfully!",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="name"
        value={formData.name}
        onChange={handleChange}
        disabled={isSubmitting}
      />

      <Input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        disabled={isSubmitting}
      />

      <Input
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        disabled={isSubmitting}
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full min-h-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isSubmitting}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message}</p>
        )}
      </div>

      {submitStatus && (
        <div
          className={`p-4 rounded-md ${
            submitStatus.success
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
        Send Message
      </Button>
    </form>
  );
}
