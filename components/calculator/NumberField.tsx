"use client";

import { useId, useState } from "react";
import { clamp, formatGrouped, formatTrimmed, parseNumericInput, snapToStep } from "@/lib/finance/format";

interface Props {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  /** Shown inside the input, before or after the figure. */
  prefix?: string;
  suffix?: string;
  /** Spoken value for the slider, e.g. "25,000 rupees a month". */
  valueText: (value: number) => string;
  /** Slider steps differ from typing precision (e.g. 8.5% vs 8.55%). */
  decimals?: number;
}

function display(value: number, decimals: number): string {
  return decimals > 0 ? formatTrimmed(value, decimals) : formatGrouped(value);
}

/**
 * A slider paired with a typed numeric input. Both drive one value; typing
 * clamps into range, and invalid text is flagged rather than silently lost.
 */
export function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
  suffix,
  valueText,
  decimals = 0,
}: Props) {
  const id = useId();
  const inputId = `${id}-input`;
  const errorId = `${id}-error`;
  const [draft, setDraft] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const text = draft ?? display(value, decimals);
  const fill = ((clamp(value, min, max) - min) / (max - min)) * 100;

  function commitTyped(raw: string) {
    const parsed = parseNumericInput(raw);
    if (parsed === null) {
      setError(true);
      return;
    }
    setError(false);
    onChange(clamp(Number(parsed.toFixed(decimals)), min, max));
  }

  return (
    <div className="grid gap-0.5">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={inputId} className="text-[0.9375rem] font-medium">
          {label}
        </label>
        <div className="relative w-[9.5rem] shrink-0">
          {prefix ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-graphite"
            >
              {prefix}
            </span>
          ) : null}
          <input
            id={inputId}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            spellCheck={false}
            className={`num-input ${prefix ? "pl-6" : ""}`}
            style={suffix ? { paddingRight: `calc(${suffix.length}ch + 1rem)` } : undefined}
            value={text}
            aria-invalid={error || undefined}
            aria-describedby={error ? errorId : undefined}
            onFocus={(e) => {
              setDraft(display(value, decimals));
              e.currentTarget.select();
            }}
            onChange={(e) => {
              setDraft(e.target.value);
              commitTyped(e.target.value);
            }}
            onBlur={() => {
              setDraft(null);
              setError(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.currentTarget.blur();
            }}
          />
          {suffix ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-note text-graphite"
            >
              {suffix}
            </span>
          ) : null}
        </div>
      </div>
      <input
        type="range"
        className="range"
        min={min}
        max={max}
        step={step}
        value={clamp(value, min, max)}
        aria-label={label}
        aria-valuetext={valueText(value)}
        style={{ "--fill": `${fill}%` } as React.CSSProperties}
        onChange={(e) => {
          setError(false);
          onChange(snapToStep(Number(e.target.value), min, step));
        }}
      />
      <p id={errorId} role="alert" className={`-mt-1 text-note text-loss ${error ? "" : "hidden"}`}>
        Enter a number between {display(min, decimals)} and {display(max, decimals)}.
      </p>
    </div>
  );
}
