import { notFound } from 'next/navigation';
import PlaceContent from '@/components/places/PlaceContent';
import { fetchPlace, PlaceType } from '@/contentful/places';

interface PlacePageProps {
  params: { placeId: string };
}

export default async function Place({ params }: PlacePageProps) {
  const { placeId } = params;

  const place: PlaceType | null = await fetchPlace({
    id: placeId,
    preview: false,
  });

  if (!place) {
    notFound();
  }

  return <PlaceContent place={place} />;
}
