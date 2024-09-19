import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';

interface Location {
  lat: number;
  lon: number;
  city?: string | null;
  country?: string | null;
}

interface CampaignLocation extends Location {
  id: string;
  title?: string;
}

interface MapProps {
  locations: Location | CampaignLocation[];
}

export default function Map({ locations }: MapProps) {
  useEffect(() => {
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

  const center = useMemo(() => {
    return isMultipleLocations
      ? ([locations[0].lat, locations[0].lon] as [number, number])
      : ([locations.lat, locations.lon] as [number, number]);
  }, [locations, isMultipleLocations]);

  const zoom = isMultipleLocations ? 2 : 5;

  const groupedLocations = useMemo(() => {
    if (!isMultipleLocations) return null;

    return (locations as CampaignLocation[]).reduce(
      (acc, location) => {
        const key = `${location.lat},${location.lon}`;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(location);
        return acc;
      },
      {} as Record<string, CampaignLocation[]>
    );
  }, [locations, isMultipleLocations]);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      className={`${isMultipleLocations ? 'h-[600px]' : 'h-[400px]'} z-0 w-full`}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png" />
      {isMultipleLocations ? (
        Object.entries(groupedLocations || {}).map(([key, groupLocations]) => (
          <Marker
            key={key}
            position={[groupLocations[0].lat, groupLocations[0].lon]}
          >
            <Popup>
              <div className="mb-2 font-lato text-sm font-bold text-custom-black">
                {groupLocations[0].city && groupLocations[0].country
                  ? `${groupLocations[0].city}, ${groupLocations[0].country}`
                  : 'Campaign Location'}
              </div>
              {groupLocations.map((location) => (
                <ul key={location.id} className="mb-1 list-disc px-2">
                  <Link href={`/campaigns/${location.id}`}>
                    <li className="font-lato text-xs text-custom-black hover:text-custom-yellow">
                      {`${location.title}` || ''}
                    </li>
                  </Link>
                </ul>
              ))}
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
