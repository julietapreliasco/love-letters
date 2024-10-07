import { TypeCampaignSkeleton, TypeCardSkeleton } from './types';
import {
  Entry,
  Asset,
  UnresolvedLink,
  AssetLink,
  EntrySkeletonType,
} from 'contentful';
import contentfulClient from './contentfulClient';
import {
  ContentImage,
  parseContentfulContentImage,
} from './parseContentfulImage';
import { CampaignType, parseContentfulCampaign } from './campaign';

export interface CardType {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: ContentImage | null;
  section: string;
  url?: string;
  campaign: Promise<CampaignType | null> | CampaignType | null;
  logo?: ContentImage | null;
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

export function parseContentfulCard(
  cardEntry?: Entry<TypeCardSkeleton>
): CardType | null {
  if (!cardEntry) {
    return null;
  }

  const imageField = cardEntry.fields.image;

  const image = imageField
    ? parseContentfulContentImage(
        imageField as
          | Asset<undefined, string>
          | { sys: AssetLink }
          | UnresolvedLink<'Asset'>
      )
    : null;

  const logoField = cardEntry.fields.logo;
  const logo = logoField
    ? parseContentfulContentImage(
        logoField as
          | Asset<undefined, string>
          | { sys: AssetLink }
          | UnresolvedLink<'Asset'>
      )
    : null;

  const campaignField = cardEntry.fields.campaign;
  const campaign = campaignField
    ? parseContentfulCampaign(campaignField as Entry<TypeCampaignSkeleton>)
    : null;

  return {
    title: getFieldValue(cardEntry.fields.title),
    subtitle: getFieldValue(cardEntry.fields.subtitle),
    description: getFieldValue(cardEntry.fields.description),
    image,
    section: getFieldValue(cardEntry.fields.section),
    url: getFieldValue(cardEntry.fields.url),
    campaign,
    logo,
  };
}

interface FetchOptions {
  preview: boolean;
  id?: string;
}

export async function fetchCards({
  preview,
}: FetchOptions): Promise<CardType[]> {
  const contentful = contentfulClient({ preview });

  const cardsResult = await contentful.getEntries<TypeCardSkeleton>({
    content_type: 'card',
    include: 2,
    order: ['fields.title'],
  });

  return cardsResult.items.map(
    (cardEntry) => parseContentfulCard(cardEntry) as CardType
  );
}

export async function fetchCard({
  id,
  preview,
}: FetchOptions): Promise<CardType | null> {
  const contentful = contentfulClient({ preview });

  const cardsResult = await contentful.getEntries<TypeCardSkeleton>({
    content_type: 'card',
    'sys.id': id,
    include: 2,
  });

  return parseContentfulCard(cardsResult.items[0]);
}
