import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Placeholder do podmiany po potwierdzeniu docelowej domeny.
const siteUrl = "https://example.com";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#local-business`,
      name: "Zakuwanie węży Markowa",
      url: siteUrl,
      telephone: "+48696129310",
      description:
        "Zakuwanie węży w Markowej koło Łańcuta na zakuwarce Uniflex HM 200 Ecoline.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Markowa 946",
        addressLocality: "Markowa",
        addressRegion: "Podkarpackie",
        addressCountry: "PL",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 50.01998,
        longitude: 22.260904,
      },
      taxID: "NIP 8652567984",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "08:00",
          closes: "20:00",
        },
      ],
      areaServed: ["Markowa", "Łańcut", "Podkarpackie"],
      knowsAbout: [
        "zakuwanie węży hydraulicznych",
        "zakuwanie węży przemysłowych",
        "Uniflex HM 200 Ecoline",
      ],
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#service`,
      name: "Zakuwanie węży",
      serviceType: "Zakuwanie węży hydraulicznych i przemysłowych",
      provider: { "@id": `${siteUrl}/#local-business` },
      areaServed: ["Markowa", "Łańcut", "Podkarpackie"],
      description:
        "Zakuwanie węży hydraulicznych do 1 1/4\" i węży przemysłowych do 2\" na maszynie HM 200 Ecoline.",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Zakuwanie węży Markowa - Uniflex HM 200 Ecoline",
    template: "%s | Zakuwanie węży Markowa",
  },
  description:
    "Zakuwanie węży w Markowej koło Łańcuta na zakuwarce Uniflex HM 200 Ecoline. Siła zaciskania 1300 kN / 130 t, zakres zakuwania do 70 mm.",
  keywords: [
    "zakuwanie węży",
    "zakuwanie węży Markowa",
    "zakuwanie węży Łańcut",
    "zakuwanie węży Podkarpackie",
    "zakuwarka Uniflex",
    "Uniflex HM 200 Ecoline",
    "HM 200 Ecoline",
    "zakuwanie przewodów hydraulicznych",
    "zakuwanie węży hydraulicznych",
    "zakuwanie węży przemysłowych",
    "siła zaciskania 1300 kN",
    "zakres zakuwania do 70 mm",
    "łączniki kolankowe 90 stopni",
  ],

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },

  openGraph: {
    title: "Zakuwanie węży Markowa - Uniflex HM 200 Ecoline",
    description:
      "Zakuwanie węży w Markowej koło Łańcuta na zakuwarce Uniflex HM 200 Ecoline: siła 1300 kN / 130 t i zakres do 70 mm.",
    url: siteUrl,
    siteName: "Zakuwanie węży Markowa",
    locale: "pl_PL",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Zakuwanie węży Markowa - Uniflex HM 200 Ecoline",
    description:
      "Zakuwanie węży w Markowej koło Łańcuta. Siła zaciskania 1300 kN / 130 t, zakres do 70 mm.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning className={montserrat.className}>
      <body>
        <Script
          src="https://kit.fontawesome.com/e287d8c785.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}