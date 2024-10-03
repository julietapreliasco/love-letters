'use client';

import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import { PlaceType } from '@/contentful/places';

interface MapProps {
  places: PlaceType[];
}

function OffsetMarkers() {
  const map = useMap();
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (!rendered) {
      const markers = document.querySelectorAll('.leaflet-marker-icon');
      const positions: { [key: string]: number } = {};

      markers.forEach((marker) => {
        const left = marker
          .getAttribute('style')
          ?.match(/left: (-?\d+)px/)?.[1];
        const top = marker.getAttribute('style')?.match(/top: (-?\d+)px/)?.[1];
        if (left && top) {
          const key = `${left},${top}`;
          if (key in positions) {
            const offset = (positions[key] + 1) * 10;
            marker.setAttribute(
              'style',
              `${marker.getAttribute('style')}; margin-left: ${offset}px; margin-top: ${offset}px;`
            );
            positions[key]++;
          } else {
            positions[key] = 0;
          }
        }
      });

      setRendered(true);
    }
  }, [map, rendered]);

  return null;
}

export function ClientSideMap({ places }: MapProps) {
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
      iconRetinaUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  const placesWithLocation = useMemo(() => {
    return places.filter((place) => place.location);
  }, [places]);

  const center = useMemo(() => {
    if (placesWithLocation.length > 0) {
      return [
        placesWithLocation[0].location!.lat,
        placesWithLocation[0].location!.lon,
      ] as [number, number];
    }
    return [0, 0] as [number, number];
  }, [placesWithLocation]);

  const zoom = 2;

  if (placesWithLocation.length === 0) {
    return null;
  }

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      className="z-0 h-[600px] w-full"
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png" />
      <OffsetMarkers />
      {placesWithLocation.map((place) => (
        <Marker
          key={place.id}
          position={[place.location!.lat, place.location!.lon]}
        >
          <Popup>
            <Link href={`/places/${place.id}`}>
              <div className="mb-2 font-lato text-sm font-bold text-custom-black hover:text-custom-yellow">
                {place.title}
              </div>
            </Link>

            <ul className="mb-1 list-disc px-2">
              {place.campaigns?.map((campaign) => (
                <li key={campaign.id}>
                  <Link href={`/places/${place.id}?campaignId=${campaign.id}`}>
                    <span className="font-lato text-xs text-custom-black hover:text-custom-yellow">
                      {campaign.bannerTitle || campaign.subtitle || 'Campaign'}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
