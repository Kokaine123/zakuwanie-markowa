"use client";

import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./components/ScrollReveal";
import ServiceAreaMap from "./components/ServiceAreaMap";
import GalleryCoverflow from "./components/GalleryCoverflow";
import HeroRightSlideshow from "./components/HeroRightSlideshow";
import MachineSection from "./components/MachineSection";
import BenefitsSection from "./components/BenefitsSection";
import FaqSection from "./components/FaqSection";
import ZakuwanieMarkowaLogo from "./components/ZakuwanieMarkowaLogo";
import { ecolinoXWodwormTraki } from "./data/ecolinoXWodwormTraki";
import {
  heroContent,
  siteAddressFull,
  sitePhoneDisplay,
  sitePhoneHref,
} from "./data/siteContent";

const heroRightSlideshowImages = ecolinoXWodwormTraki.filter(
  (image) => image.id !== "wezel-hydrauliczny-maszyna-01",
);

const navigationItems = [
  { label: "Start", href: "#start" },
  { label: "O maszynie", href: "#oferta" },
  { label: "Galeria", href: "#galeria" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "#kontakt" },
  { label: "Mapa", href: "#mapa" },
];

const additionalOffers = [
  {
    title: "Traki taśmowe poziome",
    url: "https://woodworm.com.pl/traki-tasmowe-poziome-woodworm/",
    image: "https://woodworm.com.pl/wp-content/uploads/2026/03/DSC04272-Edytuj-scaled.png",
    alt: "Traki taśmowe poziome WoodWorm",
    cta: "Zobacz traki taśmowe →",
  },
  {
    title: "Ostrzarki do pił",
    url: "https://woodworm.com.pl/ostrzarka-do-pil-tasmowych/",
    image: "https://woodworm.com.pl/wp-content/uploads/2026/04/X-1536-x-1024-px-3.png",
    alt: "Ostrzarki do pił",
    cta: "Zobacz ostrzarki →",
  },
  {
    title: "Stoły odbiorcze",
    url: "https://woodworm.com.pl/stoly-odbiorcze-i-przenosniki/",
    image: "https://woodworm.com.pl/wp-content/uploads/2026/04/X-1536-x-1024-px-4.png",
    alt: "Stoły odbiorcze i przenośniki",
    cta: "Zobacz stoły odbiorcze →",
  },
  {
    title: "Obrzynarki",
    url: "https://woodworm.com.pl/obrzynarka/",
    image: "https://woodworm.com.pl/wp-content/uploads/2026/04/X-1536-x-1024-px-6.png",
    alt: "Obrzynarki woodworm",
    cta: "Zobacz obrzynarki →",
  },
];

const logoCenterHoldDuration = 380;
const logoMoveDuration = 360;
const sectionActivationPoint = 0.35;
type NavigationToggleTone = "light" | "dark";

const whiteBackgroundNavigationHrefs = new Set([
  "#oferta",
  "#galeria",
  "#faq",
  "#kontakt",
  "#mapa",
]);

