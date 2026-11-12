"use client";

import { useEffect, useState } from "react";

// Legal page index: sticky beside the text on desktop, a collapsed toggle above it on mobile.
// The section under the sticky header is marked aria-current and highlighted.
export function LegalToc({ items }: { items: { id: string; title: string }[] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = (document.querySelector(".top")?.getBoundingClientRect().bottom ?? 0) + 96;
      let current = items[0]?.id;
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // at the very bottom the last short sections can never reach the line
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) current = items[items.length - 1]?.id;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [items]);

  return (
    <nav aria-labelledby="toc-title" className="legal-toc">
      <h2 id="toc-title" className="legal-toc-title">
        Contents
      </h2>
      <button aria-controls="toc-list" aria-expanded={open} className="legal-toc-toggle" onClick={() => setOpen(!open)} type="button">
        Contents
        <svg aria-hidden="true" fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="16">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <ol className="legal-toc-list" data-open={open || undefined} id="toc-list">
        {items.map((s, i) => (
          <li key={s.id}>
            <a aria-current={active === s.id ? "location" : undefined} href={`#${s.id}`} onClick={() => setOpen(false)}>
              <span className="n">{i + 1}.</span> {s.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
