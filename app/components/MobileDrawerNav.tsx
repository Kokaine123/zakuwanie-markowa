"use client";

import { useEffect, useId, useRef, type RefObject } from "react";
import ZakuwanieMarkowaLogo from "./ZakuwanieMarkowaLogo";

type NavigationItem = {
  label: string;
  href: string;
};

type NavigationToggleTone = "light" | "dark";

type MobileDrawerNavProps = {
  items: NavigationItem[];
  activeHref: string;
  onActiveHrefChange: (href: string) => void;
  toggleTone: NavigationToggleTone;
  toggleButtonRef?: RefObject<HTMLButtonElement | null>;
  phoneHref: string;
  phoneDisplay: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export default function MobileDrawerNav({
  items,
  activeHref,
  onActiveHrefChange,
  toggleTone,
  toggleButtonRef,
  phoneHref,
  phoneDisplay,
  isOpen,
  onOpenChange,
}: MobileDrawerNavProps) {
  const drawerId = useId();
  const pendingHrefRef = useRef<string | null>(null);

  const closeDrawer = () => {
    onOpenChange(false);
  };

  const toggleDrawer = () => {
    onOpenChange(!isOpen);
  };

  const navigateTo = (href: string) => {
    onActiveHrefChange(href);
    pendingHrefRef.current = href;
    onOpenChange(false);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const root = document.documentElement;
    const { body } = document;

    root.classList.add("drawer-open");
    body.classList.add("drawer-open");

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      root.classList.remove("drawer-open");
      body.classList.remove("drawer-open");

      const pendingHref = pendingHrefRef.current;
      pendingHrefRef.current = null;

      if (!pendingHref) {
        return;
      }

      const target = document.querySelector<HTMLElement>(pendingHref);

      if (!target) {
        return;
      }

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      window.requestAnimationFrame(() => {
        history.replaceState(null, "", pendingHref);
        target.scrollIntoView({
          block: "start",
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      });
    };
  }, [isOpen, onOpenChange]);

  return (
    <>
      <header className="mobile-drawer-header" data-toggle-tone={toggleTone} aria-label="Nagłówek strony">
        <button
          ref={toggleButtonRef}
          type="button"
          className="mobile-drawer-header__toggle"
          aria-controls={drawerId}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Zamknij menu nawigacyjne" : "Otwórz menu nawigacyjne"}
          onClick={toggleDrawer}
        >
          <span className="mobile-drawer-header__bar" aria-hidden="true" />
          <span className="mobile-drawer-header__bar" aria-hidden="true" />
          <span className="mobile-drawer-header__bar" aria-hidden="true" />
        </button>
      </header>

      <div
        id={drawerId}
        className={`mobile-drawer${isOpen ? " mobile-drawer--open" : ""}`}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          className="mobile-drawer__overlay"
          aria-label="Zamknij menu nawigacyjne"
          tabIndex={isOpen ? 0 : -1}
          onClick={closeDrawer}
        />

        <aside
          className="mobile-drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-label="Menu główne"
        >
          <a
            href="#start"
            className="mobile-drawer__logo"
            tabIndex={isOpen ? 0 : -1}
            onClick={(event) => {
              event.preventDefault();
              navigateTo("#start");
            }}
          >
            <ZakuwanieMarkowaLogo variant="light" className="mobile-drawer__logo-image" />
          </a>

          <nav className="mobile-drawer__nav" aria-label="Nawigacja">
            <ul className="mobile-drawer__list">
              {items.map((item) => {
                const isActive = item.href === activeHref;

                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="mobile-drawer__link"
                      aria-current={isActive ? "location" : undefined}
                      tabIndex={isOpen ? 0 : -1}
                      onClick={(event) => {
                        event.preventDefault();
                        navigateTo(item.href);
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <a
            className="mobile-drawer__phone"
            href={phoneHref}
            tabIndex={isOpen ? 0 : -1}
          >
            {phoneDisplay}
          </a>
        </aside>
      </div>
    </>
  );
}
