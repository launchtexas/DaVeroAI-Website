import fs from "node:fs";
const real = globalThis.fetch;
globalThis.fetch = async (url, init) => {
  if (String(url).startsWith("https://api.resend.com")) {
    fs.appendFileSync(process.env.MOCK_LOG, init.body + "\n");
    return new Response('{"id":"dummy"}', { status: 200 });
  }
  return real(url, init);
};
