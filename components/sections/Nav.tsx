"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { useState } from "react";
import { ComingBadge } from "@/components/ui/ComingBadge";
import { Logo } from "@/components/ui/Logo";

const LINKS = [
  { href: "#calculators", label: "Calculators" },
  { href: "#analysis", label: "Analysis" },
  { href: "#app", label: "Ask", badge: true },
  { href: "#how-fermor-stays-free", label: "About" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-chalk/95 backdrop-blur-[2px] supports-[backdrop-filter]:bg-chalk/90">
      <a
        href="#main"
        className="sr-only-focusable absolute top-2 left-2 z-50 rounded-[var(--radius-action)] bg-ink px-3 py-2 text-paper"
      >
        Skip to content
      </a>
      <nav aria-label="Main" className="wrap flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="Fermor home" className="rounded-[4px]">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="inline-flex min-h-11 items-center gap-2 font-medium hover:text-accent">
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
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger
              className="inline-grid size-11 place-items-center rounded-[var(--radius-control)] border border-rule md:hidden"
              aria-label="Open menu"
            >
              <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true">
                <path d="M0 1h18M0 6h18M0 11h18" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/30" />
              <Dialog.Content className="fixed inset-x-0 top-0 z-50 rounded-b-[var(--radius-container)] border-b border-rule bg-paper px-4 pt-3 pb-6 shadow-lg focus:outline-none">
                <div className="flex h-10 items-center justify-between">
                  <Dialog.Title className="sr-only">Menu</Dialog.Title>
                  <Logo />
                  <Dialog.Close
                    className="inline-grid size-11 place-items-center rounded-[var(--radius-control)]"
                    aria-label="Close menu"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </Dialog.Close>
                </div>
                <Dialog.Description className="sr-only">Sections of this page</Dialog.Description>
                <ul className="ruled mt-3">
                  {LINKS.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="flex min-h-12 items-center justify-between gap-3 text-lg font-medium"
                      >
                        {l.label}
                        {l.badge ? <ComingBadge className="text-graphite" /> : null}
                      </a>
                    </li>
                  ))}
                </ul>
                <a href="#app" onClick={() => setOpen(false)} className="btn btn-primary mt-4 w-full">
                  Get my health check
                </a>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </nav>
    </header>
  );
}
