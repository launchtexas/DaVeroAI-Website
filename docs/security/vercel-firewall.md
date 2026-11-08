# Vercel Firewall rule for the contact form

The app limits `/api/contact` itself (in memory per instance, plus Upstash across instances when configured).
This Vercel Firewall rule is the edge layer: it stops floods before they reach a function and is not billed when it blocks.
The owner applies it after deploy; nothing in the repo does it.

## The rule

| Setting | Value |
|---|---|
| Name | `Rate limit contact form` |
| If | Request Method **equals** `POST` **and** Request Path **equals** `/api/contact` |
| Then | Rate Limit, fixed window, **10 requests per 600 seconds**, keyed by **IP** |
| When exceeded | `429` (rate limit) |

10 per 10 minutes is twice the app limit (5 per 10 min), so real users only ever see the app's own error handling while
floods stop at the edge. `GET /api/contact` (the form token) is not matched.

## CLI (project linked with `vercel link`)

Stage in log mode first, as Vercel recommends:

```bash
vercel firewall rules add "Rate limit contact form" \
  --condition '{"type":"method","op":"eq","value":"POST"}' \
  --condition '{"type":"path","op":"eq","value":"/api/contact"}' \
  --action rate_limit \
  --rate-limit-window 600 \
  --rate-limit-requests 10 \
  --rate-limit-keys ip \
  --rate-limit-algo fixed_window \
  --rate-limit-action log \
  --yes
vercel firewall diff
vercel firewall publish --yes
```

After a few days of reviewing hits in Firewall → Traffic (filter by the rule), switch it to enforce:

```bash
vercel firewall rules edit "Rate limit contact form" --rate-limit-action rate_limit --yes
vercel firewall publish --yes
```

## Dashboard

Project → Firewall → Configure → New Rule: add the two conditions above (both must match), action **Rate Limit**,
algorithm Fixed Window, window 600 s, limit 10, key IP, follow-up action Too Many Requests (429). Save, then Review Changes → Publish.

Notes: counters are per Vercel region, so the global total can be a few times higher. Optionally also enable the
Bot Protection managed ruleset in Challenge mode.
