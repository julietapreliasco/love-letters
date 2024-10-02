import PlaceContent from '@/components/places/PlaceContent';
import { fetchPlace } from '@/contentful/places';
import { PlaceType } from '@/contentful/places';

export default async function Place({
  params,
}: {
  params: { placeId: string };
}) {
  const { placeId } = params;
  const place: PlaceType | null = await fetchPlace({
    id: placeId,
    preview: false,
  });

  if (!place) {
    return <div>Place not found</div>;
  }

  return <PlaceContent place={place} />;
}
