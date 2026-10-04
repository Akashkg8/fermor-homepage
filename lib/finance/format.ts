/** Indian-grouped number and rupee formatting. Never "K" or "M". */

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

const grouped = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

/** ₹1,64,60,996 — rounded to the rupee. */
export function formatINR(value: number): string {
  return inr.format(Math.round(value)).replace(/\s/g, "");
}

/** 1,64,60,996 — no currency symbol. */
export function formatGrouped(value: number): string {
  return grouped.format(Math.round(value));
}

/** Plain decimal with fixed places and Indian grouping, e.g. 0.0071. */
export function formatDecimal(value: number, places: number): string {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: places,
    maximumFractionDigits: places,
  }).format(value);
}

/** Up to `maxPlaces` decimals, trailing zeros dropped: 0.0070833, 1.01. */
export function formatTrimmed(value: number, maxPlaces: number): string {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: maxPlaces }).format(value);
}

/**
 * Short form for tight spaces: ₹1.65 Cr, ₹45.2 L, ₹9,650.
 * Crore keeps two decimals, lakh one; below a lakh, the full figure.
 */
export function formatINRShort(value: number): string {
  const sign = value < 0 ? "−" : "";
  const abs = Math.abs(value);
  if (abs >= 1_00_00_000) {
    return `${sign}₹${formatDecimal(abs / 1_00_00_000, 2)} Cr`;
  }
  if (abs >= 1_00_000) {
    return `${sign}₹${formatDecimal(abs / 1_00_000, abs >= 10_00_000 ? 1 : 2)} L`;
  }
  return `${sign}${formatINR(abs)}`;
}

/** Spoken form for screen readers: "1.65 crore rupees". */
export function formatINRSpoken(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1_00_00_000) return `${formatDecimal(abs / 1_00_00_000, 2)} crore rupees`;
  if (abs >= 1_00_000) return `${formatDecimal(abs / 1_00_000, 2)} lakh rupees`;
  return `${formatGrouped(abs)} rupees`;
}

/**
 * Parse a user-typed number: tolerates ₹, commas, spaces and a trailing %.
 * Returns null for anything that is not a finite number.
 */
export function parseNumericInput(raw: string): number | null {
  const cleaned = raw.replace(/[₹,\s%]/g, "");
  if (cleaned === "" || !/^-?\d*\.?\d*$/.test(cleaned) || cleaned === "." || cleaned === "-") {
    return null;
  }
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Snap to the nearest step from `min`, without float noise. */
export function snapToStep(value: number, min: number, step: number): number {
  const snapped = Math.round((value - min) / step) * step + min;
  const decimals = (step.toString().split(".")[1] ?? "").length;
  return Number(snapped.toFixed(decimals));
}
