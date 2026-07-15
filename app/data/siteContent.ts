export const sitePhoneDisplay = "+48 693 293 844";
export const sitePhoneHref = "tel:+48693293844";

const siteAddressLine = "Markowa 946";
const siteAddressHint = "Obok Zakładu Gospodarki Komunalnej";
export const siteAddressFull = `${siteAddressLine} (${siteAddressHint})`;

const siteOpeningHours = "07:00-15:00";

export const heroContent = {
  title: "Zakuwanie węży Hydraulicznych",
  location: "Ulica Markowa 946 / Okolice Łańcuta",
  desktopImage: "/gallery/weze-hydrauliczne/weze-hydrauliczne-01.webp",
  mobileImage: "/gallery/weze-hydrauliczne/weze-hydrauliczne-01-mobile.webp",
};

const wezeGalleryBase = "/gallery/weze-hydrauliczne";

export const benefitItems = [
  {
    id: "on-site",
    title: "Od ręki",
    subtitle: "Zakuwanie na miejscu",
    badgeIcon: "clock",
    meta: [
      { icon: "clock", label: "5–15 minut" },
      { icon: "check", label: "Bez umawiania" },
    ],
    cta: { label: "Sprawdź ofertę", href: "#oferta" },
    image: {
      desktop: `${wezeGalleryBase}/weze-hydrauliczne-01.webp`,
      mobile: `${wezeGalleryBase}/weze-hydrauliczne-01-mobile.webp`,
      focus: "68% 42%",
    },
  },
  {
    id: "hours",
    title: "Godziny",
    subtitle: siteOpeningHours,
    badgeIcon: "calendar",
    meta: [
      { icon: "calendar", label: "Pon–Pt" },
      { icon: "pin", label: "Markowa" },
    ],
    cta: { label: "Kontakt", href: "#kontakt" },
    image: {
      desktop: `${wezeGalleryBase}/weze-hydrauliczne-03.webp`,
      mobile: `${wezeGalleryBase}/weze-hydrauliczne-03-mobile.webp`,
      focus: "55% 40%",
    },
  },
  {
    id: "range",
    title: "Do 70 mm",
    subtitle: "Zakres zakucia",
    badgeIcon: "ruler",
    meta: [
      { icon: "ruler", label: "do 70 mm" },
      { icon: "gauge", label: "Hydraulika" },
    ],
    cta: { label: "O maszynie", href: "#oferta" },
    image: {
      desktop: `${wezeGalleryBase}/weze-hydrauliczne-05.webp`,
      mobile: `${wezeGalleryBase}/weze-hydrauliczne-05-mobile.webp`,
      focus: "62% 40%",
    },
  },
  {
    id: "emergency",
    title: "Awaria",
    subtitle: "Zadzwoń poza godzinami",
    badgeIcon: "alert",
    meta: [
      { icon: "alert", label: "Pilne zakuwanie" },
      { icon: "phone", label: sitePhoneDisplay },
    ],
    cta: { label: "Zadzwoń teraz", href: sitePhoneHref },
    image: {
      desktop: `${wezeGalleryBase}/weze-hydrauliczne-06.webp`,
      mobile: `${wezeGalleryBase}/weze-hydrauliczne-06-mobile.webp`,
      focus: "72% 38%",
    },
  },
  {
    id: "location",
    title: "Markowa",
    subtitle: "Serwis na miejscu",
    badgeIcon: "pin",
    meta: [
      { icon: "pin", label: siteAddressLine },
      { icon: "map", label: "Okolice Łańcuta" },
    ],
    cta: { label: "Zobacz mapę", href: "#mapa" },
    image: {
      desktop: `${wezeGalleryBase}/weze-hydrauliczne-07.webp`,
      mobile: `${wezeGalleryBase}/weze-hydrauliczne-07-mobile.webp`,
      focus: "50% 36%",
    },
  },
] as const;

export const faqItems = [
  {
    id: "faq-what",
    question: "Czym dokładnie jest zakuwanie węży hydraulicznych?",
    answer:
      "Zakuwanie (zaciskanie) węży hydraulicznych to proces technologiczny polegający na trwałym połączeniu elastycznego przewodu wysokociśnieniowego z metalową końcówką przy użyciu specjalistycznej prasy (zakuwarki). Proces ten gwarantuje pełną szczelność i odporność przewodu na ekstremalne ciśnienia panujące w układach hydraulicznych maszyn rolniczych, budowlanych oraz przemysłowych.",
  },
  {
    id: "faq-time",
    question: "Jak długo trwa zakuwanie przewodu na miejscu?",
    answer:
      "W naszym serwisie w Markowej rozumiemy, że każda minuta przestoju maszyny to strata finansowa. Dlatego usługę zakuwania węży standardowo wykonujemy od ręki. Proces przygotowania, cięcia i precyzyjnego zaciśnięcia końcówki trwa zazwyczaj od 5 do 15 minut, zależnie od stopnia skomplikowania i średnicy przewodu.",
  },
  {
    id: "faq-params",
    question: "Jakie parametry należy znać przed zamówieniem nowego węża?",
    answer:
      "Aby idealnie dobrać przewód, nasi specjaliści analizują kluczowe parametry: średnicę wewnętrzną węża (podawaną w calach lub milimetrach), planowane ciśnienie robocze (mierzone w barach), rodzaj przesyłanego medium (np. olej mineralny, glikol, woda) oraz rodzaj i gwint końcówek (metryczne, calowe, proste lub kątowe). Jeśli nie posiadasz tych danych, po prostu przynieś stary, uszkodzony wąż – dobierzemy wszystko na jego podstawie.",
  },
  {
    id: "faq-diameter",
    question: "Jaki jest maksymalny zakres średnic, które obsługujecie?",
    answer:
      "Dzięki nowoczesnemu i zaawansowanemu parkowi maszynowemu, nasz punkt serwisowy z powodzeniem realizuje precyzyjne zakuwanie przewodów w bardzo szerokim zakresie – aż do średnicy 70 mm. Pozwala to na obsługę nawet bardzo grubych węży stosowanych w ciężkim sprzęcie budowlanym oraz zaawansowanych instalacjach przemysłowych.",
  },
  {
    id: "faq-emergency",
    question: "Co zrobić w przypadku nagłej awarii poza standardowymi godzinami pracy?",
    answer: `Zdajemy sobie sprawę, że awarie układów hydraulicznych zdarzają się w najmniej oczekiwanych momentach, np. podczas intensywnych prac polowych czy na budowie. W przypadku nagłej usterki oferujemy możliwość kontaktu telefonicznego pod numerem ${sitePhoneDisplay} również poza standardowymi godzinami otwarcia serwisu (${siteOpeningHours}). Postaramy się pomóc i rozwiązać Twój problem jak najszybciej.`,
  },
] as const;
