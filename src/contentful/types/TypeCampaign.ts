import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful';
import type { TypeExternalLinkSkeleton } from './TypeExternalLink';
import type { TypePartnerSkeleton } from './TypePartner';

export interface TypeCampaignFields {
  bannerTitle?: EntryFieldTypes.Symbol;
  bannerImage?: EntryFieldTypes.AssetLink;
  date?: EntryFieldTypes.Date;
  subtitle?: EntryFieldTypes.Symbol;
  description?: EntryFieldTypes.RichText;
  gallery?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  finalText?: EntryFieldTypes.RichText;
  imageCaption?: EntryFieldTypes.Symbol;
  videos?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType>>;
  bannerColor?: EntryFieldTypes.Symbol;
  press?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType>>;
  videoCaption?: EntryFieldTypes.Symbol;
  videosTitle?: EntryFieldTypes.Symbol;
  isHighlighted?: EntryFieldTypes.Boolean;
  partner?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypePartnerSkeleton>
  >;
  externalLinks?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeExternalLinkSkeleton>
  >;
  variant?: EntryFieldTypes.Symbol;
}

export type TypeCampaignSkeleton = EntrySkeletonType<
  TypeCampaignFields,
  'campaign'
>;
export type TypeCampaign<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeCampaignSkeleton, Modifiers, Locales>;
