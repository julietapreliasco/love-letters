import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful';

export interface TypeVideoFields {
  title?: EntryFieldTypes.Symbol;
  videoUrl: EntryFieldTypes.Symbol;
  section: EntryFieldTypes.Symbol;
  thumbnail?: EntryFieldTypes.AssetLink;
}

export type TypeVideoSkeleton = EntrySkeletonType<TypeVideoFields, 'video'>;
export type TypeVideo<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeVideoSkeleton, Modifiers, Locales>;
