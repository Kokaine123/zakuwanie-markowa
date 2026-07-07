export type GalleryImage = {
  id: string;
  label: string;
  alt: string;
  desktopSrc: string;
  mobileSrc: string;
};

const galleryBasePath = "/gallery/ecolinoXWodwormTraki";

export const ecolinoXWodwormTraki: GalleryImage[] = [
  {
    id: "ecolino-01",
    label: "Złącza",
    alt: "Złącza hydrauliczne i węże w serwisie zakuwania w Markowej",
    desktopSrc: `${galleryBasePath}/ecolino-01.webp`,
    mobileSrc: `${galleryBasePath}/ecolino-01-mobile.webp`,
  },
  {
    id: "ecolino-02",
    label: "Sterowanie",
    alt: "Sterowanie hydrauliczne maszyny Collino Ecolino",
    desktopSrc: `${galleryBasePath}/ecolino-02.webp`,
    mobileSrc: `${galleryBasePath}/ecolino-02-mobile.webp`,
  },
  {
    id: "woodworm-01",
    label: "Łuparka",
    alt: "Łuparka hydrauliczna Collino w ofercie WoodWorm Markowa",
    desktopSrc: `${galleryBasePath}/woodworm-01.webp`,
    mobileSrc: `${galleryBasePath}/woodworm-01-mobile.webp`,
  },
  {
    id: "traki-01",
    label: "Trak taśmowy",
    alt: "Układ hydrauliczny traka taśmowego WoodWorm",
    desktopSrc: `${galleryBasePath}/traki-01.webp`,
    mobileSrc: `${galleryBasePath}/traki-01-mobile.webp`,
  },
  {
    id: "przewody-hydrauliczne-silnik-01",
    label: "Przewody",
    alt: "Przewody hydrauliczne i złącza w układzie silnikowym — zakuwanie Markowa",
    desktopSrc: `${galleryBasePath}/przewody-hydrauliczne-silnik-01.webp`,
    mobileSrc: `${galleryBasePath}/przewody-hydrauliczne-silnik-01-mobile.webp`,
  },
  {
    id: "wezel-hydrauliczny-maszyna-01",
    label: "Węże",
    alt: "Węże hydrauliczne maszyny leśnej z zakutymi złączkami",
    desktopSrc: `${galleryBasePath}/wezel-hydrauliczny-maszyna-01.webp`,
    mobileSrc: `${galleryBasePath}/wezel-hydrauliczny-maszyna-01-mobile.webp`,
  },
  {
    id: "dzwig-hydrauliczny-01",
    label: "Dźwig",
    alt: "Dźwig hydrauliczny z instalacją węży na pojeździe ciężarowym",
    desktopSrc: `${galleryBasePath}/dzwig-hydrauliczny-01.webp`,
    mobileSrc: `${galleryBasePath}/dzwig-hydrauliczny-01-mobile.webp`,
  },
];
