'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { PlaceType } from '@/contentful/places';

const ClientSideMap = dynamic(
  () => import('../ui/ClientSideMap').then((mod) => mod.ClientSideMap),
  {
    ssr: false,
  }
);

interface MapProps {
  places: PlaceType[];
}

export function Map({ places }: MapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-10 p-10 md:p-20">
      <h2 className="font-futura text-3xl tracking-wider text-custom-black md:text-4xl xl:text-5xl 2xl:text-6xl">
        Love letters around the world
      </h2>
      <ClientSideMap places={places} />
    </div>
  );
}
