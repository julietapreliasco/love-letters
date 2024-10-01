import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful';
import type { TypeCampaignSkeleton } from './TypeCampaign';
import type { TypeVideoSkeleton } from './TypeVideo';

export interface TypePlaceFields {
  title: EntryFieldTypes.Symbol;
  backgroundImage: EntryFieldTypes.AssetLink;
  campaigns?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeCampaignSkeleton>
  >;
  description?: EntryFieldTypes.RichText;
  trailer?: EntryFieldTypes.EntryLink<TypeVideoSkeleton>;
}

export type TypePlaceSkeleton = EntrySkeletonType<TypePlaceFields, 'place'>;
export type TypePlace<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypePlaceSkeleton, Modifiers, Locales>;
