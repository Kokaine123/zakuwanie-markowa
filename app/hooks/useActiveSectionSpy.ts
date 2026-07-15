"use client";

import { useEffect, useState } from "react";

type NavigationItem = {
  href: string;
};

const intersectionThresholds = [0, 0.1, 0.25, 0.5, 0.75, 1];

export function useActiveSectionSpy(items: NavigationItem[], activationPoint = 0.35) {
  const [activeHref, setActiveHref] = useState(items[0]?.href ?? "#start");

  useEffect(() => {
    const sections = items
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    const visibleRatios = new Map<string, number>();
    sections.forEach((section) => visibleRatios.set(section.id, 0));

    const getSectionFromScroll = () => {
      if (window.scrollY <= 8) {
        return sections[0];
      }

      const controlPoint = window.innerHeight * activationPoint;
      const sectionAtControlPoint = sections.find((section) => {
        const rect = section.getBoundingClientRect();

        return rect.top <= controlPoint && rect.bottom > controlPoint;
      });

      if (sectionAtControlPoint) {
        return sectionAtControlPoint;
      }

      let closestSection = sections[0];
      let closestDistance = Number.POSITIVE_INFINITY;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        const distance = Math.min(
          Math.abs(rect.top - controlPoint),
          Math.abs(rect.bottom - controlPoint),
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestSection = section;
        }
      }

      return closestSection;
    };

    const updateActiveHref = () => {
      let nextSection = sections[0];
      let highestRatio = -1;

      for (const section of sections) {
        const ratio = visibleRatios.get(section.id) ?? 0;

        if (ratio > highestRatio) {
          highestRatio = ratio;
          nextSection = section;
        }
      }

      if (highestRatio <= 0) {
        nextSection = getSectionFromScroll();
      }

      const nextHref = `#${nextSection.id}`;

      setActiveHref((previousHref) => (previousHref === nextHref ? previousHref : nextHref));
    };

    const getRootMargin = () => {
      const topOffset = Math.round(window.innerHeight * (1 - activationPoint));
      const bottomOffset = Math.round(window.innerHeight * activationPoint);

      return `-${topOffset}px 0px -${bottomOffset}px 0px`;
    };

    let observer: IntersectionObserver | null = null;
    let frameId: number | null = null;

    const scheduleUpdate = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        updateActiveHref();
      });
    };

    const startObserver = () => {
      observer?.disconnect();
      sections.forEach((section) => visibleRatios.set(section.id, 0));

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visibleRatios.set(
              entry.target.id,
              entry.isIntersecting ? entry.intersectionRatio : 0,
            );
          });

          updateActiveHref();
        },
        {
          root: null,
          rootMargin: getRootMargin(),
          threshold: intersectionThresholds,
        },
      );

      sections.forEach((section) => observer?.observe(section));
      scheduleUpdate();
    };

    startObserver();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", startObserver);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      observer?.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", startObserver);
    };
  }, [items, activationPoint]);

  return [activeHref, setActiveHref] as const;
}
