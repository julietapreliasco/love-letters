import { PlaceType } from '@/contentful/places';
import Image from 'next/image';

interface PlacesGridProps {
  places: PlaceType[];
}

const PlacesGrid = ({ places }: PlacesGridProps) => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {places.map((place) => (
        <div key={place.title} className="group relative h-64 w-full">
          {place.backgroundImage?.src ? (
            <Image
              src={place.backgroundImage.src}
              alt={place.title}
              fill
              sizes=""
              className="absolute inset-0 object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-300" />
          )}

          <div className="absolute inset-0 bg-black opacity-30 transition-opacity duration-300 group-hover:opacity-0"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="font-futura text-xl font-bold uppercase text-white group-hover:opacity-0">
              {place.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlacesGrid;
