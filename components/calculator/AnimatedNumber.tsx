"use client";

import { animate, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

interface Props {
  value: number;
  format: (n: number) => string;
  className?: string;
}

/**
 * Tweens between values as an input changes. The DOM text is written
 * directly so a drag does not re-render the tree on every frame. Server and
 * first paint show the exact final figure.
 */
export function AnimatedNumber({ value, format, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useRef(value);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      shown.current = value;
      el.textContent = format(value);
      return;
    }
    const controls = animate(shown.current, value, {
      duration: 0.28,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (v) => {
        shown.current = v;
        el.textContent = format(v);
      },
    });
    return () => controls.stop();
  }, [value, format, reduce]);

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
