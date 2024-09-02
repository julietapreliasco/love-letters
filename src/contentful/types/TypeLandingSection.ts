import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful';

export interface TypeLandingSectionFields {
  title?: EntryFieldTypes.Symbol;
  description?: EntryFieldTypes.Text;
  backgroundImage?: EntryFieldTypes.AssetLink;
  section: EntryFieldTypes.Symbol;
  cards?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType>>;
  videos?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType>>;
  richDescription?: EntryFieldTypes.RichText;
}

export type TypeLandingSectionSkeleton = EntrySkeletonType<
  TypeLandingSectionFields,
  'landingSection'
>;
export type TypeLandingSection<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeLandingSectionSkeleton, Modifiers, Locales>;
