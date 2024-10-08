import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful';
import { TypePartnerSkeleton } from './TypePartner';

export interface TypePageFields {
  page: EntryFieldTypes.Symbol;
  bannerTitle?: EntryFieldTypes.Symbol;
  bannerImg?: EntryFieldTypes.AssetLink;
  subtitle?: EntryFieldTypes.Text;
  description?: EntryFieldTypes.RichText;
  images?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  projectCards?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<EntrySkeletonType>
  >;
  pressCards?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<EntrySkeletonType>
  >;
  partners?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypePartnerSkeleton>
  >;
}

export type TypePageSkeleton = EntrySkeletonType<TypePageFields, 'page'>;
export type TypePage<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypePageSkeleton, Modifiers, Locales>;