export default function HomePage() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [isTitleExpanded, setIsTitleExpanded] = useState(false);
  const [isNavigationItemsVisible, setIsNavigationItemsVisible] = useState(false);
  const [isNavigationClosing, setIsNavigationClosing] = useState(false);
  const [activeNavigationHref, setActiveNavigationHref] = useState(navigationItems[0].href);
  const [navigationToggleTone, setNavigationToggleTone] =
    useState<NavigationToggleTone>("light");
  const [isDesktopNavigationHidden, setIsDesktopNavigationHidden] = useState(false);
  const navigationToggleRef = useRef<HTMLButtonElement | null>(null);
  const navigationTimersRef = useRef<number[]>([]);

  const clearNavigationTimers = () => {
    navigationTimersRef.current.forEach((timerId) => {
      window.clearTimeout(timerId);
    });
    navigationTimersRef.current = [];
  };

  const scheduleNavigationTimer = (callback: () => void, delay: number) => {
    const timerId = window.setTimeout(callback, delay);
    navigationTimersRef.current.push(timerId);
  };

  const openNavigation = () => {
    clearNavigationTimers();
    setIsNavigationClosing(false);
    setIsNavigationItemsVisible(false);
    setIsTitleExpanded(false);
    setIsNavigationOpen(true);

    scheduleNavigationTimer(() => {
      setIsTitleExpanded(true);
    }, logoCenterHoldDuration);

    scheduleNavigationTimer(() => {
      setIsNavigationItemsVisible(true);
    }, logoCenterHoldDuration + logoMoveDuration);
  };

  const closeNavigation = () => {
    clearNavigationTimers();
    setIsNavigationItemsVisible(false);
    setIsNavigationClosing(false);

    scheduleNavigationTimer(() => {
      setIsTitleExpanded(false);
    }, 120);

    scheduleNavigationTimer(() => {
      setIsNavigationClosing(true);
    }, 120 + logoMoveDuration);

    scheduleNavigationTimer(() => {
      setIsNavigationClosing(false);
      setIsNavigationOpen(false);
    }, 120 + logoMoveDuration * 2);
  };

  const toggleNavigation = () => {
    if (isNavigationOpen) {
      closeNavigation();
      return;
    }

    openNavigation();
  };

  useEffect(() => clearNavigationTimers, []);

  useEffect(() => {
    const root = document.documentElement;
    const { body } = document;

    body.classList.toggle("nav-open", isNavigationOpen);
    root.classList.toggle("nav-open", isNavigationOpen);
    root.classList.toggle("nav-title-expanded", isTitleExpanded);
    root.classList.toggle("nav-items-visible", isNavigationItemsVisible);
    root.classList.toggle("nav-closing", isNavigationClosing);

    const preventBackgroundScroll = (event: Event) => {
      event.preventDefault();
    };

    if (isNavigationOpen) {
      const scrollY = window.scrollY;
      body.dataset.navScrollLock = String(scrollY);
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";

      body.addEventListener("touchmove", preventBackgroundScroll, { passive: false });
      body.addEventListener("wheel", preventBackgroundScroll, { passive: false });
    } else {
      const scrollY = Number(body.dataset.navScrollLock || "0");

      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      delete body.dataset.navScrollLock;

      if (scrollY > 0) {
        window.scrollTo(0, scrollY);
      }
    }

    return () => {
      body.removeEventListener("touchmove", preventBackgroundScroll);
      body.removeEventListener("wheel", preventBackgroundScroll);

      body.classList.remove("nav-open");
      root.classList.remove(
        "nav-open",
        "nav-title-expanded",
        "nav-items-visible",
        "nav-closing",
      );

      const scrollY = Number(body.dataset.navScrollLock || "0");

      if (body.style.position === "fixed") {
        body.style.position = "";
        body.style.top = "";
        body.style.left = "";
        body.style.right = "";
        body.style.width = "";
        delete body.dataset.navScrollLock;
        window.scrollTo(0, scrollY);
      }
    };
  }, [isNavigationOpen, isTitleExpanded, isNavigationItemsVisible, isNavigationClosing]);

  useEffect(() => {
    const sections = navigationItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    let animationFrameId: number | null = null;
    let lastScrollY = window.scrollY;

    const parseRgbColor = (color: string) => {
      if (color === "transparent") {
        return null;
      }

      const match = color.match(/rgba?\((.+)\)/);

      if (!match) {
        return null;
      }

      const parts = match[1]
        .replace(/\s*\/\s*/, ",")
        .split(/[\s,]+/)
        .filter(Boolean)
        .map(Number);

      const [red, green, blue, alpha = 1] = parts;

      if ([red, green, blue, alpha].some((part) => Number.isNaN(part)) || alpha < 0.1) {
        return null;
      }

      return { red, green, blue };
    };

    const getBackgroundTone = (
      element: Element | null,
    ): NavigationToggleTone | null => {
      let currentElement: Element | null = element;

      while (currentElement) {
        const backgroundColor = window.getComputedStyle(currentElement).backgroundColor;
        const rgb = parseRgbColor(backgroundColor);

        if (rgb) {
          const brightness = (rgb.red * 299 + rgb.green * 587 + rgb.blue * 114) / 1000;

          return brightness < 150 ? "light" : "dark";
        }

        currentElement = currentElement.parentElement;
      }

      return null;
    };

    const getToneBelowElement = (
      element: HTMLElement | null,
      ignoredSelectors: string[],
    ): NavigationToggleTone | null => {
      if (!element) {
        return null;
      }

      const rect = element.getBoundingClientRect();
      const elementsBelowElement = document.elementsFromPoint(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
      );
      const pageElementBelowElement =
        elementsBelowElement.find(
          (candidate) =>
            !ignoredSelectors.some((selector) => candidate.closest(selector)),
        ) ?? null;

      return getBackgroundTone(pageElementBelowElement);
    };

    const getNavigationToggleTone = (currentHref: string): NavigationToggleTone => {
      const measuredTone = getToneBelowElement(navigationToggleRef.current, [
        ".site-header",
        ".mobile-navigation",
      ]);

      if (measuredTone) {
        return measuredTone;
      }

      return whiteBackgroundNavigationHrefs.has(currentHref) ? "dark" : "light";
    };

    const getCurrentSection = () => {
      if (window.scrollY <= 8) {
        return sections[0];
      }

      const controlPoint = window.innerHeight * sectionActivationPoint;
      const sectionContainingControlPoint = sections.find((section) => {
        const rect = section.getBoundingClientRect();

        return rect.top <= controlPoint && rect.bottom > controlPoint;
      });

      if (sectionContainingControlPoint) {
        return sectionContainingControlPoint;
      }

      let currentSection = sections[0];
      let closestDistance = Number.POSITIVE_INFINITY;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        const sectionDistance = Math.min(
          Math.abs(rect.top - controlPoint),
          Math.abs(rect.bottom - controlPoint),
        );

        if (sectionDistance < closestDistance) {
          closestDistance = sectionDistance;
          currentSection = section;
        }
      }

      return currentSection;
    };

    const updateActiveSection = () => {
      const currentScrollY = window.scrollY;
      const currentSection = getCurrentSection();
      const currentHref = `#${currentSection.id}`;

      setActiveNavigationHref((previousHref) =>
        previousHref === currentHref ? previousHref : currentHref,
      );
      setNavigationToggleTone(getNavigationToggleTone(currentHref));

      if (currentScrollY <= 16) {
        setIsDesktopNavigationHidden(false);
      } else if (currentScrollY > lastScrollY + 6) {
        setIsDesktopNavigationHidden(true);
      } else if (currentScrollY < lastScrollY - 6) {
        setIsDesktopNavigationHidden(false);
      }

      lastScrollY = currentScrollY;
      animationFrameId = null;
    };

    const scheduleActiveSectionUpdate = () => {
      if (animationFrameId !== null) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleActiveSectionUpdate, { passive: true });
    window.addEventListener("resize", scheduleActiveSectionUpdate);

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener("scroll", scheduleActiveSectionUpdate);
      window.removeEventListener("resize", scheduleActiveSectionUpdate);
    };
  }, []);

  return (
    <>
      <div
        className="desktop-navigation-wrap"
        data-hidden={isDesktopNavigationHidden ? "true" : undefined}
      >
        <nav className="desktop-navigation" aria-label="Menu główne">
          <ul className="desktop-navigation__list">
            {navigationItems.map((item) => {
              const isActive = item.href === activeNavigationHref;

              return (
                <li key={item.href}>
                  <a
                    className="desktop-navigation__link"
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    onClick={() => setActiveNavigationHref(item.href)}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <main>
      <header
        className="site-header"
        data-toggle-tone={navigationToggleTone}
        aria-label="Nagłówek strony"
      >
        <button
          ref={navigationToggleRef}
          className="navigation-toggle"
          type="button"
          aria-controls="mobile-navigation"
          aria-expanded={isNavigationOpen}
          aria-label={
            isNavigationOpen ? "Zamknij menu nawigacyjne" : "Otwórz menu nawigacyjne"
          }
          onClick={toggleNavigation}
        >
          <span className="navigation-toggle__line" />
          <span className="navigation-toggle__line" />
          <span className="navigation-toggle__line" />
        </button>
      </header>

      <nav
        id="mobile-navigation"
        className="mobile-navigation"
        aria-hidden={!isNavigationOpen}
        aria-label="Menu główne"
      >
        <div className="mobile-navigation__content">
          <a
            href="#start"
            className="mobile-navigation__logo-link"
            tabIndex={isNavigationOpen ? 0 : -1}
            onClick={closeNavigation}
          >
            <ZakuwanieMarkowaLogo variant="light" className="mobile-navigation__logo" />
          </a>
          <ul className="mobile-navigation__list">
            {navigationItems.map((item) => {
              const isActive = item.href === activeNavigationHref;

              return (
                <li key={item.href}>
                  <a
                    className="mobile-navigation__link"
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    tabIndex={isNavigationOpen && isNavigationItemsVisible ? 0 : -1}
                    onClick={() => {
                      setActiveNavigationHref(item.href);
                      closeNavigation();
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <a
          className="mobile-navigation__phone"
          href={sitePhoneHref}
          tabIndex={isNavigationOpen && isNavigationItemsVisible ? 0 : -1}
        >
          {sitePhoneDisplay}
        </a>
      </nav>

      <section id="start" className="hero" aria-label="Sekcja główna">
        <div className="hero__media hero__media--left" aria-hidden="true">
          <picture>
            <source
              media="(min-width: 48rem)"
              srcSet={heroContent.desktopImage}
            />
            <img
              src={heroContent.mobileImage}
              alt="Wąż hydrauliczny z zakutą końcówką"
              loading="eager"
              fetchPriority="high"
            />
          </picture>
          <svg
            className="hero__media-notch"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line
              x1="84"
              y1="0"
              x2="100"
              y2="100"
              stroke="#ffffff"
              strokeWidth="12"
              strokeDasharray="28 18"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <div className="hero__media hero__media--right" aria-hidden="true">
          <HeroRightSlideshow images={heroRightSlideshowImages} />
        </div>

        <ScrollReveal className="hero__content">
          <ZakuwanieMarkowaLogo variant="light" className="hero__logo" />
          <h1 className="hero__heading">{heroContent.title}</h1>
          <p className="hero__location">{heroContent.location}</p>
          <div className="hero__actions" aria-label="Kontakt">
            <a className="hero__cta hero__cta--primary hero__cta--phone" href={sitePhoneHref}>
              {sitePhoneDisplay}
            </a>
            <a className="hero__cta hero__cta--secondary" href="#kontakt">
              Formularz kontaktowy
            </a>
          </div>
        </ScrollReveal>
      </section>

      <BenefitsSection />

      <MachineSection />

      <ScrollReveal
        as="section"
        id="galeria"
        className="gallery-section"
        aria-labelledby="gallery-title"
      >
        <h2 id="gallery-title" className="gallery-section__title">
          Galeria
        </h2>
        <span className="machine__rule machine__rule--center" aria-hidden="true" />
        <GalleryCoverflow images={ecolinoXWodwormTraki} showTabsAbove />
      </ScrollReveal>

      <ScrollReveal
        as="section"
        className="phone-banner"
        aria-label="Szybki kontakt telefoniczny"
      >
        <div className="phone-banner__inner">
          <div className="phone-banner__slogan">
            <p className="phone-banner__text">
              Potrzebujesz szybkiego zakucia węża Hydraulicznego?
            </p>
          </div>
          <div className="phone-banner__contact">
            <span className="phone-banner__prompt">Zadzwoń</span>
            <a className="phone-banner__link" href={sitePhoneHref}>
              {sitePhoneDisplay}
            </a>
          </div>
        </div>
      </ScrollReveal>

      <FaqSection />

      <ScrollReveal
        as="section"
        id="kontakt"
        className="contact-section"
        aria-labelledby="contact-title"
      >
        <div className="contact-section__inner">
          <div className="contact-section__header">
            <p className="contact-section__eyebrow">Kontakt</p>
            <h2 id="contact-title" className="contact-section__title">
              Napisz do nas
            </h2>
            <span className="machine__rule" aria-hidden="true" />
            <p className="contact-section__description">
              Zostaw wiadomość z krótkim opisem potrzebnego zakucia, a skontaktujemy się
              telefonicznie.
            </p>
          </div>

          <div className="contact-section__content">
            <form className="contact-form">
              <div className="contact-form__field">
                <label className="contact-form__label" htmlFor="contact-name">
                  Imię lub nazwa
                </label>
                <input
                  id="contact-name"
                  className="contact-form__input"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="contact-form__field">
                <label className="contact-form__label" htmlFor="contact-phone">
                  Telefon
                </label>
                <input
                  id="contact-phone"
                  className="contact-form__input"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                />
              </div>

              <div className="contact-form__field">
                <label className="contact-form__label" htmlFor="contact-message">
                  Wiadomość
                </label>
                <textarea
                  id="contact-message"
                  className="contact-form__textarea"
                  name="message"
                  rows={5}
                  required
                />
              </div>

              <button className="contact-form__submit" type="submit">
                Wyślij wiadomość
              </button>
            </form>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal
        as="section"
        id="mapa"
        className="map-section"
        aria-labelledby="map-title"
      >
        <div className="map-section__inner">
          <div className="map-section__header">
            <p className="map-section__eyebrow">Mapa</p>
            <h2 id="map-title" className="map-section__title">
              Dojazd
            </h2>
            <span className="machine__rule" aria-hidden="true" />
            <p className="map-section__description">{siteAddressFull}</p>
          </div>

          <div className="map-section__frame-wrapper">
            <ServiceAreaMap />
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal
        as="section"
        className="woodworm-section"
        aria-labelledby="woodworm-title"
      >
        <div className="woodworm-section__inner">
          <div className="woodworm-section__header">
            <p className="woodworm-section__eyebrow">Oferujemy również</p>
            <h2 id="woodworm-title" className="woodworm-section__title">
              <a
                className="woodworm-section__title-link woodworm-section__logo-link"
                href="https://woodworm.com.pl/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <picture>
                  <source
                    media="(min-width: 48rem)"
                    srcSet="/woodworm/woodworm-logo.webp"
                  />
                  <img
                    className="woodworm-section__logo"
                    src="/woodworm/woodworm-logo-mobile.webp"
                    alt="WoodWorm"
                    width={640}
                    height={108}
                    loading="lazy"
                  />
                </picture>
              </a>
            </h2>
            <span className="machine__rule" aria-hidden="true" />
          </div>

          <div className="woodworm-section__grid" aria-label="Produkty WoodWorm">
            {additionalOffers.map((offer) => (
              <article className="woodworm-card" key={offer.url}>
                <img
                  className="woodworm-card__image"
                  src={offer.image}
                  alt={offer.alt}
                  loading="lazy"
                />
                <div className="woodworm-card__content">
                  <h3 className="woodworm-card__title">{offer.title}</h3>
                  <a
                    className="woodworm-card__link"
                    href={offer.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {offer.cta}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </ScrollReveal>
      </main>

      <ScrollReveal as="footer" className="site-footer" aria-labelledby="footer-title">
        <div className="site-footer__inner">
          <div className="site-footer__brand">
            <p className="site-footer__eyebrow">Zakuwanie węży hydraulicznych</p>
            <h2 id="footer-title" className="site-footer__title">
              <a href="#start" className="site-footer__logo-link" aria-label="Zakuwanie Markowa">
                <ZakuwanieMarkowaLogo variant="light" className="site-footer__logo" />
              </a>
            </h2>
            <address className="site-footer__address">{siteAddressFull}</address>
            <p className="site-footer__meta">NIP: 8652567984</p>
            <p className="site-footer__meta">GPS: 50.019980, 22.260904</p>
          </div>

          <section className="site-footer__group" aria-labelledby="footer-hours-title">
            <h3 id="footer-hours-title" className="site-footer__heading">
              Godziny pracy
            </h3>
            <dl className="site-footer__hours">
              <div className="site-footer__hours-row">
                <dt>Poniedziałek</dt>
                <dd>07:00-15:00</dd>
              </div>
              <div className="site-footer__hours-row">
                <dt>Wtorek</dt>
                <dd>07:00-15:00</dd>
              </div>
              <div className="site-footer__hours-row">
                <dt>Środa</dt>
                <dd>07:00-15:00</dd>
              </div>
              <div className="site-footer__hours-row">
                <dt>Czwartek</dt>
                <dd>07:00-15:00</dd>
              </div>
              <div className="site-footer__hours-row">
                <dt>Piątek</dt>
                <dd>07:00-15:00</dd>
              </div>
              <div className="site-footer__hours-row">
                <dt>Sobota</dt>
                <dd>07:00-15:00</dd>
              </div>
              <div className="site-footer__hours-row">
                <dt>Niedziela</dt>
                <dd>Zamknięte</dd>
              </div>
            </dl>
          </section>

          <nav className="site-footer__group" aria-labelledby="footer-links-title">
            <h3 id="footer-links-title" className="site-footer__heading">
              Szybkie linki
            </h3>
            <ul className="site-footer__list">
              <li>
                <a href="#start">Start</a>
              </li>
              <li>
                <a href="#oferta">O maszynie</a>
              </li>
              <li>
                <a href="#galeria">Galeria</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="#kontakt">Kontakt</a>
              </li>
              <li>
                <a href="#mapa">Mapa</a>
              </li>
            </ul>
          </nav>

          <nav className="site-footer__group" aria-labelledby="footer-legal-title">
            <h3 id="footer-legal-title" className="site-footer__heading">
              Informacje prawne
            </h3>
            <ul className="site-footer__list">
              <li>
                <a href="/polityka-prywatnosci">Polityka prywatności</a>
              </li>
              <li>
                <a href="/regulamin">Regulamin</a>
              </li>
              <li>
                <a href="/cookies">Cookies</a>
              </li>
            </ul>
          </nav>
        </div>
        <p className="site-footer__copyright">© 2026 Zakuwanie Markowa</p>
      </ScrollReveal>
    </>
  );
}
