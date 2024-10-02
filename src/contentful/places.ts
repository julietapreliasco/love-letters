import { TypePlaceSkeleton, TypeCampaignSkeleton } from './types';
import { Entry, Asset, UnresolvedLink, AssetLink } from 'contentful';
import contentfulClient from './contentfulClient';
import {
  ContentImage,
  parseContentfulContentImage,
} from './parseContentfulImage';
import { CampaignType, parseContentfulCampaign } from './campaign';
import { Document } from '@contentful/rich-text-types';

export interface PlaceType {
  id: string;
  title: string;
  backgroundImage: ContentImage | null;
  campaigns: CampaignType[] | null;
  description: Document | null;
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

  return {
    id: placeEntry.sys.id,
    title: getFieldValue(placeEntry.fields.title),
    backgroundImage,
    campaigns:
      campaigns?.filter(
        (campaign): campaign is CampaignType => campaign !== null
      ) || null,
    description,
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
