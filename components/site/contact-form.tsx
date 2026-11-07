"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { CircleAlert, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { EMAIL, industries } from "@/lib/content";
import { submitContact, type ContactData } from "@/lib/contact";

type Field = keyof ContactData;
type Errors = Partial<Record<Field, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MESSAGE_MAX = 2000;
const ORDER: Field[] = ["name", "email", "company", "industry", "message"];

function validateField(field: Field, raw: string): string | undefined {
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
    case "message":
      if (!v) return "Please enter what you want to build.";
      if (v.length < 20) return "Please add a little more detail (at least 20 characters).";
      if (v.length > MESSAGE_MAX) return `Please keep this under ${MESSAGE_MAX} characters.`;
      return;
  }
}

const empty: ContactData = { name: "", email: "", company: "", industry: "", message: "" };

// Pre-selects the industry from ?industry=<section id> (links on /industries).
// The static page renders <ContactForm /> as the Suspense fallback, so the form works before hydration.
export function ContactFormWithParams() {
  const id = useSearchParams().get("industry");
  const match = industries.find((i) => i.id === id);
  return <ContactForm initialIndustry={match?.name} />;
}

export function ContactForm({ initialIndustry = "" }: { initialIndustry?: string }) {
  const uid = useId();
  const [data, setData] = useState<ContactData>({ ...empty, industry: initialIndustry });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [summary, setSummary] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "sent") doneRef.current?.focus();
  }, [status]);

  const set = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.value;
    setData((d) => ({ ...d, [field]: value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: validateField(field, value) }));
  };
  const blur = (field: Field) => () => setErrors((er) => ({ ...er, [field]: validateField(field, data[field]) }));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    // Honeypot: bots fill the hidden "website" field. Pretend success, send nothing.
    if ((form.elements.namedItem("website") as HTMLInputElement | null)?.value) {
      setStatus("sent");
      return;
    }
    const next: Errors = {};
    for (const f of ORDER) next[f] = validateField(f, data[f]);
    setErrors(next);
    const invalid = ORDER.filter((f) => next[f]);
    if (invalid.length) {
      setSummary(invalid.length > 1 ? `Please fix the ${invalid.length} fields marked below.` : null);
      form.querySelector<HTMLElement>(`#${CSS.escape(`${uid}-${invalid[0]}`)}`)?.focus();
      return;
    }
    setSummary(null);
    setStatus("sending");
    try {
      await submitContact({ ...data, name: data.name.trim(), email: data.email.trim(), company: data.company.trim() });
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="py-4">
        <h2 ref={doneRef} tabIndex={-1} className="t-h3 outline-none">
          Thanks. Your message is on its way. We&apos;ll reply by email.
        </h2>
        <p className="mt-3 text-muted-foreground">
          Your email app should open with the message ready to send. Or email us at{" "}
          <a className="link" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          .
        </p>
      </div>
    );
  }

  const fieldProps = (field: Field) => ({
    id: `${uid}-${field}`,
    name: field,
    value: data[field],
    onChange: set(field),
    onBlur: blur(field),
    "aria-invalid": errors[field] ? (true as const) : undefined,
    "aria-describedby": [errors[field] && `${uid}-${field}-error`, field === "message" && `${uid}-message-hint`]
      .filter(Boolean)
      .join(" ") || undefined,
    className: "field",
  });

  const error = (field: Field) =>
    errors[field] ? (
      <p id={`${uid}-${field}-error`} className="mt-2 flex items-start gap-1.5 text-sm text-error">
        <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
        {errors[field]}
      </p>
    ) : null;

  const label = (field: Field, text: string, optional = false) => (
    <Label htmlFor={`${uid}-${field}`} className="mb-2 block text-[15px] font-semibold">
      {text}
      {optional && <span className="font-normal text-muted-foreground"> (optional)</span>}
    </Label>
  );

  const sending = status === "sending";

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-labelledby="form-title" className="space-y-6">
      <h2 id="form-title" className="sr-only">
        Contact form
      </h2>
      {summary && (
        <p role="alert" className="flex items-start gap-2 rounded-sm border border-error p-4 text-error">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          {summary}
        </p>
      )}
      {status === "failed" && (
        <p role="alert" className="flex items-start gap-2 rounded-sm border border-error p-4 text-error">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          <span>
            Your message didn&apos;t send. Please try again, or email us at{" "}
            <a className="link" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
            .
          </span>
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          {label("name", "Name")}
          <Input {...fieldProps("name")} autoComplete="name" required maxLength={100} disabled={sending} />
          {error("name")}
        </div>
        <div>
          {label("email", "Work email")}
          <Input {...fieldProps("email")} type="email" autoComplete="email" required disabled={sending} />
          {error("email")}
        </div>
        <div>
          {label("company", "Company")}
          <Input {...fieldProps("company")} autoComplete="organization" required maxLength={120} disabled={sending} />
          {error("company")}
        </div>
        <div>
          {label("industry", "Industry", true)}
          <select {...fieldProps("industry")} disabled={sending}>
            <option value="">Select an industry</option>
            {industries.map((i) => (
              <option key={i.id} value={i.name}>
                {i.name}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div>
        {label("message", "What do you want to build?")}
        <Textarea {...fieldProps("message")} rows={5} required maxLength={MESSAGE_MAX} disabled={sending} />
        <div className="mt-2 flex justify-between gap-4 text-sm text-muted-foreground">
          <p id={`${uid}-message-hint`}>A sentence or two is enough.</p>
          <p aria-live="polite" className="tabular-nums">
            {data.message.length}/{MESSAGE_MAX}
          </p>
        </div>
        {error("message")}
      </div>

      {/* Honeypot, hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <Button type="submit" className="w-full" disabled={sending}>
          {sending ? (
            <>
              <LoaderCircle aria-hidden="true" className="animate-spin" />
              Sending…
            </>
          ) : (
            "Send message"
          )}
        </Button>
        <p className="mt-4 text-sm text-muted-foreground">
          By sending this form you agree to our{" "}
          <Link className="link" href="/privacy">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
