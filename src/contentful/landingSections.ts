import type { Entry } from 'contentful';
import { Document } from '@contentful/rich-text-types';
import {
  TypeLandingSectionSkeleton,
  TypeCardSkeleton,
  TypeVideoSkeleton,
} from './types';
import { Asset, UnresolvedLink, AssetLink } from 'contentful';
import contentfulClient from './contentfulClient';
import {
  ContentImage,
  parseContentfulContentImage,
} from './parseContentfulImage';
import { parseContentfulCard, CardType } from './cards';
import { parseContentfulVideo, VideoType } from './videos';

export interface LandingSectionType {
  title?: string;
  description?: string;
  backgroundImage?: ContentImage | null;
  section: string;
  cards?: CardType[];
  videos?: VideoType[];
  richDescription?: Document | null;
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

export function parseContentfulLandingSection(
  landingSectionEntry?: Entry<TypeLandingSectionSkeleton>
): LandingSectionType | null {
  if (!landingSectionEntry) {
    return null;
  }

  const backgroundImageField = landingSectionEntry.fields.backgroundImage;

  const backgroundImage = backgroundImageField
    ? parseContentfulContentImage(
        backgroundImageField as
          | Asset<undefined, string>
          | { sys: AssetLink }
          | UnresolvedLink<'Asset'>
      )
    : null;

  const cards: CardType[] = landingSectionEntry.fields.cards
    ? (landingSectionEntry.fields.cards as Entry<TypeCardSkeleton>[])
        .map((cardEntry) =>
          parseContentfulCard(cardEntry as Entry<TypeCardSkeleton>)
        )
        .filter((card): card is CardType => card !== null)
    : [];

  const videos: VideoType[] = landingSectionEntry.fields.videos
    ? (landingSectionEntry.fields.videos as Entry<TypeVideoSkeleton>[])
        .map((videoEntry) =>
          parseContentfulVideo(videoEntry as Entry<TypeVideoSkeleton>)
        )
        .filter((video): video is VideoType => video !== null)
    : [];

  return {
    title: getFieldValue(landingSectionEntry.fields.title),
    description: getFieldValue(landingSectionEntry.fields.description),
    backgroundImage,
    section: getFieldValue(landingSectionEntry.fields.section),
    cards,
    videos,
    richDescription: getRichTextFieldValue(
      landingSectionEntry.fields.richDescription
    ),
  };
}

interface FetchOptions {
  preview: boolean;
  id?: string;
}

export async function fetchLandingSections({
  preview,
}: FetchOptions): Promise<LandingSectionType[]> {
  const contentful = contentfulClient({ preview });

  const sectionsResult =
    await contentful.getEntries<TypeLandingSectionSkeleton>({
      content_type: 'landingSection',
      include: 2,
      order: ['fields.title'],
    });

  return sectionsResult.items.map(
    (sectionEntry) =>
      parseContentfulLandingSection(sectionEntry) as LandingSectionType
  );
}

export async function fetchLandingSection({
  id,
  preview,
}: FetchOptions): Promise<LandingSectionType | null> {
  const contentful = contentfulClient({ preview });

  const sectionsResult =
    await contentful.getEntries<TypeLandingSectionSkeleton>({
      content_type: 'landingSection',
      'sys.id': id,
      include: 2,
    });

  return parseContentfulLandingSection(sectionsResult.items[0]);
}
