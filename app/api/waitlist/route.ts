import { NextResponse } from "next/server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Waitlist sign-up. Validates the address, then forwards it to the webhook
 * in WAITLIST_WEBHOOK_URL (Formspree, Google Apps Script, a CRM…). Without
 * one configured the address is validated and acknowledged but not kept,
 * and the form says so on the page before anyone submits.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Send JSON with an email field." }, { status: 400 });
  }

  const { email, company, consent } = (body ?? {}) as { email?: unknown; company?: unknown; consent?: unknown };

  // Honeypot: real people never see or fill this field.
  if (typeof company === "string" && company.length > 0) {
    return NextResponse.json({ ok: true, stored: false });
  }

  if (typeof email !== "string" || email.length > 254 || !EMAIL.test(email.trim())) {
    return NextResponse.json({ ok: false, error: "That email address doesn't look right." }, { status: 422 });
  }
  if (consent !== true) {
    return NextResponse.json({ ok: false, error: "Please agree to be emailed about the app." }, { status: 422 });
  }

  const webhook = process.env.WAITLIST_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim().toLowerCase(), source: "homepage", at: new Date().toISOString() }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
    return NextResponse.json({ ok: true, stored: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "We couldn't save that just now. Please try again in a minute." },
      { status: 502 },
    );
  }
}
