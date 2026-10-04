/** Fermor mark (from fermor.in/fermor-mark-2026.svg), always on an ink tile. */
export function FermorMark({ size = 28 }: { size?: number }) {
  return (
    <span
      aria-hidden="true"
      className="inline-grid shrink-0 place-items-center rounded-[5px] bg-ink"
      style={{ width: size, height: size }}
    >
      <svg viewBox="-1.04 -0.79 2.08 1.58" width={size * 0.66} height={size * 0.5} fill="#75FB90">
        <path d="M0.9526 -0.7447 L0.7342 -0.4684 L0.1684 -0.4684 L-0.2895 0.1132 L-1 0.1132 L-0.7868 -0.1579 L-0.4342 -0.1579 L0.0289 -0.7447 Z" />
        <path d="M-0.9526 0.7447 L-0.7342 0.4684 L-0.1684 0.4684 L0.2895 -0.1132 L1 -0.1132 L0.7868 0.1579 L0.4342 0.1579 L-0.0289 0.7447 Z" />
      </svg>
    </span>
  );
}

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2 text-[1.1875rem] font-bold tracking-[-0.02em]">
      <FermorMark />
      Fermor
    </span>
  );
}
