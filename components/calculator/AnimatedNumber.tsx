"use client";

import { animate, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { numHTML } from "@/components/ui/Num";

interface Props {
  value: number;
  format: (n: number) => string;
  className?: string;
}

/**
 * Tweens between values as an input changes. The DOM is written directly so
 * a drag does not re-render the tree on every frame. Server render and first
 * paint show the exact final figure.
 */
export function AnimatedNumber({ value, format, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useRef(value);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce || shown.current === value) {
      shown.current = value;
      el.innerHTML = numHTML(format(value));
      return;
    }
    const controls = animate(shown.current, value, {
      duration: 0.28,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (v) => {
        shown.current = v;
        el.innerHTML = numHTML(format(v));
      },
      onComplete: () => {
        el.innerHTML = numHTML(format(value));
      },
    });
    return () => controls.stop();
  }, [value, format, reduce]);

  // Rendered once; afterwards the effect owns this node's contents, so React
  // never reconciles children that the animation has replaced.
  const [initial] = useState(() => ({ __html: numHTML(format(value)) }));

  return <span ref={ref} className={`tnum ${className}`} dangerouslySetInnerHTML={initial} />;
}
