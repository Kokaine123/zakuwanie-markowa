"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { DivIcon, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { siteAddressFull } from "../data/siteContent";

const MapLoadingFallback = () => (
  <div className="map-section__frame map-section__placeholder" role="status">
    Ładowanie mapy...
  </div>
);

const MapContainer = dynamic(
  () => import("react-leaflet").then((module) => module.MapContainer),
  {
    loading: MapLoadingFallback,
    ssr: false,
  },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((module) => module.TileLayer),
  { ssr: false },
);
const Marker = dynamic(
  () => import("react-leaflet").then((module) => module.Marker),
  { ssr: false },
);
const Tooltip = dynamic(
  () => import("react-leaflet").then((module) => module.Tooltip),
  { ssr: false },
);
const Circle = dynamic(
  () => import("react-leaflet").then((module) => module.Circle),
  { ssr: false },
);

const serviceAreaCenter: LatLngExpression = [50.01998, 22.260904];
const serviceAreaRadius = 50000;
const serviceAreaCities: Array<{ name: string; position: LatLngExpression }> = [
  { name: "Łańcut", position: [50.0687, 22.2291] },
  { name: "Rzeszów", position: [50.0412, 21.9991] },
  { name: "Przeworsk", position: [50.0591, 22.4937] },
  { name: "Leżajsk", position: [50.2626, 22.4192] },
  { name: "Jarosław", position: [50.0162, 22.6778] },
];

type ServiceAreaMapIcons = {
  city: DivIcon;
  headquarters: DivIcon;
};

export default function ServiceAreaMap() {
  const [isClientReady, setIsClientReady] = useState(false);
  const [mapIcons, setMapIcons] = useState<ServiceAreaMapIcons | null>(null);

  useEffect(() => {
    let isMounted = true;

    setIsClientReady(true);

    import("leaflet").then(({ divIcon }) => {
      if (!isMounted) {
        return;
      }

      setMapIcons({
        city: divIcon({
          className: "service-area-map__city-icon",
          html: '<span class="service-area-map__city-dot" aria-hidden="true"></span>',
          iconAnchor: [4, 4],
          iconSize: [8, 8],
        }),
        headquarters: divIcon({
          className: "service-area-map__marker-icon",
          html: '<span class="service-area-map__pin" aria-hidden="true"></span>',
          iconAnchor: [13, 26],
          iconSize: [26, 26],
        }),
      });
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isClientReady) {
      return;
    }

    const resizeMap = () => window.dispatchEvent(new Event("resize"));
    const animationFrameId = window.requestAnimationFrame(resizeMap);
    const timeoutId = window.setTimeout(resizeMap, 350);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.clearTimeout(timeoutId);
    };
  }, [isClientReady]);

  if (!isClientReady) {
    return <MapLoadingFallback />;
  }

  return (
    <MapContainer
      center={serviceAreaCenter}
      zoom={8}
      scrollWheelZoom={false}
      className="map-section__frame"
      aria-label={`Mapa dojazdu do Zakuwanie Markowa, ${siteAddressFull}`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Circle
        center={serviceAreaCenter}
        radius={serviceAreaRadius}
        pathOptions={{
          color: "#005342",
          fillColor: "#005342",
          fillOpacity: 0.16,
          opacity: 0.9,
          weight: 2,
        }}
      />
      {mapIcons ? (
        <>
          <Marker position={serviceAreaCenter} icon={mapIcons.headquarters}>
            <Tooltip
              permanent
              direction="top"
              offset={[0, -28]}
              opacity={1}
              className="service-area-map__headquarters-label"
            >
              Zakuwanie Markowa - siedziba
            </Tooltip>
          </Marker>
          {serviceAreaCities.map((city) => (
            <Marker key={city.name} position={city.position} icon={mapIcons.city}>
              <Tooltip
                permanent
                direction="top"
                offset={[0, -8]}
                opacity={1}
                className="service-area-map__city-label"
              >
                {city.name}
              </Tooltip>
            </Marker>
          ))}
        </>
      ) : null}
    </MapContainer>
  );
}
