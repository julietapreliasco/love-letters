import { Asset, Entry, UnresolvedLink } from 'contentful';
import { TypeExternalLinkSkeleton } from './types';
import {
  ContentImage,
  parseContentfulContentImage,
} from './parseContentfulImage';

export interface ExternalLinkType {
  id: string;
  title: string;
  shortDescription?: string;
  link: string;
  image?: ContentImage | null;
}

function getFieldValue(
  field?: string | { [key: string]: string | undefined } | null
): string | undefined {
  if (typeof field === 'string') {
    return field;
  } else if (field && typeof field === 'object') {
    return Object.values(field)[0];
  }
  return undefined;
}

export function parseContentfulExternalLink(
  externalLinkEntry?: Entry<TypeExternalLinkSkeleton>
): ExternalLinkType | null {
  if (!externalLinkEntry) return null;

  const fields = externalLinkEntry.fields;

  const title = getFieldValue(fields.title);
  const shortDescription = getFieldValue(fields.shortDescription);
  const link = getFieldValue(fields.link);

  let image: ContentImage | null = null;
  if (fields.image) {
    const imageField = fields.image as
      | UnresolvedLink<'Asset'>
      | Asset<undefined, string>;
    image = parseContentfulContentImage(imageField);
  }

  if (!title || !link) {
    return null;
  }

  return {
    id: externalLinkEntry.sys.id,
    title,
    shortDescription,
    link,
    image,
  };
}
