"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { CircleAlert, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { domains } from "@/lib/content";
import { submitContact, type ContactData } from "@/lib/contact";

type Field = keyof ContactData;
type Errors = Partial<Record<Field, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MESSAGE_MAX = 2000;
const REQUIRED: Field[] = ["name", "email", "company", "message"];
const LABELS: Record<Field, string> = {
  name: "Name",
  email: "Work email",
  company: "Company",
  platform: "Platform",
  domain: "Domain",
  message: "Which workflow do you want finished?",
};

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
    case "platform":
      if (v.length > 100) return "Please keep this under 100 characters.";
      return;
    case "message":
      if (!v) return "Please enter the workflow you want finished.";
      if (v.length < 20) return "Please add a little more detail (at least 20 characters).";
      if (v.length > MESSAGE_MAX) return `Please keep this under ${MESSAGE_MAX} characters.`;
      return;
  }
}

const ORDER: Field[] = ["name", "email", "company", "platform", "domain", "message"];
const empty: ContactData = { name: "", email: "", company: "", platform: "", domain: "", message: "" };

// Pre-selects the domain from ?domain=<id> (links on /industries).
// The static page renders <ContactForm /> as the Suspense fallback, so the form works before hydration.
export function ContactFormWithParams() {
  const id = useSearchParams().get("domain");
  const match = domains.find((d) => d.id === id);
  return <ContactForm initialDomain={match?.name} />;
}

export function ContactForm({ initialDomain = "" }: { initialDomain?: string }) {
  const uid = useId();
  const [data, setData] = useState<ContactData>({ ...empty, domain: initialDomain });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [summary, setSummary] = useState<Field[]>([]);
  const summaryRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);
  const fid = (f: Field) => `${uid}-${f}`;

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
    setSummary(invalid);
    if (invalid.length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setStatus("sending");
    try {
      await submitContact({
        ...data,
        name: data.name.trim(),
        email: data.email.trim(),
        company: data.company.trim(),
        platform: data.platform.trim(),
      });
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div role="status">
        <h2 ref={doneRef} tabIndex={-1} className="t-h3 outline-none">
          Your email app should now open with your message.
        </h2>
        <p className="mt-3 text-muted-fg">
          Nothing is sent until you press Send in your email app. Once it arrives, we reply by email.
        </p>
        <Button type="button" variant="secondary" className="mt-6" onClick={() => setStatus("idle")}>
          Back to the form
        </Button>
      </div>
    );
  }

  const describedBy = (field: Field, hint?: boolean) =>
    [errors[field] && `${fid(field)}-error`, hint && `${fid(field)}-hint`].filter(Boolean).join(" ") || undefined;

  const fieldProps = (field: Field, hint?: boolean) => ({
    id: fid(field),
    name: field,
    value: data[field],
    onChange: set(field),
    onBlur: blur(field),
    "aria-invalid": errors[field] ? (true as const) : undefined,
    "aria-describedby": describedBy(field, hint),
    className: "field",
    disabled: status === "sending",
  });

  const error = (field: Field) =>
    errors[field] ? (
      <p id={`${fid(field)}-error`} className="mt-2 flex items-start gap-1.5 text-sm text-error">
        <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
        {errors[field]}
      </p>
    ) : null;

  const label = (field: Field) => (
    <Label htmlFor={fid(field)} className="mb-2 block text-[15px] font-medium">
      {LABELS[field]}
      <span className="font-normal text-muted-fg">{REQUIRED.includes(field) ? " (required)" : " (optional)"}</span>
    </Label>
  );

  const sending = status === "sending";
  const nearLimit = data.message.length >= MESSAGE_MAX * 0.9;

  return (
    <form noValidate onSubmit={onSubmit} aria-labelledby="form-title" className="space-y-6">
      <h2 id="form-title" className="t-h3">
        Tell us your last-mile workflow
      </h2>
      {summary.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-[var(--r-ctl)] border border-error p-4 text-error outline-none">
          <p className="flex items-start gap-2">
            <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
            {summary.length > 1 ? `Please fix the ${summary.length} fields marked below.` : "Please fix the field marked below."}
          </p>
          <ul className="mt-2 ml-7 list-disc">
            {summary.map((f) => (
              <li key={f}>
                <a href={`#${fid(f)}`} className="link !text-error">
                  {LABELS[f]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {status === "failed" && (
        <p role="alert" className="flex items-start gap-2 rounded-[var(--r-ctl)] border border-error p-4 text-error">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          Your message didn&apos;t send. Please try again.
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          {label("name")}
          <Input {...fieldProps("name")} autoComplete="name" required maxLength={100} />
          {error("name")}
        </div>
        <div>
          {label("email")}
          <Input {...fieldProps("email")} type="email" autoComplete="email" required />
          {error("email")}
        </div>
        <div>
          {label("company")}
          <Input {...fieldProps("company")} autoComplete="organization" required maxLength={120} />
          {error("company")}
        </div>
        <div>
          {label("platform")}
          <Input {...fieldProps("platform", true)} maxLength={100} />
          <p id={`${fid("platform")}-hint`} className="mt-2 text-sm text-muted-fg">
            e.g. ERP, CRM, procurement
          </p>
          {error("platform")}
        </div>
        <div className="sm:col-span-2">
          {label("domain")}
          <select {...fieldProps("domain")}>
            <option value="">Select a domain</option>
            {domains.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div>
        {label("message")}
        <Textarea {...fieldProps("message", true)} rows={5} required maxLength={MESSAGE_MAX} />
        <div className="mt-2 flex justify-between gap-4 text-sm text-muted-fg">
          <p id={`${fid("message")}-hint`}>A sentence or two is enough.</p>
          <p aria-hidden="true" className="tabular-nums">
            {data.message.length}/{MESSAGE_MAX}
          </p>
        </div>
        <p aria-live="polite" className="sr-only">
          {nearLimit ? `${data.message.length} of ${MESSAGE_MAX} characters used.` : ""}
        </p>
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
        <p className="mt-4 text-sm text-muted-fg">
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
