import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful';

export interface TypeCampaignFields {
  bannerTitle?: EntryFieldTypes.Symbol;
  bannerImage?: EntryFieldTypes.AssetLink;
  partner?: EntryFieldTypes.Symbol;
  date?: EntryFieldTypes.Date;
  subtitle?: EntryFieldTypes.Symbol;
  description?: EntryFieldTypes.RichText;
  gallery?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  finalText?: EntryFieldTypes.RichText;
  imageCaption?: EntryFieldTypes.Symbol;
  videos?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType>>;
  bannerColor?: EntryFieldTypes.Symbol;
  press?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType>>;
}

export type TypeCampaignSkeleton = EntrySkeletonType<
  TypeCampaignFields,
  'campaign'
>;
export type TypeCampaign<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeCampaignSkeleton, Modifiers, Locales>;
