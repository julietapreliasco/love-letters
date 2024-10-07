import { Asset, Entry, UnresolvedLink, AssetLink } from 'contentful';
import { TypePartnerSkeleton } from './types';
import contentfulClient from './contentfulClient';
import {
  ContentImage,
  parseContentfulContentImage,
} from './parseContentfulImage';

interface FetchOptions {
  preview: boolean;
  id?: string;
}

export interface PartnerType {
  id: string;
  name: string;
  shortDescription?: string;
  photo: ContentImage | null;
  description?: string;
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

export async function parseContentfulPartner(
  partnerEntry?: Entry<TypePartnerSkeleton>
): Promise<PartnerType | null> {
  if (!partnerEntry) {
    return null;
  }

  const fields = partnerEntry.fields;

  const photoField = fields?.photo;
  const photo = photoField
    ? parseContentfulContentImage(
        photoField as
          | Asset<undefined, string>
          | { sys: AssetLink }
          | UnresolvedLink<'Asset'>
      )
    : null;

  return {
    id: partnerEntry.sys.id,
    name: getFieldValue(fields?.name),
    shortDescription: getFieldValue(fields?.shortDescription),
    photo,
    description: getFieldValue(fields?.description),
  };
}

export async function fetchPartners({
  preview,
}: FetchOptions): Promise<PartnerType[]> {
  const contentful = contentfulClient({ preview });

  const partnersResult = await contentful.getEntries<TypePartnerSkeleton>({
    content_type: 'partner',
    include: 1,
  });

  return Promise.all(
    partnersResult.items.map(
      async (partnerEntry) =>
        (await parseContentfulPartner(partnerEntry)) as PartnerType
    )
  );
}

export async function fetchPartner({
  id,
  preview,
}: FetchOptions): Promise<PartnerType | null> {
  const contentful = contentfulClient({ preview });

  const partnerResult = await contentful.getEntries<TypePartnerSkeleton>({
    content_type: 'partner',
    'sys.id': id,
    include: 1,
  });

  return parseContentfulPartner(partnerResult.items[0]);
}
