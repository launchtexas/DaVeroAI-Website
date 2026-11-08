import type { ContactData } from "./contact";

// Validation shared by the contact form (client) and /api/contact (server), so the two never drift.
export type Field = keyof ContactData;

export const MESSAGE_MAX = 2000;
export const FIELDS: Field[] = ["name", "email", "company", "platform", "domain", "message"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateField(field: Field, raw: string): string | undefined {
  const v = raw.trim();
  switch (field) {
    case "name":
      if (v.length < 2) return "Please enter your name.";
      if (v.length > 100) return "Please keep this under 100 characters.";
      return;
    case "email":
      if (!v) return "Please enter your work email.";
      if (!EMAIL_RE.test(v) || v.length > 254) return "Please enter a valid email address, like name@company.com.";
      return;
    case "company":
      if (v.length < 2) return "Please enter your company.";
      if (v.length > 120) return "Please keep this under 120 characters.";
      return;
    case "platform":
    case "domain":
      if (v.length > 100) return "Please keep this under 100 characters.";
      return;
    case "message":
      if (!v) return "Please enter the workflow you want finished.";
      if (v.length < 20) return "Please add a little more detail (at least 20 characters).";
      if (v.length > MESSAGE_MAX) return `Please keep this under ${MESSAGE_MAX} characters.`;
      return;
  }
}
