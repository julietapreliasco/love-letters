import PlacesGrid from '@/components/places/PlacesGrid';
import { fetchPlaces } from '@/contentful/places';

const Places = async () => {
  const places = await fetchPlaces({ preview: false });

  return (
    <div className="flex flex-col items-center gap-10 px-4 py-20 md:px-[60px] md:py-[120px]">
      <h2 className="text-center font-futura text-3xl font-semibold">Places</h2>

      <PlacesGrid places={places} />
    </div>
  );
};

export default Places;
