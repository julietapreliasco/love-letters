import { Document } from '@contentful/rich-text-types';
import {
  TypeCampaignSkeleton,
  TypePartnerSkeleton,
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
import { PartnerType, parseContentfulPartner } from './partners';

interface FetchOptions {
  preview: boolean;
  id?: string;
}

export interface CampaignType {
  id: string;
  bannerTitle?: string;
  bannerImage?: ContentImage | null;
  partner?: PartnerType[];
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

export async function parseContentfulCampaign(
  campaignEntry?: Entry<TypeCampaignSkeleton>
): Promise<CampaignType | null> {
  if (!campaignEntry) {
    return null;
  }

  const fields = campaignEntry.fields;

  const bannerImageField = fields?.bannerImage;
  const bannerImage = bannerImageField
    ? parseContentfulContentImage(
        bannerImageField as
          | Asset<undefined, string>
          | { sys: AssetLink }
          | UnresolvedLink<'Asset'>
      )
    : null;

  const gallery = fields?.gallery
    ? (fields.gallery as Asset[])
        .map((image) =>
          parseContentfulContentImage(image as Asset<undefined, string>)
        )
        .filter((image): image is ContentImage => image !== null)
    : [];

  const videos: VideoType[] = fields?.videos
    ? (fields.videos as unknown as Entry<TypeVideoSkeleton>[])
        .map((videoEntry) =>
          parseContentfulVideo(videoEntry as Entry<TypeVideoSkeleton>)
        )
        .filter((video): video is VideoType => video !== null)
    : [];

  const pressCards: CardType[] = fields?.press
    ? (fields.press as Entry<TypeCardSkeleton>[])
        .map((cardEntry) =>
          parseContentfulCard(cardEntry as Entry<TypeCardSkeleton>)
        )
        .filter((card): card is CardType => card !== null)
    : [];

  const partners: PartnerType[] = fields?.partner
    ? await Promise.all(
        (fields.partner as Entry<TypePartnerSkeleton>[]).map(
          async (partnerEntry) =>
            parseContentfulPartner(partnerEntry as Entry<TypePartnerSkeleton>)
        )
      ).then((partners) =>
        partners.filter((partner): partner is PartnerType => partner !== null)
      )
    : [];

  const isHighlighted =
    typeof fields?.isHighlighted === 'boolean' ? fields?.isHighlighted : false;

  return {
    id: campaignEntry.sys.id,
    bannerTitle: getFieldValue(fields?.bannerTitle),
    bannerImage,
    partner: partners.length ? partners : undefined,
    date: getFieldValue(fields?.date),
    subtitle: getFieldValue(fields?.subtitle),
    description: getRichTextFieldValue(fields?.description),
    gallery: gallery.length ? gallery : null,
    finalText: getRichTextFieldValue(fields?.finalText),
    imageCaption: getFieldValue(fields?.imageCaption),
    videos,
    press: pressCards,
    bannerColor: getFieldValue(fields?.bannerColor),
    videoCaption: getFieldValue(fields?.videoCaption),
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

  return Promise.all(
    campaignsResult.items.map(
      async (campaignEntry) =>
        (await parseContentfulCampaign(campaignEntry)) as CampaignType
    )
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
