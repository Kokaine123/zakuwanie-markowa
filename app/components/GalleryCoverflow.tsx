"use client";

import { useEffect, useState } from "react";
import type { GalleryImage } from "../data/ecolinoXWodwormTraki";

type GalleryCoverflowProps = {
  images: GalleryImage[];
  showTabsAbove?: boolean;
};

function getOffset(index: number, activeIndex: number, total: number) {
  let offset = index - activeIndex;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

export default function GalleryCoverflow({ images, showTabsAbove }: GalleryCoverflowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const total = images.length;

  const goTo = (index: number) => setActiveIndex((index + total) % total);
  const goPrev = () => goTo(activeIndex - 1);
  const goNext = () => goTo(activeIndex + 1);

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

        <div className="gallery-coverflow__stage">
          {images.map((image, index) => {
            const offset = getOffset(index, activeIndex, total);
            return (
              <figure
                className="gallery-coverflow__card"
                data-offset={offset}
                key={image.id}
              >
                <button
                  className="gallery-coverflow__card-button"
                  type="button"
                  aria-label={offset === 0 ? `Powiększ: ${image.alt}` : `Pokaż: ${image.alt}`}
                  aria-current={offset === 0 ? "true" : undefined}
                  onClick={() => {
                    if (offset === 0) {
                      openLightbox();
                    } else {
                      goTo(index);
                    }
                  }}
                  tabIndex={Math.abs(offset) <= 2 ? 0 : -1}
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
            ←
          </button>
          <button
            className="gallery-coverflow__nav"
            type="button"
            aria-label="Następne zdjęcie"
            onClick={goNext}
          >
            →
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
            ←
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
            →
          </button>
        </div>
      )}
    </>
  );
}
