"use client";

import { createContext, useContext, type ReactNode } from "react";
import { Num } from "@/components/ui/Num";

/** True once the user has changed an input; nothing animates on load. */
export const InteractedContext = createContext(false);

interface Props {
  /** Changing the value re-keys the mark, which replays it. */
  value: string;
  /** Position in the derivation — later terms mark a beat later. */
  order?: number;
  strong?: boolean;
  children?: ReactNode;
}

/**
 * One substituted number in the rough work. When it changes, an ink
 * underline draws under it in derivation order (P, i, n, then the result),
 * timed alongside the Motion tween of the result figure. It is a CSS keyframe
 * so the calculator doesn't ship Motion's component bundle for one line;
 * `prefers-reduced-motion` removes it (see .term-mark in globals.css).
 */
export function Term({ value, order = 0, strong = false, children }: Props) {
  const interacted = useContext(InteractedContext);
  return (
    <span className={`relative inline-block whitespace-nowrap ${strong ? "font-bold" : "font-semibold"}`}>
      {children ?? <Num>{value}</Num>}
      {interacted && (
        <span key={value} aria-hidden="true" className="term-mark" style={{ animationDelay: `${order * 60}ms` }} />
      )}
    </span>
  );
}
