import { PlaceType } from '@/contentful/places';
import Image from 'next/image';
import AlternativeLogo from '../ui/AlternativeLogo';
import Link from 'next/link';

interface PlacesGridProps {
  places: PlaceType[];
}

const PlacesGrid = ({ places }: PlacesGridProps) => {
  return (
    <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2">
      {places.map((place) => (
        <Link href={`/places/${place.id}`} key={place.id}>
          <div className="group relative h-72 w-full drop-shadow-xl">
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

            <div className="absolute inset-0 bg-black opacity-30"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <AlternativeLogo className="w-[150px] transition-transform duration-300" />
              <h3 className="font-futura text-3xl font-bold uppercase text-white transition-transform duration-300">
                {place.title}
              </h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PlacesGrid;
