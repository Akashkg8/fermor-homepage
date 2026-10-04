"use client";

import * as Dialog from "@radix-ui/react-dialog";
import type { RefObject } from "react";
import { ComingBadge } from "@/components/ui/ComingBadge";
import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS } from "./navLinks";

/** The phone menu sheet. Loaded on first tap, so Radix Dialog is not in the first-paint bundle. */
export default function MobileMenu({
  open,
  onOpenChange,
  returnFocusTo,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The button that opened the sheet; focus goes back to it on close. */
  returnFocusTo: RefObject<HTMLButtonElement | null>;
}) {
  const close = () => onOpenChange(false);
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-ink/30 fixed inset-0 z-50" />
        <Dialog.Content
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            returnFocusTo.current?.focus();
          }}
          className="border-rule bg-paper fixed inset-x-0 top-0 z-50 rounded-b-[var(--radius-container)] border-b px-4 pt-3 pb-6 shadow-lg focus:outline-none"
        >
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
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={close}
                  className="flex min-h-12 items-center justify-between gap-3 text-lg font-medium"
                >
                  {l.label}
                  {l.badge ? <ComingBadge className="text-graphite" /> : null}
                </a>
              </li>
            ))}
          </ul>
          <a href="#app" onClick={close} className="btn btn-primary mt-4 w-full">
            Get my health check
          </a>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
