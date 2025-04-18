import { getContactInfo } from "@/lib/services/contact.api";
import ContactForm from "@/components/modules/contact/ContactForm";
import { notFound } from "next/navigation";
import type { ContactFormData } from "@/types/contact.types";

export default async function ContactPage() {
  const contactInfo = await getContactInfo();

  if (!contactInfo) {
    notFound();
  }

  const handleSubmit = async (data: ContactFormData) => {
    "use server";
    // TODO: Implement form submission logic
    console.log("Form submitted:", data);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Contact</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground mb-6">
            Have a question or want to work together? Fill out the form and I'll
            get back to you as soon as possible.
          </p>
          <div className="space-y-4">
            {contactInfo.email && (
              <div>
                <h3 className="font-medium">Email</h3>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-primary hover:text-primary/80"
                >
                  {contactInfo.email}
                </a>
              </div>
            )}
            {contactInfo.phone && (
              <div>
                <h3 className="font-medium">Phone</h3>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-primary hover:text-primary/80"
                >
                  {contactInfo.phone}
                </a>
              </div>
            )}
          </div>
        </div>
        <ContactForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
