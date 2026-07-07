export const machineHighlights = [
  { value: "130 t", label: "Siła zacisku" },
  { value: "70 mm", label: "Maks. zakres" },
  { value: '2"', label: "Węże przemysłowe" },
  { value: '1½"', label: "Kolana 90°" },
] as const;

export const machineSpecs = [
  { label: "Siła zacisku", value: "130 ton (1300 kN)", icon: "fa-weight-hanging" },
  { label: "Maks. zakres zakucia", value: "do 70 mm", icon: "fa-ruler-horizontal" },
  { label: "Otwarcie szczęk", value: "+30 mm (maks. 100 mm)", icon: "fa-arrows-up-down" },
  { label: "Węże przemysłowe", value: 'do 2"', icon: "fa-plug" },
  { label: "Węże wielooplotowe", value: 'do 1½"', icon: "fa-layer-group" },
  { label: "Węże ciężkie (R15/4SH)", value: 'do 1"', icon: "fa-shield-halved" },
  { label: "Złączki kątowe 90°", value: 'do 1½"', icon: "fa-turn-up" },
] as const;

export const machineUses = [
  "maszyn budowlanych",
  "maszyn leśnych",
  "maszyn rolniczych",
  "maszyn przemysłowych",
  "kompresorów",
  "maszyn górniczych",
  "samochodów ciężarowych",
  "sprzętu specjalistycznego",
  "wózków widłowych",
  "układów klimatyzacji i chłodzenia",
  "układów hamulcowych",
  "sprzęgieł",
  "i wielu innych…",
] as const;

export const machineGalleryImages = {
  hero: {
    desktop: "/gallery/ecolinoXWodwormTraki/ecolino-01.webp",
    mobile: "/gallery/ecolinoXWodwormTraki/ecolino-01-mobile.webp",
    alt: "Złącza hydrauliczne i węże zakuwane w Markowej",
  },
  detail: {
    desktop: "/gallery/ecolinoXWodwormTraki/wezel-hydrauliczny-maszyna-01.webp",
    mobile: "/gallery/ecolinoXWodwormTraki/wezel-hydrauliczny-maszyna-01-mobile.webp",
    alt: "Węże hydrauliczne z zakutymi złączkami na maszynie",
  },
} as const;
