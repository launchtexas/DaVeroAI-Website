# Legal pages: review notes

**Status:** professional draft for lawyer review. This is not legal advice. Effective date on the pages: 8 November 2026.

Pages: `/privacy`, `/terms`, `/cookies`, `/security`, `/legal`, plus `public/.well-known/security.txt`.
Shared layout: `components/site/legal-doc.tsx`. Placeholders render with `components/site/tbd.tsx` (dashed orange box) and
carry `data-tbd`, so `grep -rn "<Tbd>" app` finds every one.

## Placeholders to fill

| Placeholder | Where |
|---|---|
| ~~`[Legal entity name]`~~ filled: DaVero AI LLC | Privacy §1 and §13, Terms §1, Legal notice §1 and §7 |
| ~~`[Registered address]`~~ filled: 2100 N Greenville Ave, Ste 217, Richardson, TX 75082 | Privacy §1 and §13, Terms §1, Legal notice §1 and §7 |
| ~~`[Governing law]`~~ filled: Texas, Collin County courts | Terms §10 (governing law and courts) |
| ~~`[Retention period]`~~ filled: indefinite unless deletion requested | Privacy §6 (how long enquiries and correspondence are kept) |

Also unknown and therefore not stated on the pages: company registration number, VAT/tax number, a named data protection
contact or DPO. The pages route every privacy, legal and security request to `ask@daveroai.com`.

## Points for a lawyer to confirm

### Privacy Policy
1. **Applicable law and thresholds.** The policy is written to GDPR, UK GDPR and CCPA/CPRA standards. Confirm which actually
   apply: the CCPA only binds businesses above its thresholds, and GDPR applies through targeting or establishment.
2. **EU/UK representative (Art. 27).** If DaVero AI has no EU or UK establishment but GDPR applies, a representative may be
   required and must be named in the policy.
3. **Legal bases.** Legitimate interests for enquiries, security and hosting; pre-contract steps for enquiries. Confirm, and
   decide whether a written legitimate interests assessment is needed.
4. **Processors.** Taken from the code: Vercel (hosting), Resend (email delivery), Cloudflare Turnstile and Upstash Redis
   (both only when their environment variables are set). Confirm Resend's contracting entity (stated as Plus Five Five, Inc.),
   that a data processing agreement is in place with each, and which of Turnstile/Upstash are switched on in production.
   **The mailbox provider for ask@daveroai.com is not in the code**; the policy names it generically ("our email service
   provider"). Name it once known.
5. **International transfers.** The policy lists the safeguards generically (adequacy incl. Data Privacy Framework where the
   recipient participates; SCCs with the UK Addendum). Confirm the mechanism each provider actually uses.
6. **Retention.** Fill `[Retention period]`. Hosting log retention depends on the Vercel plan and settings; the policy defers
   to "our hosting provider's log retention settings". Confirm or state a period.
7. **Automated checks.** The spam controls (hidden field, time check, IP limits 5/10 min and 20/day with Upstash, content
   rules, 10-minute repeat check, Turnstile) silently drop some messages. The policy treats this as having no legal or
   similarly significant effect (GDPR Art. 22). Confirm.
8. **Response times.** One month (GDPR/UK GDPR) and 45 days (CCPA) are stated as the statutory periods. Confirm, and add
   appeal wording if other US state laws apply.
9. **Children.** Stated age: under 16. Confirm.

### Terms of Use
10. **Liability cap** of US$100 and the exclusions; check enforceability in the chosen governing law and for consumers.
11. **Governing law and courts** placeholder; the consumer carve-out (home-country mandatory law) is already included.
12. **No-AI-training clause** in acceptable use (no scraping or model training without permission). Confirm wanted.
13. **Indemnity** (§8) is limited to breaches of acceptable use. Confirm.

### Cookie Notice
14. **No banner.** The code sets no cookies, localStorage or sessionStorage and loads no analytics or advertising. The only
    third-party script is Cloudflare Turnstile on `/contact`, when enabled. The notice treats Turnstile as strictly necessary
    security (consent-exempt under ePrivacy/PECR). Confirm this position, and confirm from Cloudflare's Turnstile privacy
    addendum exactly what Turnstile stores in the browser; the notice says it "may read or store information".
15. Vercel preview deployments with Deployment Protection can set Vercel's own cookie; production does not. Out of scope
    unless previews are public.

### Security page and security.txt
16. **Safe harbour** wording (authorisation, no legal action) creates a commitment. Confirm wording and scope.
17. **Response targets.** No acknowledgement or fix times are promised. Add them (for example, acknowledge within 3 business
    days) if the team will commit to them.
18. **security.txt `Contact`** is `mailto:ask@daveroai.com` (the only published address). Consider a dedicated
    `security@daveroai.com`. `Expires` is 2027-11-08: renew before then.
19. **Protections summary** is taken from `docs/security/REPORT.md` and `next.config.ts` and claims no certification.
    The Vercel Firewall rate-limit rule (owner action in REPORT.md) is **not** claimed; mention it once applied.
20. **Governance practices** come from `docs/governance.md` and are framed as "designed to align with" NIST AI RMF,
    ISO/IEC 42001 and SOC 2 practices, with an explicit no-certification statement. Confirm these practices are followed
    in delivery.

### Legal Notice
21. **Trademarks.** "DaVero AI and the DaVero AI logo are trademarks of DaVero AI" (unregistered, so no ®). Confirm the
    owning entity and whether any registration exists.
22. **Third-party names** listed are those on the site at commit time: Rillet, Tabs, Maxio, Campfire, Oracle NetSuite,
    Sequoia Capital, Gartner, Reuters, Controllers Council, insightsoftware, Wakefield Research, NIST, ISO, AICPA & CIMA.
    Update the list when site copy changes. Confirm nominative use of platform names is acceptable without permission.
23. **Company disclosures.** Some jurisdictions require registration number, registered office and similar details on the
    website (for example the UK Companies Act or Germany's Impressum). Add once the entity and jurisdiction are known.

## Facts checked against the code
- Contact form fields: name, work email, company (required); platform, domain (optional); message (required).
  `lib/contact-rules.ts`.
- IP use: in-memory limit 5 per 10 min per instance; Upstash 5 per 10 min and 20 per day; duplicate fingerprint is a SHA-256
  hash of email and message, kept 10 minutes. `app/api/contact/route.ts`, `lib/contact-shield.ts`.
- Turnstile sends the token and the IP (`remoteip`) to Cloudflare. `lib/contact-shield.ts`.
- No database; the submission goes to Resend as a plain-text email to `CONTACT_TO` (default ask@daveroai.com).
- No cookies, web storage, analytics or advertising anywhere in `app`, `components` or `lib`.
- There is no sitemap in the app, so no sitemap entries were added.


## Client decisions (2026-11-08)
- Entity DaVero AI LLC; address 2100 N Greenville Ave, Ste 217, Richardson, TX 75082; Texas law, Collin County courts; inbox on Microsoft 365.
- Enquiries kept indefinitely unless the person asks for deletion. **Lawyer to confirm:** GDPR/UK GDPR storage limitation expects a defined period or criteria; indefinite retention is a risk for EU/UK enquirers. Also confirm the Collin County venue (75082 is in Collin County).
