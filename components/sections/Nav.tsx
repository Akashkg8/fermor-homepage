"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef, useState } from "react";
import { ComingBadge } from "@/components/ui/ComingBadge";
import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS } from "./navLinks";

const MobileMenu = dynamic(() => import("./MobileMenu"), { ssr: false });

export function Nav() {
  const [open, setOpen] = useState(false);
  // Mount the sheet only after the first tap; keep it mounted so it can animate closed.
  const [wanted, setWanted] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  return (
    <header className="border-rule bg-chalk/95 supports-[backdrop-filter]:bg-chalk/90 sticky top-0 z-40 border-b backdrop-blur-[2px]">
      <a
        href="#main"
        className="sr-only-focusable bg-ink text-paper absolute top-2 left-2 z-50 rounded-[var(--radius-action)] px-3 py-2"
      >
        Skip to content
      </a>
      <nav aria-label="Main" className="wrap flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="Fermor home" className="rounded-[4px]">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-accent inline-flex min-h-11 items-center gap-2 font-medium">
                {l.label}
                {l.badge ? <ComingBadge className="text-graphite" /> : null}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#app" className="btn btn-primary min-h-11 px-3.5 text-[0.9375rem] sm:px-4">
            Get early access
          </a>
          <button
            ref={menuButton}
            type="button"
            className="border-rule inline-grid size-11 place-items-center rounded-[var(--radius-control)] border md:hidden"
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={open}
            onClick={() => {
              setWanted(true);
              setOpen(true);
            }}
          >
            <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true">
              <path d="M0 1h18M0 6h18M0 11h18" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
          {wanted && <MobileMenu open={open} onOpenChange={setOpen} returnFocusTo={menuButton} />}
        </div>
      </nav>
    </header>
  );
}
