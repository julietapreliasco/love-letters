import type { Entry } from 'contentful';
import contentfulClient from './contentfulClient';
import type { TypeFooterSkeleton, TypeSocialMediaSkeleton } from './types';
import { SocialMediaType } from './socialMedia';

export interface FooterType {
  description?: string;
  socialMedia?: SocialMediaType[];
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

export function parseContentfulFooter(
  footerEntry?: Entry<TypeFooterSkeleton>
): FooterType | null {
  if (!footerEntry) {
    return null;
  }

  const socialMedia: SocialMediaType[] = footerEntry.fields.socialMedia
    ? (footerEntry.fields.socialMedia as Entry<TypeSocialMediaSkeleton>[]).map(
        (socialMediaEntry) => ({
          name: getFieldValue(socialMediaEntry.fields.name),
          url: getFieldValue(socialMediaEntry.fields.url) || undefined,
        })
      )
    : [];

  return {
    description: getFieldValue(footerEntry.fields.description),
    socialMedia,
  };
}

export async function fetchFooter({
  preview,
}: FetchOptions): Promise<FooterType | null> {
  const contentful = contentfulClient({ preview });

  const footerResult = await contentful.getEntries<TypeFooterSkeleton>({
    content_type: 'footer',
    include: 2,
  });

  return parseContentfulFooter(footerResult.items[0]);
}
