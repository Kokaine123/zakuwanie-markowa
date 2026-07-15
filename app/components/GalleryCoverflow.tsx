"use client";

import { useEffect, useRef, useState } from "react";
import type { GalleryImage } from "../data/ecolinoXWodwormTraki";

type GalleryCoverflowProps = {
  images: GalleryImage[];
  showTabsAbove?: boolean;
};

const swipeDistanceThreshold = 48;
const swipeDirectionRatio = 1.15;

const visibleOffsetRange = 2;

function getOffset(index: number, activeIndex: number, total: number) {
  let offset = index - activeIndex;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

export default function GalleryCoverflow({ images, showTabsAbove }: GalleryCoverflowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const suppressClickRef = useRef(false);
  const total = images.length;

  const goTo = (index: number) => setActiveIndex((index + total) % total);
  const goPrev = () => setActiveIndex((current) => (current - 1 + total) % total);
  const goNext = () => setActiveIndex((current) => (current + 1) % total);

  const handleTouchStart = (event: React.TouchEvent) => {
    const touch = event.changedTouches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    suppressClickRef.current = false;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const touchStart = touchStartRef.current;

    if (!touchStart) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;

    touchStartRef.current = null;

    if (Math.abs(deltaX) < swipeDistanceThreshold) {
      return;
    }

    if (Math.abs(deltaX) < Math.abs(deltaY) * swipeDirectionRatio) {
      return;
    }

    suppressClickRef.current = true;

    if (deltaX < 0) {
      goNext();
      return;
    }

    goPrev();
  };

  const openLightbox = () => setLightboxOpen(true);
  const closeLightbox = () => setLightboxOpen(false);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.classList.add("nav-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("nav-open");
    };
  }, [lightboxOpen, activeIndex]);

  const activeImage = images[activeIndex];

  return (
    <>
      <div className="gallery-coverflow" aria-label="Galeria zdjęć">
        {showTabsAbove && (
          <nav className="gallery-coverflow__tabs" aria-label="Nawigacja galerii">
            {images.map((image, index) => (
              <button
                key={image.id}
                className="gallery-coverflow__tab"
                type="button"
                aria-current={index === activeIndex ? "true" : undefined}
                data-active={index === activeIndex ? "true" : undefined}
                onClick={() => goTo(index)}
              >
                {image.label}
              </button>
            ))}
          </nav>
        )}

        <div
          className="gallery-coverflow__stage"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {images.map((image, index) => {
            const offset = getOffset(index, activeIndex, total);
            const isVisible = Math.abs(offset) <= visibleOffsetRange;

            return (
              <figure
                className="gallery-coverflow__card"
                data-offset={offset}
                data-visible={isVisible ? "true" : "false"}
                aria-hidden={!isVisible}
                key={image.id}
              >
                <button
                  className="gallery-coverflow__card-button"
                  type="button"
                  aria-label={offset === 0 ? `Powiększ: ${image.alt}` : `Pokaż: ${image.alt}`}
                  aria-current={offset === 0 ? "true" : undefined}
                  onClick={() => {
                    if (suppressClickRef.current) {
                      suppressClickRef.current = false;
                      return;
                    }

                    if (offset === 0) {
                      openLightbox();
                    } else {
                      goTo(index);
                    }
                  }}
                  tabIndex={isVisible && Math.abs(offset) <= visibleOffsetRange ? 0 : -1}
                >
                  <picture>
                    <source media="(min-width: 48rem)" srcSet={image.desktopSrc} />
                    <img
                      className="gallery-coverflow__image"
                      src={image.mobileSrc}
                      alt={image.alt}
                      loading={index === activeIndex ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </picture>
                </button>
              </figure>
            );
          })}
        </div>

        <div className="gallery-coverflow__controls">
          <button
            className="gallery-coverflow__nav"
            type="button"
            aria-label="Poprzednie zdjęcie"
            onClick={goPrev}
          >
            <i className="fa-solid fa-chevron-left" aria-hidden="true" />
          </button>
          <button
            className="gallery-coverflow__nav"
            type="button"
            aria-label="Następne zdjęcie"
            onClick={goNext}
          >
            <i className="fa-solid fa-chevron-right" aria-hidden="true" />
          </button>
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.alt}
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            className="gallery-lightbox__close"
            type="button"
            aria-label="Zamknij"
            onClick={closeLightbox}
          >
            ✕
          </button>

          <button
            className="gallery-lightbox__nav gallery-lightbox__nav--prev"
            type="button"
            aria-label="Poprzednie zdjęcie"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
          >
            <i className="fa-solid fa-chevron-left" aria-hidden="true" />
          </button>

          <figure
            className="gallery-lightbox__figure"
            onClick={(e) => e.stopPropagation()}
          >
            <picture>
              <source media="(min-width: 48rem)" srcSet={activeImage.desktopSrc} />
              <img
                className="gallery-lightbox__image"
                src={activeImage.mobileSrc}
                alt={activeImage.alt}
                loading="eager"
                decoding="async"
              />
            </picture>
          </figure>

          <button
            className="gallery-lightbox__nav gallery-lightbox__nav--next"
            type="button"
            aria-label="Następne zdjęcie"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
          >
            <i className="fa-solid fa-chevron-right" aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}
