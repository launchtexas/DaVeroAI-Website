"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { CircleAlert, LoaderCircle } from "lucide-react";
import { EMAIL } from "@/lib/content";
import { getFormToken, prefetchFormToken, submitContact, type ContactData } from "@/lib/contact";
import { FIELDS, MESSAGE_MAX, validateField, type Field } from "@/lib/contact-rules";
import { Turnstile, TURNSTILE_SITE_KEY } from "./turnstile";
import s from "./v4/forms.module.css";

type Errors = Partial<Record<Field, string>>;

const REQUIRED: Field[] = ["name", "email", "company", "message"];
const LABELS: Record<Field, string> = {
  name: "Name",
  email: "Work email",
  company: "Company",
  platform: "Platform",
  domain: "Domain",
  message: "Which workflow do you want finished?",
};

// v4 function pages; ?domain=<id> pre-selects one.
const domains = [
  { id: "finance-accounting", name: "Finance & Accounting" },
  { id: "supply-chain", name: "Supply Chain" },
  { id: "procurement", name: "Procurement" },
  { id: "security-governance", name: "Security & Governance" },
  { id: "insurance", name: "Insurance" },
];

const empty: ContactData = { name: "", email: "", company: "", platform: "", domain: "", message: "" };

// Pre-selects the domain from ?domain=<id>.
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
  const captcha = useRef("");
  const [captchaReset, setCaptchaReset] = useState(0);

  useEffect(() => {
    if (status === "sent") doneRef.current?.focus();
  }, [status]);
  useEffect(prefetchFormToken, []);

  // Waits up to 15 s for Turnstile to hand over a token (it usually has one already).
  async function captchaToken(): Promise<string> {
    for (let i = 0; i < 60 && !captcha.current; i++) await new Promise((r) => setTimeout(r, 250));
    if (!captcha.current) throw new Error("No Turnstile token");
    return captcha.current;
  }

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
    for (const f of FIELDS) next[f] = validateField(f, data[f]);
    setErrors(next);
    const invalid = FIELDS.filter((f) => next[f]);
    setSummary(invalid);
    if (invalid.length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setStatus("sending");
    try {
      const [t, turnstileToken] = await Promise.all([getFormToken(), TURNSTILE_SITE_KEY ? captchaToken() : undefined]);
      await submitContact(
        {
          ...data,
          name: data.name.trim(),
          email: data.email.trim(),
          company: data.company.trim(),
          platform: data.platform.trim(),
        },
        { t, turnstileToken },
      );
      setStatus("sent");
    } catch {
      setStatus("failed");
    } finally {
      // A Turnstile token works once; get a fresh one for the next submit.
      if (TURNSTILE_SITE_KEY) setCaptchaReset((n) => n + 1);
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className={s.success}>
        <h2 ref={doneRef} tabIndex={-1} className={s.successTitle}>
          Thank you. We will get back to you.
        </h2>
        <p className={s.successBody}>Your message has been sent. We&apos;ll reply by email.</p>
        <Link className={s.btn} href="/">
          Back to home
        </Link>
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
    disabled: status === "sending",
  });

  const error = (field: Field) =>
    errors[field] ? (
      <p id={`${fid(field)}-error`} className={s.fieldError}>
        <CircleAlert aria-hidden="true" size={14} className="mt-px shrink-0" />
        {errors[field]}
      </p>
    ) : null;

  const label = (field: Field) => (
    <label htmlFor={fid(field)}>
      {LABELS[field]}
      {REQUIRED.includes(field) ? <span className={s.req}>(required)</span> : <span className={s.opt}>(optional)</span>}
    </label>
  );

  const sending = status === "sending";
  const nearLimit = data.message.length >= MESSAGE_MAX * 0.9;

  return (
    // method="post": if someone submits before JavaScript loads, the details go in the body, not the URL.
    <form method="post" noValidate onSubmit={onSubmit} aria-labelledby="form-title">
      <h2 id="form-title" className={s.cardTitle}>
        Tell us your last-mile workflow
      </h2>
      {summary.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className={s.alert}>
          <CircleAlert aria-hidden="true" size={18} className="mt-0.5 shrink-0" />
          <div>
            <p className="m-0">
              {summary.length > 1 ? `Please fix the ${summary.length} fields marked below.` : "Please fix the field marked below."}
            </p>
            <ul>
              {summary.map((f) => (
                <li key={f}>
                  <a href={`#${fid(f)}`}>{LABELS[f]}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {status === "failed" && (
        <div role="alert" className={s.alert}>
          <CircleAlert aria-hidden="true" size={18} className="mt-0.5 shrink-0" />
          <p className="m-0">
            Your message didn&apos;t send. Please try again.
            <br />
            If it still fails, email us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
          </p>
        </div>
      )}

      <div className={s.fRow}>
        <div className={s.fGrp}>
          {label("name")}
          <input {...fieldProps("name")} type="text" autoComplete="name" required maxLength={100} />
          {error("name")}
        </div>
        <div className={s.fGrp}>
          {label("email")}
          <input {...fieldProps("email")} type="email" autoComplete="email" required />
          {error("email")}
        </div>
      </div>
      <div className={s.fRow}>
        <div className={s.fGrp}>
          {label("company")}
          <input {...fieldProps("company")} type="text" autoComplete="organization" required maxLength={120} />
          {error("company")}
        </div>
        <div className={s.fGrp}>
          {label("platform")}
          <input {...fieldProps("platform", true)} type="text" maxLength={100} />
          <span id={`${fid("platform")}-hint`} className={s.fieldHint}>
            e.g. ERP, CRM, procurement
          </span>
          {error("platform")}
        </div>
      </div>
      <div className={s.fGrp}>
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
      <div className={s.fGrp}>
        {label("message")}
        <textarea {...fieldProps("message", true)} required maxLength={MESSAGE_MAX} />
        <div className={s.charRow}>
          <span id={`${fid("message")}-hint`}>A sentence or two is enough.</span>
          <span aria-hidden="true">
            {data.message.length}/{MESSAGE_MAX}
          </span>
        </div>
        <p aria-live="polite" className="sr-only">
          {nearLimit ? `${data.message.length} of ${MESSAGE_MAX} characters used.` : ""}
        </p>
        {error("message")}
      </div>

      {/* Honeypot, hidden from people and assistive tech */}
      <div aria-hidden="true" className={s.honeypot}>
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {TURNSTILE_SITE_KEY && <Turnstile resetKey={captchaReset} onToken={(t) => (captcha.current = t)} />}

      <button type="submit" className={s.btnSend} disabled={sending}>
        {sending ? (
          <>
            <LoaderCircle aria-hidden="true" size={18} className="animate-spin motion-reduce:animate-none" />
            Sending…
          </>
        ) : (
          "Send message"
        )}
      </button>
      <p className={s.privacyNote}>
        By sending this form you agree to our <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </form>
  );
}
