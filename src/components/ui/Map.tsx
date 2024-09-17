'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Button from './Button';
import Link from 'next/link';

interface Location {
  lat: number;
  lon: number;
  city?: string | null;
  country?: string | null;
}

interface CampaignLocation extends Location {
  id: string;
}

interface MapProps {
  locations: Location | CampaignLocation[];
}

export default function Map({ locations }: MapProps) {
  useEffect(() => {
    const L = require('leaflet');
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        'https://github.com/pointhi/leaflet-color-markers/blob/master/img/marker-icon-gold.png?raw=true',
      iconUrl:
        'https://github.com/pointhi/leaflet-color-markers/blob/master/img/marker-icon-gold.png?raw=true',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  const isMultipleLocations = Array.isArray(locations);
  const center = isMultipleLocations
    ? ([locations[0].lat, locations[0].lon] as [number, number])
    : ([locations.lat, locations.lon] as [number, number]);
  const zoom = isMultipleLocations ? 2 : 5;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={`${isMultipleLocations ? 'h-[600px]' : 'h-[400px]'} z-0 w-full`}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {isMultipleLocations ? (
        (locations as CampaignLocation[]).map((location: CampaignLocation) => (
          <Marker key={location.id} position={[location.lat, location.lon]}>
            <Popup>
              <Link href={`/campaigns/${location.id}`}>
                <span className="font-lato text-sm font-bold text-custom-black hover:text-custom-yellow">
                  {location.city && location.country
                    ? `${location.city}, ${location.country}`
                    : 'Campaign Location'}
                </span>
              </Link>
            </Popup>
          </Marker>
        ))
      ) : (
        <Marker position={[locations.lat, locations.lon]}>
          <Popup>
            {(locations as Location).city && (locations as Location).country
              ? `${(locations as Location).city}, ${(locations as Location).country}`
              : 'Campaign Location'}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
