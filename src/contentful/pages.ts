import type { Entry, Asset, UnresolvedLink, AssetLink } from 'contentful';
import { Document } from '@contentful/rich-text-types';
import {
  TypePageSkeleton,
  TypeCardSkeleton,
  TypePartnerSkeleton,
  TypeCampaignSkeleton,
  TypeVideoSkeleton,
} from './types';
import contentfulClient from './contentfulClient';
import {
  ContentImage,
  parseContentfulContentImage,
} from './parseContentfulImage';
import { CardType, parseContentfulCard } from './cards';
import { PartnerType, parseContentfulPartner } from './partners';
import { CampaignType, parseContentfulCampaign } from './campaign';
import { parseContentfulVideo, VideoType } from './videos';

export interface PageType {
  id: string;
  page: string;
  bannerTitle?: string;
  bannerImg?: ContentImage | null;
  bannerSubtitle?: string;
  title?: string;
  richText?: Document | null;
  richTextTwo?: Document | null;
  richTextThree?: Document | null;
  images?: ContentImage[] | null;
  cards?: CardType[] | null;
  pressCards?: CardType[] | null;
  partners?: PartnerType[] | null;
  campaigns?: CampaignType[] | null;
  videos?: VideoType[] | null;
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

export async function parseContentfulPage(
  pageEntry?: Entry<TypePageSkeleton>
): Promise<PageType | null> {
  if (!pageEntry) {
    return null;
  }

  const bannerImgField = pageEntry.fields.bannerImg;

  const bannerImg = bannerImgField
    ? parseContentfulContentImage(
        bannerImgField as
          | Asset<undefined, string>
          | { sys: AssetLink }
          | UnresolvedLink<'Asset'>
      )
    : null;

  const images = pageEntry.fields.images
    ? (pageEntry.fields.images as Asset[])
        .map((image) =>
          parseContentfulContentImage(image as Asset<undefined, string>)
        )
        .filter((image): image is ContentImage => image !== null)
    : [];

  const cards = pageEntry.fields.cards
    ? (pageEntry.fields.cards as Entry<TypeCardSkeleton>[])
        .map((cardEntry) => parseContentfulCard(cardEntry))
        .filter((card): card is CardType => card !== null)
    : [];

  const pressCards = pageEntry.fields.pressCards
    ? (pageEntry.fields.pressCards as Entry<TypeCardSkeleton>[])
        .map((cardEntry) => parseContentfulCard(cardEntry))
        .filter((card): card is CardType => card !== null)
    : [];

  const partners: PartnerType[] = pageEntry.fields?.partners
    ? await Promise.all(
        (pageEntry.fields.partners as Entry<TypePartnerSkeleton>[]).map(
          async (partnerEntry) => parseContentfulPartner(partnerEntry)
        )
      ).then((partners) =>
        partners.filter((partner): partner is PartnerType => partner !== null)
      )
    : [];

  const campaignsField = pageEntry.fields?.campaigns;
  const campaigns = Array.isArray(campaignsField)
    ? await Promise.all(
        campaignsField.map((campaign) =>
          parseContentfulCampaign(campaign as Entry<TypeCampaignSkeleton>)
        )
      )
    : null;

  const videosField = pageEntry.fields?.videos;
  const videos = Array.isArray(videosField)
    ? await Promise.all(
        videosField.map((video) =>
          parseContentfulVideo(video as Entry<TypeVideoSkeleton>)
        )
      )
    : null;

  return {
    id: pageEntry.sys.id,
    page: getFieldValue(pageEntry.fields.page),
    bannerTitle: getFieldValue(pageEntry.fields.bannerTitle),
    bannerImg,
    bannerSubtitle: getFieldValue(pageEntry.fields.bannerSubtitle),
    title: getFieldValue(pageEntry.fields.title),
    richText: getRichTextFieldValue(pageEntry.fields.richText),
    richTextTwo: getRichTextFieldValue(pageEntry.fields.richTextTwo),
    richTextThree: getRichTextFieldValue(pageEntry.fields.richTextThree),
    images: images.length ? images : null,
    cards: cards.length ? cards : null,
    pressCards: pressCards.length ? pressCards : null,
    partners: partners.length ? partners : null,
    campaigns:
      campaigns?.filter(
        (campaign): campaign is CampaignType => campaign !== null
      ) || null,
    videos:
      videos?.filter((video): video is VideoType => video !== null) || null,
  };
}

interface FetchOptions {
  preview: boolean;
  id?: string;
}

export async function fetchPages({
  preview,
}: FetchOptions): Promise<PageType[]> {
  const contentful = contentfulClient({ preview });

  const pagesResult = await contentful.getEntries<TypePageSkeleton>({
    content_type: 'page',
    include: 2,
    order: ['fields.page'],
  });

  return Promise.all(
    pagesResult.items.map(
      async (pageEntry) => (await parseContentfulPage(pageEntry)) as PageType
    )
  );
}

export async function fetchPage({
  id,
  preview,
}: FetchOptions): Promise<PageType | null> {
  const contentful = contentfulClient({ preview });

  const pagesResult = await contentful.getEntries<TypePageSkeleton>({
    content_type: 'page',
    'sys.id': id,
    include: 2,
  });

  return parseContentfulPage(pagesResult.items[0]);
}

export async function fetchPageByName({
  page,
  preview,
}: FetchOptions & { page: string }): Promise<PageType | null> {
  const contentful = contentfulClient({ preview });

  const pagesResult = await contentful.getEntries<TypePageSkeleton>({
    content_type: 'page',
    'fields.page': page,
    include: 2,
  });

  return parseContentfulPage(pagesResult.items[0]);
}
