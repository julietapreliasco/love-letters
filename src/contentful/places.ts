import {
  TypePlaceSkeleton,
  TypeCampaignSkeleton,
  TypeVideoSkeleton,
  TypeCardSkeleton,
} from './types';
import { Entry, Asset, UnresolvedLink, AssetLink } from 'contentful';
import contentfulClient from './contentfulClient';
import {
  ContentImage,
  parseContentfulContentImage,
} from './parseContentfulImage';
import { CampaignType, parseContentfulCampaign } from './campaign';
import { Document } from '@contentful/rich-text-types';
import { parseContentfulVideo, VideoType } from './videos';
import { CardType, parseContentfulCard } from './cards';

export interface PlaceType {
  id: string;
  title: string;
  backgroundImage: ContentImage | null;
  campaigns: CampaignType[] | null;
  description: Document | null;
  trailer: VideoType | null;
  press: CardType[] | null;
  location: { lat: number; lon: number } | null;
}

function getFieldValue(
  field?: string | { [key: string]: string | undefined }
): string {
  if (typeof field === 'string') {
    return field;
  } else if (field && typeof field === 'object') {
    return Object.values(field)[0] || '';
  }
  return '';
}

function getRichTextFieldValue(
  field?: Document | { [key: string]: Document | undefined } | null
): Document | null {
  if (field && 'nodeType' in field) {
    return field as Document;
  } else if (field && typeof field === 'object') {
    return Object.values(field)[0] || null;
  }
  return null;
}

export async function parseContentfulPlace(
  placeEntry?: Entry<TypePlaceSkeleton>
): Promise<PlaceType | null> {
  if (!placeEntry) {
    return null;
  }

  const backgroundImageField = placeEntry.fields.backgroundImage;
  const backgroundImage = backgroundImageField
    ? parseContentfulContentImage(
        backgroundImageField as
          | Asset<undefined, string>
          | { sys: AssetLink }
          | UnresolvedLink<'Asset'>
      )
    : null;

  const campaignsField = placeEntry.fields.campaigns;
  const campaigns = Array.isArray(campaignsField)
    ? await Promise.all(
        campaignsField.map((campaign) =>
          parseContentfulCampaign(campaign as Entry<TypeCampaignSkeleton>)
        )
      )
    : null;

  const description = getRichTextFieldValue(placeEntry.fields.description);

  const trailerField = placeEntry.fields.trailer;
  const trailer = trailerField
    ? await parseContentfulVideo(trailerField as Entry<TypeVideoSkeleton>)
    : null;

  const pressField = placeEntry.fields.press;
  const press = Array.isArray(pressField)
    ? await Promise.all(
        pressField.map((card) =>
          parseContentfulCard(card as Entry<TypeCardSkeleton>)
        )
      )
    : null;

  const locationField = placeEntry.fields.location;
  const location =
    locationField &&
    typeof locationField.lat === 'number' &&
    typeof locationField.lon === 'number'
      ? { lat: locationField.lat, lon: locationField.lon }
      : null;

  return {
    id: placeEntry.sys.id,
    title: getFieldValue(placeEntry.fields.title),
    backgroundImage,
    campaigns:
      campaigns?.filter(
        (campaign): campaign is CampaignType => campaign !== null
      ) || null,
    description,
    trailer,
    press: press?.filter((card): card is CardType => card !== null) || null,
    location,
  };
}

interface FetchOptions {
  preview: boolean;
  id?: string;
}

export async function fetchPlaces({
  preview,
}: FetchOptions): Promise<PlaceType[]> {
  const contentful = contentfulClient({ preview });

  const placesResult = await contentful.getEntries<TypePlaceSkeleton>({
    content_type: 'place',
    include: 2,
    order: ['fields.title'],
  });

  const places = await Promise.all(
    placesResult.items.map(async (placeEntry) => {
      return await parseContentfulPlace(placeEntry);
    })
  );

  return places.filter((place): place is PlaceType => place !== null);
}

export async function fetchPlace({
  id,
  preview,
}: FetchOptions): Promise<PlaceType | null> {
  const contentful = contentfulClient({ preview });

  const placeResult = await contentful.getEntries<TypePlaceSkeleton>({
    content_type: 'place',
    'sys.id': id,
    include: 2,
  });

  return await parseContentfulPlace(placeResult.items[0]);
}
