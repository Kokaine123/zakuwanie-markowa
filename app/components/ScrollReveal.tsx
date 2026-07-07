"use client";

import { type HTMLAttributes, type ReactNode, useEffect, useRef, useState } from "react";

type ScrollRevealProps = HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "section" | "footer";
  children: ReactNode;
};

let activeRevealInstances = 0;

const enableRevealAnimations = () => {
  activeRevealInstances += 1;
  document.documentElement.classList.add("reveal-ready");

  return () => {
    activeRevealInstances -= 1;

    if (activeRevealInstances === 0) {
      document.documentElement.classList.remove("reveal-ready");
    }
  };
};

export default function ScrollReveal({
  as = "div",
  children,
  className,
  ...props
}: ScrollRevealProps) {
  const revealRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const classes = ["scroll-reveal", className].filter(Boolean).join(" ");

  const setRevealRef = (element: HTMLElement | null) => {
    revealRef.current = element;
  };

  const revealProps = {
    ...props,
    className: classes,
    "data-reveal-visible": isVisible ? "true" : "false",
    ref: setRevealRef,
  };

  useEffect(() => {
    const element = revealRef.current;
    const disableRevealAnimations = enableRevealAnimations();

    if (!element) {
      disableRevealAnimations();
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return disableRevealAnimations;
    }

    const fallbackTimer = window.setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          window.clearTimeout(fallbackTimer);
          observer.disconnect();
        }
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.16,
      },
    );

    observer.observe(element);

    return () => {
      window.clearTimeout(fallbackTimer);
      observer.disconnect();
      disableRevealAnimations();
    };
  }, []);

  if (as === "section") {
    return <section {...revealProps}>{children}</section>;
  }

  if (as === "footer") {
    return <footer {...revealProps}>{children}</footer>;
  }

  return <div {...revealProps}>{children}</div>;
}
