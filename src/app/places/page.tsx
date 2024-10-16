import PlacesGrid from '@/components/places/PlacesGrid';
import { fetchPlaces } from '@/contentful/places';

const Places = async () => {
  const places = await fetchPlaces({ preview: false });

  return (
    <div className="flex flex-col items-center gap-10 px-8 py-28 md:py-[150px] xl:px-[160px]">
      <h2 className="font-futura text-xl font-medium uppercase leading-normal tracking-wider md:mb-10 md:text-3xl md:leading-normal lg:text-4xl lg:leading-normal">
        Places
      </h2>

      <PlacesGrid places={places} />
    </div>
  );
};

export default Places;
