import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful';

export interface TypeCardFields {
  title?: EntryFieldTypes.Symbol;
  subtitle?: EntryFieldTypes.Symbol;
  description?: EntryFieldTypes.Text;
  image?: EntryFieldTypes.AssetLink;
  section: EntryFieldTypes.Symbol;
  url?: EntryFieldTypes.Symbol;
}

export type TypeCardSkeleton = EntrySkeletonType<TypeCardFields, 'card'>;
export type TypeCard<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeCardSkeleton, Modifiers, Locales>;
