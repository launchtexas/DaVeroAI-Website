U=http://127.0.0.1:3123
MSG='"message":"We need the monthly close reconciliation finished."'
echo "== headers"; curl -sI $U/ | grep -iE "content-security|strict-transport|x-frame|referrer|permissions|x-content-type|x-powered|cross-origin"
echo "== routes"; for p in / /about /agentic-ai /approach /contact /governance /industries /insights /privacy /services /terms /nope /manifest.webmanifest /icon.svg; do printf "%s %s\n" "$(curl -s -o /dev/null -w '%{http_code}' $U$p)" $p; done
echo "== 1 CRLF"; curl -s -X POST $U/api/contact -H 'content-type: application/json' -H 'x-forwarded-for: 10.1.0.1' -d "{\"name\":\"Eve\\r\\nBcc: x@evil.example\",\"email\":\"a@b.co\",\"company\":\"Acme\",$MSG}"; echo
echo "== 2 list"; curl -s -X POST $U/api/contact -H 'content-type: application/json' -H 'x-forwarded-for: 10.1.0.2' -d "{\"name\":\"Eve\",\"email\":\"a,victim@evil.example\",\"company\":\"Acme\",$MSG}"; echo
echo "== 3a text/plain"; curl -s -w ' %{http_code}' -X POST $U/api/contact -H 'content-type: text/plain' -H 'x-forwarded-for: 10.1.0.3' -d "{\"name\":\"Eve\",\"email\":\"a@b.co\",\"company\":\"Acme\",$MSG}"; echo
echo "== 3b cross-site"; curl -s -w ' %{http_code}' -X POST $U/api/contact -H 'content-type: application/json' -H 'sec-fetch-site: cross-site' -H 'x-forwarded-for: 10.1.0.3' -d "{\"name\":\"Eve\",\"email\":\"a@b.co\",\"company\":\"Acme\",$MSG}"; echo
echo "== 4 chunked"; head -c 2000000 /dev/zero | tr '\0' 'a' | curl -s -X POST $U/api/contact -H 'content-type: application/json' -H 'transfer-encoding: chunked' -H 'x-forwarded-for: 10.1.0.4' --data-binary @- -w ' %{http_code}'; echo
echo "== 5 valid same-origin"; curl -s -w ' %{http_code}' -X POST $U/api/contact -H 'content-type: application/json' -H 'sec-fetch-site: same-origin' -H 'x-forwarded-for: 10.1.0.5' -d "{\"name\":\"Eve Smith\",\"email\":\"eve@acme.co\",\"company\":\"Acme\",$MSG}"; echo
echo "== 6 multiline message ok"; curl -s -w ' %{http_code}' -X POST $U/api/contact -H 'content-type: application/json' -H 'x-forwarded-for: 10.1.0.6' -d "{\"name\":\"Eve Smith\",\"email\":\"eve@acme.co\",\"company\":\"Acme\",\"message\":\"Line one of the request\\nline two with detail\"}"; echo
echo "== 7 invalid"; curl -s -w ' %{http_code}' -X POST $U/api/contact -H 'content-type: application/json' -H 'x-forwarded-for: 10.1.0.7' -d '{}'; echo
