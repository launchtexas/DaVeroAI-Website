export type ContactData = {
  name: string;
  email: string;
  company: string;
  platform: string;
  domain: string;
  message: string;
};

// The only place that delivers a contact message: POSTs it to /api/contact, which emails it via Resend.
// Throws on any non-2xx response so the form shows its failure state.
export async function submitContact(data: ContactData): Promise<void> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Contact request failed (${res.status})`);
}
