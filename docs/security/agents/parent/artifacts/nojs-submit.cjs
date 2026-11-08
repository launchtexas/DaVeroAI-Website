/* eslint-disable */
// Local check: submit /contact with JavaScript disabled (needs playwright-core and Chrome; run against next start on :3123).
const { chromium } = require("playwright-core");
(async () => {
  const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
  const p = await (await b.newContext({ javaScriptEnabled: false })).newPage();
  await p.goto("http://127.0.0.1:3123/contact", { waitUntil: "load" });
  const names = await p.$$eval("form input, form textarea", (els) => els.map((e) => e.name));
  await p.fill('input[name="name"]', "Eve Smith"); await p.fill('input[name="email"]', "eve@acme.co");
  const [resp] = await Promise.all([p.waitForNavigation().catch(() => null), p.locator('form button[type="submit"]').press("Enter")]);
  console.log(JSON.stringify({ names, url: p.url(), status: resp && resp.status(), method: resp && resp.request().method() }));
  await b.close();
})();
