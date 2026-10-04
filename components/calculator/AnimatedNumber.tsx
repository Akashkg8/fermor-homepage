"use client";

import { useEffect, useRef, useState } from "react";
import { numHTML } from "@/components/ui/Num";

interface Props {
  value: number;
  format: (n: number) => string;
  className?: string;
}

type Motion = typeof import("motion");
let motionPromise: Promise<Motion> | null = null;
// Motion is only needed once someone moves an input, so it stays out of the
// first-paint bundle and loads on the first change.
const loadMotion = () => (motionPromise ??= import("motion"));

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Tweens between values as an input changes. The DOM is written directly so
 * a drag does not re-render the tree on every frame. Server render and first
 * paint show the exact final figure.
 */
export function AnimatedNumber({ value, format, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useRef(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const write = (v: number) => {
      shown.current = v;
      el.innerHTML = numHTML(format(v));
    };
    if (shown.current === value || prefersReducedMotion()) {
      write(value);
      return;
    }

    let cancelled = false;
    let stop: (() => void) | undefined;
    const from = shown.current;
    loadMotion()
      .then(({ animate }) => {
        if (cancelled) return;
        const controls = animate(from, value, {
          duration: 0.28,
          ease: [0.2, 0.7, 0.2, 1],
          onUpdate: write,
          onComplete: () => write(value),
        });
        stop = () => controls.stop();
      })
      .catch(() => write(value));
    return () => {
      cancelled = true;
      stop?.();
    };
  }, [value, format]);

  // Rendered once; afterwards the effect owns this node's contents, so React
  // never reconciles children that the animation has replaced.
  const [initial] = useState(() => ({ __html: numHTML(format(value)) }));

  return <span ref={ref} className={`tnum ${className}`} dangerouslySetInnerHTML={initial} />;
}
