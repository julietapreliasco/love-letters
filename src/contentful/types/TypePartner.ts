import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful';

export interface TypePartnerFields {
  name: EntryFieldTypes.Symbol;
  shortDescription?: EntryFieldTypes.Symbol;
  photo: EntryFieldTypes.AssetLink;
  description?: EntryFieldTypes.Text;
}

export type TypePartnerSkeleton = EntrySkeletonType<
  TypePartnerFields,
  'partner'
>;
export type TypePartner<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypePartnerSkeleton, Modifiers, Locales>;
