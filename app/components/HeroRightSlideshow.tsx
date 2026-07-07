"use client";

import { useEffect, useState } from "react";
import type { GalleryImage } from "../data/ecolinoXWodwormTraki";

const SLIDE_INTERVAL_MS = 5500;
const coverSlideshowImageIds = new Set(["traki-01", "dzwig-hydrauliczny-01"]);

type HeroRightSlideshowProps = {
  images: GalleryImage[];
};

export default function HeroRightSlideshow({ images }: HeroRightSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) {
      return;
    }

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotionQuery.matches) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [images.length]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="hero__slideshow">
      {images.map((image, index) => {
        const isActive = index === activeIndex;
        const useCover = coverSlideshowImageIds.has(image.id);

        return (
          <picture
            key={image.id}
            className={`hero__slideshow-slide${
              isActive ? " hero__slideshow-slide--active" : ""
            }${useCover ? " hero__slideshow-slide--cover" : ""}`}
          >
            <source media="(min-width: 48rem)" srcSet={image.desktopSrc} />
            <img
              src={image.mobileSrc}
              alt=""
              loading={index === 0 ? "eager" : "lazy"}
            />
          </picture>
        );
      })}
    </div>
  );
}
