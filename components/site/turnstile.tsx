"use client";

import { useEffect, useRef } from "react";

// Cloudflare Turnstile, loaded with a plain script tag (no npm package). Renders only when
// NEXT_PUBLIC_TURNSTILE_SITE_KEY is set. "interaction-only" keeps it invisible unless Cloudflare needs a click;
// the challenge it then shows is Cloudflare's own keyboard-accessible iframe.
export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let loader: Promise<TurnstileApi> | null = null;
function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  loader ??= new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("turnstile")));
    s.onerror = () => {
      loader = null;
      reject(new Error("turnstile"));
    };
    document.head.appendChild(s);
  });
  return loader;
}

// Calls onToken with each new token ("" when it expires or fails). Pass resetKey changes to get a fresh token.
export function Turnstile({ onToken, resetKey }: { onToken: (token: string) => void; resetKey: number }) {
  const el = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const cb = useRef(onToken);
  useEffect(() => {
    cb.current = onToken;
  });

  useEffect(() => {
    let cancelled = false;
    loadTurnstile()
      .then((ts) => {
        if (cancelled || !el.current) return;
        widget.current = ts.render(el.current, {
          sitekey: TURNSTILE_SITE_KEY,
          appearance: "interaction-only",
          "refresh-expired": "auto",
          callback: (t: string) => cb.current(t),
          "expired-callback": () => cb.current(""),
          "error-callback": () => cb.current(""),
        });
      })
      .catch(() => cb.current(""));
    return () => {
      cancelled = true;
      if (widget.current) window.turnstile?.remove(widget.current);
      widget.current = null;
    };
  }, []);

  useEffect(() => {
    if (resetKey && widget.current) {
      cb.current("");
      window.turnstile?.reset(widget.current);
    }
  }, [resetKey]);

  return <div ref={el} />;
}
