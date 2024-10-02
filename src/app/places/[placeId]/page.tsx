import Banner from '@/components/landing/Banner';
import { fetchPlace } from '@/contentful/places';
import { BannerType } from '@/types';

const Place = async ({ params }: { params: { placeId: string } }) => {
  const { placeId } = params;
  const place = await fetchPlace({ id: placeId, preview: false });

  return (
    <div>
      <Banner bannerType={BannerType.CAMPAIGN_BANNER} placeData={place!} />
    </div>
  );
};

export default Place;
