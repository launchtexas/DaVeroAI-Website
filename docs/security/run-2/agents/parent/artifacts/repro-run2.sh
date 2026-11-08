#!/bin/sh
# Run-2 local checks against `next start` on $U (default 127.0.0.1:3124). Needs FORM_SECRET=test-secret
# and the mock-resend.mjs fetch mock when RESEND_API_KEY is a dummy value. Sends no real email.
U=${U:-http://127.0.0.1:3124}
J='content-type: application/json'
BODY='"name":"Eve Smith","email":"eve@acme.co","company":"Acme","message":"We need the monthly close reconciliation finished'
tok() { curl -s $U/api/contact | sed 's/.*"token":"\([^"]*\)".*/\1/'; }
echo "== headers /"; curl -sI $U/ | grep -iE "content-security|strict-transport|x-frame|referrer-policy|permissions|x-content-type|x-powered|cross-origin"
echo "== GET /api/contact headers"; curl -sI $U/api/contact | grep -iE "cache-control|content-type"
echo "== security.txt"; curl -s -o /dev/null -w '%{http_code} %{content_type}\n' $U/.well-known/security.txt
echo "== routes"; for p in / /about /agentic-ai /approach /contact /cookies /governance /industries /insights /legal /privacy /security /services /terms /nope; do printf "%s %s\n" "$(curl -s -o /dev/null -w '%{http_code}' $U$p)" $p; done
echo "== run-1 fixes: text/plain, cross-site, chunked 2MB"
curl -s -w ' %{http_code}\n' -X POST $U/api/contact -H 'content-type: text/plain' -d '{}'
curl -s -w ' %{http_code}\n' -X POST $U/api/contact -H "$J" -H 'sec-fetch-site: cross-site' -d '{}'
head -c 2000000 /dev/zero | tr '\0' 'a' | curl -s -X POST $U/api/contact -H "$J" -H 'transfer-encoding: chunked' --data-binary @- -w ' %{http_code}\n'
echo "== forged token (bad sig), unsigned token, too-fast token -> silent 200"
NOW=$(($(date +%s)*1000-10000))
curl -s -w ' %{http_code}\n' -X POST $U/api/contact -H "$J" -H 'x-forwarded-for: 10.2.0.1' -d "{$BODY a.\",\"t\":\"$NOW.AAAA\"}"
curl -s -w ' %{http_code}\n' -X POST $U/api/contact -H "$J" -H 'x-forwarded-for: 10.2.0.1' -d "{$BODY b.\",\"t\":\"$NOW\"}"
T=$(tok); curl -s -w ' %{http_code}\n' -X POST $U/api/contact -H "$J" -H 'x-forwarded-for: 10.2.0.1' -d "{$BODY c.\",\"t\":\"$T\"}"
echo "== field error 400 (link in name)"; sleep 4
curl -s -w ' %{http_code}\n' -X POST $U/api/contact -H "$J" -H 'x-forwarded-for: 10.2.0.2' -d "{\"name\":\"http://x.example\",\"email\":\"eve@acme.co\",\"company\":\"Acme\",\"message\":\"We need the monthly close reconciliation finished.\",\"t\":\"$T\"}"
echo "== IPv4: 6 sends from one address (6th must be 429)"
for i in 1 2 3 4 5 6; do curl -s -o /dev/null -w '%{http_code} ' -X POST $U/api/contact -H "$J" -H 'x-forwarded-for: 10.3.0.1' -d "{$BODY v4 $i.\",\"t\":\"$T\"}"; done; echo
echo "== IPv6: 6 sends, each from a different address in one /64 (6th must be 429 after the fix)"
for i in 1 2 3 4 5 6; do curl -s -o /dev/null -w '%{http_code} ' -X POST $U/api/contact -H "$J" -H "x-forwarded-for: 2001:db8:1:2::$i" -d "{$BODY v6 $i.\",\"t\":\"$T\"}"; done; echo
echo "== IPv6: other /64 still allowed"
curl -s -o /dev/null -w '%{http_code}\n' -X POST $U/api/contact -H "$J" -H "x-forwarded-for: 2001:db8:1:3::1" -d "{$BODY other.\",\"t\":\"$T\"}"
echo "== duplicate (same email+message) -> silent 200, no second email"
curl -s -o /dev/null -w '%{http_code} ' -X POST $U/api/contact -H "$J" -H 'x-forwarded-for: 10.4.0.1' -d "{$BODY dup.\",\"t\":\"$T\"}"
curl -s -o /dev/null -w '%{http_code}\n' -X POST $U/api/contact -H "$J" -H 'x-forwarded-for: 10.4.0.2' -d "{$BODY dup.\",\"t\":\"$T\"}"
