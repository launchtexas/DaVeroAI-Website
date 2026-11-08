"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};
/** False on the server and before hydration, so JS-off visitors get the full, static content. */
export function useHydrated() {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}

/** ARIA tabs keyboard pattern: arrows move and select, Home/End jump. */
export function tabKeys(e: React.KeyboardEvent, count: number, current: number, select: (i: number) => void) {
  let next = -1;
  if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (current + 1) % count;
  else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (current - 1 + count) % count;
  else if (e.key === "Home") next = 0;
  else if (e.key === "End") next = count - 1;
  if (next < 0) return;
  e.preventDefault();
  select(next);
  const list = (e.currentTarget as HTMLElement).closest('[role="tablist"]');
  list?.querySelectorAll<HTMLElement>('[role="tab"]')[next]?.focus();
}
