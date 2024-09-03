import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful';

export interface TypeSocialMediaFields {
  name: EntryFieldTypes.Symbol;
  url?: EntryFieldTypes.Symbol;
}

export type TypeSocialMediaSkeleton = EntrySkeletonType<
  TypeSocialMediaFields,
  'socialMedia'
>;
export type TypeSocialMedia<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeSocialMediaSkeleton, Modifiers, Locales>;
