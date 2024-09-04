import type { Entry } from 'contentful';
import contentfulClient from './contentfulClient';
import type { TypeSocialMediaSkeleton } from './types';

export interface SocialMediaType {
  name: string;
  url?: string;
}

interface FetchOptions {
  preview?: boolean;
  id?: string;
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

export function parseContentfulSocialMedia(
  socialMediaEntry?: Entry<TypeSocialMediaSkeleton>
): SocialMediaType | null {
  if (!socialMediaEntry) {
    return null;
  }

  return {
    name: getFieldValue(socialMediaEntry.fields.name),
    url: getFieldValue(socialMediaEntry.fields.url),
  };
}

export async function fetchSocialMedia({
  preview,
}: FetchOptions): Promise<SocialMediaType[]> {
  const contentful = contentfulClient({ preview });

  const socialMediaResult =
    await contentful.getEntries<TypeSocialMediaSkeleton>({
      content_type: 'socialMedia',
      include: 1,
    });

  return socialMediaResult.items.map(
    (item) => parseContentfulSocialMedia(item) as SocialMediaType
  );
}
