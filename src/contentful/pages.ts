import type { Entry } from 'contentful';
import { Document } from '@contentful/rich-text-types';
import { TypePageSkeleton, TypePage, TypeCardSkeleton } from './types';
import { Asset, UnresolvedLink, AssetLink } from 'contentful';
import contentfulClient from './contentfulClient';
import {
  ContentImage,
  parseContentfulContentImage,
} from './parseContentfulImage';
import { CardType, parseContentfulCard } from './cards';

export interface PageType {
  id: string;
  page: string;
  bannerTitle?: string;
  bannerImg?: ContentImage | null;
  subtitle?: string;
  description?: Document | null;
  images?: ContentImage[] | null;
  projectCards?: CardType[] | null;
  pressCards?: CardType[] | null;
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

export function parseContentfulPage(
  pageEntry?: Entry<TypePageSkeleton>
): PageType | null {
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

  const projectCards = pageEntry.fields.projectCards
    ? (pageEntry.fields.projectCards as Entry<TypeCardSkeleton>[])
        .map((cardEntry) =>
          parseContentfulCard(cardEntry as Entry<TypeCardSkeleton>)
        )
        .filter((card): card is CardType => card !== null)
    : [];

  const pressCards = pageEntry.fields.pressCards
    ? (pageEntry.fields.pressCards as Entry<TypeCardSkeleton>[])
        .map((cardEntry) =>
          parseContentfulCard(cardEntry as Entry<TypeCardSkeleton>)
        )
        .filter((card): card is CardType => card !== null)
    : [];

  return {
    id: pageEntry.sys.id,
    page: getFieldValue(pageEntry.fields.page),
    bannerTitle: getFieldValue(pageEntry.fields.bannerTitle),
    bannerImg,
    subtitle: getFieldValue(pageEntry.fields.subtitle),
    description: getRichTextFieldValue(pageEntry.fields.description),
    images: images.length ? images : null,
    projectCards: projectCards.length ? projectCards : null,
    pressCards: pressCards.length ? pressCards : null,
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

  return pagesResult.items.map(
    (pageEntry) => parseContentfulPage(pageEntry) as PageType
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
