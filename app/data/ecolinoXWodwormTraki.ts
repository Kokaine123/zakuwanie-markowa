export type GalleryImage = {
  id: string;
  label: string;
  alt: string;
  desktopSrc: string;
  mobileSrc: string;
};

const wezeBasePath = "/gallery/weze-hydrauliczne";
const woodwormBasePath = "/gallery/ecolinoXWodwormTraki";

export const ecolinoXWodwormTraki: GalleryImage[] = [
  {
    id: "weze-hydrauliczne-01",
    label: "Złącza",
    alt: "Węże hydrauliczne z metalowymi złączami podłączone do bloku maszyny",
    desktopSrc: `${wezeBasePath}/weze-hydrauliczne-01.webp`,
    mobileSrc: `${wezeBasePath}/weze-hydrauliczne-01-mobile.webp`,
  },
  {
    id: "weze-hydrauliczne-02",
    label: "Przewody",
    alt: "Przewody hydrauliczne ze złączami i osłonami sprężynowymi",
    desktopSrc: `${wezeBasePath}/weze-hydrauliczne-02.webp`,
    mobileSrc: `${wezeBasePath}/weze-hydrauliczne-02-mobile.webp`,
  },
  {
    id: "weze-hydrauliczne-03",
    label: "Węże",
    alt: "Węże hydrauliczne podłączone do żółtego rozdzielacza w maszynie budowlanej",
    desktopSrc: `${wezeBasePath}/weze-hydrauliczne-03.webp`,
    mobileSrc: `${wezeBasePath}/weze-hydrauliczne-03-mobile.webp`,
  },
  {
    id: "weze-hydrauliczne-04",
    label: "Rozdzielacz",
    alt: "Rozdzielacz hydrauliczny z wężami wysokociśnieniowymi i końcówkami",
    desktopSrc: `${wezeBasePath}/weze-hydrauliczne-04.webp`,
    mobileSrc: `${wezeBasePath}/weze-hydrauliczne-04-mobile.webp`,
  },
  {
    id: "weze-hydrauliczne-05",
    label: "Szybkozłącza",
    alt: "Węże hydrauliczne ze szybkozłączami na czerwonej ramie maszyny",
    desktopSrc: `${wezeBasePath}/weze-hydrauliczne-05.webp`,
    mobileSrc: `${wezeBasePath}/weze-hydrauliczne-05-mobile.webp`,
  },
  {
    id: "weze-hydrauliczne-06",
    label: "Układ",
    alt: "Układ węży hydraulicznych przy sterowaniu maszyny przemysłowej",
    desktopSrc: `${wezeBasePath}/weze-hydrauliczne-06.webp`,
    mobileSrc: `${wezeBasePath}/weze-hydrauliczne-06-mobile.webp`,
  },
  {
    id: "weze-hydrauliczne-07",
    label: "Instalacja",
    alt: "Instalacja węży hydraulicznych na rozdzielaczu w maszynie rolniczej",
    desktopSrc: `${wezeBasePath}/weze-hydrauliczne-07.webp`,
    mobileSrc: `${wezeBasePath}/weze-hydrauliczne-07-mobile.webp`,
  },
  {
    id: "woodworm-01",
    label: "Łuparka",
    alt: "Łuparka hydrauliczna Collino w ofercie WoodWorm Markowa",
    desktopSrc: `${woodwormBasePath}/woodworm-01.webp`,
    mobileSrc: `${woodwormBasePath}/woodworm-01-mobile.webp`,
  },
  {
    id: "traki-01",
    label: "Trak",
    alt: "Układ hydrauliczny traka taśmowego WoodWorm",
    desktopSrc: `${woodwormBasePath}/traki-01.webp`,
    mobileSrc: `${woodwormBasePath}/traki-01-mobile.webp`,
  },
  {
    id: "ecolino-02",
    label: "Sterowanie",
    alt: "Sterowanie hydrauliczne maszyny Collino Ecolino",
    desktopSrc: `${woodwormBasePath}/ecolino-02.webp`,
    mobileSrc: `${woodwormBasePath}/ecolino-02-mobile.webp`,
  },
];

export const heroSlideshowImages = ecolinoXWodwormTraki.filter((image) =>
  image.id.startsWith("weze-hydrauliczne-"),
);
