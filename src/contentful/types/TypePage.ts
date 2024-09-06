import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful';

export interface TypePageFields {
  page: EntryFieldTypes.Symbol;
  bannerTitle?: EntryFieldTypes.Symbol;
  bannerImg?: EntryFieldTypes.AssetLink;
  bannerDescription?: EntryFieldTypes.Text;
  description?: EntryFieldTypes.RichText;
  images?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  projectCards?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<EntrySkeletonType>
  >;
  pressCards?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<EntrySkeletonType>
  >;
}

export type TypePageSkeleton = EntrySkeletonType<TypePageFields, 'page'>;
export type TypePage<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypePageSkeleton, Modifiers, Locales>;
