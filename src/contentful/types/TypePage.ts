import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful';
import type { TypeCampaignSkeleton } from './TypeCampaign';
import type { TypePartnerSkeleton } from './TypePartner';
import type { TypeVideoSkeleton } from './TypeVideo';

export interface TypePageFields {
  page: EntryFieldTypes.Symbol;
  bannerTitle?: EntryFieldTypes.Symbol;
  bannerImg?: EntryFieldTypes.AssetLink;
  bannerSubtitle?: EntryFieldTypes.Symbol;
  title?: EntryFieldTypes.Text;
  richText?: EntryFieldTypes.RichText;
  richTextTwo?: EntryFieldTypes.RichText;
  richTextThree?: EntryFieldTypes.RichText;
  images?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  cards?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType>>;
  pressCards?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<EntrySkeletonType>
  >;
  partners?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypePartnerSkeleton>
  >;
  campaigns?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeCampaignSkeleton>
  >;
  videos?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeVideoSkeleton>>;
}

export type TypePageSkeleton = EntrySkeletonType<TypePageFields, 'page'>;
export type TypePage<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypePageSkeleton, Modifiers, Locales>;
