import { Document } from '@contentful/rich-text-types';
import {
  TypeCampaignSkeleton,
  TypeCardSkeleton,
  TypeVideoSkeleton,
} from './types';
import { Asset, UnresolvedLink, AssetLink, Entry } from 'contentful';
import contentfulClient from './contentfulClient';
import {
  ContentImage,
  parseContentfulContentImage,
} from './parseContentfulImage';
import { parseContentfulVideo, VideoType } from './videos';
import { CardType, parseContentfulCard } from './cards';

interface FetchOptions {
  preview: boolean;
  id?: string;
}

export interface CampaignType {
  id: string;
  bannerTitle?: string;
  bannerImage?: ContentImage | null;
  partner?: string;
  date?: string;
  subtitle?: string;
  description?: Document | null;
  gallery?: ContentImage[] | null;
  finalText?: Document | null;
  imageCaption?: string;
  videos?: VideoType[];
  press?: CardType[];
  bannerColor?: string;
  videoCaption?: string;
  isHighlighted?: boolean;
}

function getFieldValue(
  field?: string | { [key: string]: string | undefined } | Document
): string {
  if (typeof field === 'string') {
    return field;
  } else if (field && typeof field === 'object' && 'nodeType' in field) {
    return '';
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

export function parseContentfulCampaign(
  campaignEntry?: Entry<TypeCampaignSkeleton>
): CampaignType | null {
  if (!campaignEntry) {
    return null;
  }

  const bannerImageField = campaignEntry.fields.bannerImage;

  const bannerImage = bannerImageField
    ? parseContentfulContentImage(
        bannerImageField as
          | Asset<undefined, string>
          | { sys: AssetLink }
          | UnresolvedLink<'Asset'>
      )
    : null;

  const gallery = campaignEntry.fields.gallery
    ? (campaignEntry.fields.gallery as Asset[])
        .map((image) =>
          parseContentfulContentImage(image as Asset<undefined, string>)
        )
        .filter((image): image is ContentImage => image !== null)
    : [];

  const videos: VideoType[] = campaignEntry.fields.videos
    ? (campaignEntry.fields.videos as unknown as Entry<TypeVideoSkeleton>[])
        .map((videoEntry) =>
          parseContentfulVideo(videoEntry as Entry<TypeVideoSkeleton>)
        )
        .filter((video): video is VideoType => video !== null)
    : [];

  const pressCards: CardType[] = campaignEntry.fields.press
    ? (campaignEntry.fields.press as Entry<TypeCardSkeleton>[])
        .map((cardEntry) =>
          parseContentfulCard(cardEntry as Entry<TypeCardSkeleton>)
        )
        .filter((card): card is CardType => card !== null)
    : [];

  const isHighlighted =
    typeof campaignEntry.fields.isHighlighted === 'boolean'
      ? campaignEntry.fields.isHighlighted
      : false;

  return {
    id: campaignEntry.sys.id,
    bannerTitle: getFieldValue(campaignEntry.fields.bannerTitle),
    bannerImage,
    partner: getFieldValue(campaignEntry.fields.partner),
    date: getFieldValue(campaignEntry.fields.date),
    subtitle: getFieldValue(campaignEntry.fields.subtitle),
    description: getRichTextFieldValue(campaignEntry.fields.description),
    gallery: gallery.length ? gallery : null,
    finalText: getRichTextFieldValue(campaignEntry.fields.finalText),
    imageCaption: getFieldValue(campaignEntry.fields.imageCaption),
    videos: videos,
    press: pressCards,
    bannerColor: getFieldValue(campaignEntry.fields.bannerColor),
    videoCaption: getFieldValue(campaignEntry.fields.videoCaption),
    isHighlighted,
  };
}

export async function fetchCampaigns({
  preview,
}: FetchOptions): Promise<CampaignType[]> {
  const contentful = contentfulClient({ preview });

  const campaignsResult = await contentful.getEntries<TypeCampaignSkeleton>({
    content_type: 'campaign',
    include: 2,
    order: ['fields.date'],
  });

  return campaignsResult.items.map(
    (campaignEntry) => parseContentfulCampaign(campaignEntry) as CampaignType
  );
}

export async function fetchCampaign({
  id,
  preview,
}: FetchOptions): Promise<CampaignType | null> {
  const contentful = contentfulClient({ preview });

  const campaignsResult = await contentful.getEntries<TypeCampaignSkeleton>({
    content_type: 'campaign',
    'sys.id': id,
    include: 2,
  });

  return parseContentfulCampaign(campaignsResult.items[0]);
}
