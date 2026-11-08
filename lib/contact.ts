import { EMAIL } from "./content";

export type ContactData = {
  name: string;
  email: string;
  company: string;
  platform: string;
  domain: string;
  message: string;
};

// The only place that delivers a contact message. No email provider is chosen yet,
// so this opens the visitor's email app with a prefilled message to EMAIL; nothing is sent until they press Send.
// To add a real backend later, replace the body with a fetch() to it and keep the signature.
export async function submitContact(data: ContactData): Promise<void> {
  const subject = `Website enquiry from ${data.name}, ${data.company}`;
  const body = [
    `Name: ${data.name}`,
    `Work email: ${data.email}`,
    `Company: ${data.company}`,
    ...(data.platform ? [`Platform: ${data.platform}`] : []),
    ...(data.domain ? [`Domain: ${data.domain}`] : []),
    "",
    data.message,
  ].join("\n");
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
