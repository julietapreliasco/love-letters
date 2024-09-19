import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
  UnresolvedLink,
  AssetLink,
  Asset,
} from 'contentful';
import contentfulClient from './contentfulClient';
import {
  ContentImage,
  parseContentfulContentImage,
} from './parseContentfulImage';

export interface TypeVideoFields {
  title?: EntryFieldTypes.Symbol;
  videoUrl: EntryFieldTypes.Symbol;
  section: EntryFieldTypes.Symbol;
  thumbnail?: EntryFieldTypes.AssetLink;
}

export type TypeVideoSkeleton = EntrySkeletonType<TypeVideoFields, 'video'>;
export type TypeVideo<
  Modifiers extends ChainModifiers = ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeVideoSkeleton, Modifiers, Locales>;

export interface VideoType {
  title?: string;
  videoUrl: string;
  section: string;
  thumbnail?: ContentImage | null;
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

export function parseContentfulVideo(videoEntry?: TypeVideo): VideoType | null {
  if (!videoEntry) {
    return null;
  }

  const thumbnailField = videoEntry?.fields?.thumbnail;
  const thumbnail = thumbnailField
    ? parseContentfulContentImage(
        thumbnailField as
          | Asset<undefined, string>
          | { sys: AssetLink }
          | UnresolvedLink<'Asset'>
      )
    : null;
  return {
    title: getFieldValue(videoEntry?.fields?.title),
    videoUrl: getFieldValue(videoEntry?.fields?.videoUrl),
    section: getFieldValue(videoEntry?.fields?.section),
    thumbnail,
  };
}

interface FetchVideoOptions {
  preview: boolean;
  id?: string;
}

export async function fetchVideos({
  preview,
}: FetchVideoOptions): Promise<VideoType[]> {
  const contentful = contentfulClient({ preview });

  const videosResult = await contentful.getEntries<TypeVideoSkeleton>({
    content_type: 'video',
    include: 2,
    order: ['fields.title'],
  });

  return videosResult.items.map(
    (videoEntry) => parseContentfulVideo(videoEntry) as VideoType
  );
}

export async function fetchVideo({
  id,
  preview,
}: FetchVideoOptions): Promise<VideoType | null> {
  const contentful = contentfulClient({ preview });

  const videosResult = await contentful.getEntries<TypeVideoSkeleton>({
    content_type: 'video',
    'sys.id': id,
    include: 2,
  });

  return parseContentfulVideo(videosResult.items[0]);
}
