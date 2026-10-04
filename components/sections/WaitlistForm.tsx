"use client";

import { useId, useState } from "react";

type State =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "done"; stored: boolean }
  | { kind: "error"; message: string };

export function WaitlistForm({ connected }: { connected: boolean }) {
  const id = useId();
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(data.get("email") ?? ""),
          consent: data.get("consent") === "on",
          company: String(data.get("company") ?? ""),
        }),
      });
      const json = (await res.json()) as { ok: boolean; stored?: boolean; error?: string };
      if (!json.ok) {
        setState({ kind: "error", message: json.error ?? "Something went wrong. Please try again." });
        return;
      }
      form.reset();
      setState({ kind: "done", stored: Boolean(json.stored) });
    } catch {
      setState({ kind: "error", message: "You seem to be offline. Check your connection and try again." });
    }
  }

  if (state.kind === "done") {
    return (
      <div role="status" className="rounded-[var(--radius-container)] border border-on-ink-muted/40 p-5">
        <p className="text-lead font-semibold">You&apos;re on the list.</p>
        <p className="mt-1 text-on-ink-muted">
          {state.stored
            ? "We'll email you once when the app opens, with your health check link. Nothing else."
            : "Your address checked out. This concept build doesn't store it, so you won't be emailed."}
        </p>
      </div>
    );
  }

  const emailId = `${id}-email`;
  const errId = `${id}-err`;

  return (
    <form onSubmit={onSubmit} noValidate={false} className="grid gap-3" aria-describedby={`${id}-consent-text`}>
      <label htmlFor={emailId} className="font-semibold">
        Email address
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id={emailId}
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          aria-invalid={state.kind === "error" || undefined}
          aria-describedby={state.kind === "error" ? errId : undefined}
          className="min-h-12 flex-1 rounded-[var(--radius-control)] border border-on-ink-muted/60 bg-ink-soft px-3 text-on-ink placeholder:text-on-ink-muted/80 focus-visible:border-on-ink"
        />
        <button type="submit" className="btn btn-on-ink min-h-12" disabled={state.kind === "sending"}>
          {state.kind === "sending" ? "Adding you…" : "Get my health check"}
        </button>
      </div>
      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="flex items-start gap-3 text-[0.9375rem] text-on-ink-muted">
        <input name="consent" type="checkbox" required className="mt-1 size-5 shrink-0 accent-[var(--color-on-ink)]" />
        <span id={`${id}-consent-text`}>
          Email me when the app opens, with my free health check. Only about the app; unsubscribe in one click; never
          shared or sold.
        </span>
      </label>
      {!connected && (
        <p className="text-note text-on-ink-muted italic">
          Concept build: the address is validated but not stored.
        </p>
      )}
      <p id={errId} role="alert" className="min-h-[1.5em] text-[0.9375rem] text-[#ffb4a8]">
        {state.kind === "error" ? state.message : ""}
      </p>
    </form>
  );
}
