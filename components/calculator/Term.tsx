"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { Num } from "@/components/ui/Num";

interface Props {
  /** Changing the value re-keys the span, which replays the mark. */
  value: string;
  /** Position in the derivation — later terms mark a beat later. */
  order?: number;
  strong?: boolean;
  children?: ReactNode;
}

/**
 * One substituted number in the rough work. When it changes, an ink
 * underline draws under it in derivation order (P, i, n, then the result),
 * which is the page's one orchestrated motion.
 */
export function Term({ value, order = 0, strong = false, children }: Props) {
  const reduce = useReducedMotion();
  const content = children ?? <Num>{value}</Num>;
  const cls = `relative inline-block whitespace-nowrap ${strong ? "font-bold" : "font-semibold"}`;

  if (reduce) return <span className={cls}>{content}</span>;

  return (
    <span className={cls}>
      {content}
      <motion.span
        key={value}
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-px h-[2px] origin-left bg-accent"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: [0, 1, 1], opacity: [1, 1, 0] }}
        transition={{ duration: 0.9, delay: order * 0.06, times: [0, 0.35, 1], ease: "easeOut" }}
      />
    </span>
  );
}
