import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful';

export interface TypeExternalLinkFields {
  title: EntryFieldTypes.Symbol;
  shortDescription?: EntryFieldTypes.Symbol;
  link: EntryFieldTypes.Symbol;
  image?: EntryFieldTypes.AssetLink;
}

export type TypeExternalLinkSkeleton = EntrySkeletonType<
  TypeExternalLinkFields,
  'externalLink'
>;
export type TypeExternalLink<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeExternalLinkSkeleton, Modifiers, Locales>;
