import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful';
import type { TypeCampaignSkeleton } from './TypeCampaign';
import type { TypeCardSkeleton } from './TypeCard';
import type { TypeExternalLinkSkeleton } from './TypeExternalLink';
import type { TypeVideoSkeleton } from './TypeVideo';

export interface TypePlaceFields {
  title: EntryFieldTypes.Symbol;
  subtitle?: EntryFieldTypes.Symbol;
  backgroundImage: EntryFieldTypes.AssetLink;
  campaigns?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeCampaignSkeleton>
  >;
  description?: EntryFieldTypes.RichText;
  trailer?: EntryFieldTypes.EntryLink<TypeVideoSkeleton>;
  press?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCardSkeleton>>;
  location: EntryFieldTypes.Location;
  externalLinks?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeExternalLinkSkeleton>
  >;
  isComingNext: EntryFieldTypes.Boolean;
}

export type TypePlaceSkeleton = EntrySkeletonType<TypePlaceFields, 'place'>;
export type TypePlace<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypePlaceSkeleton, Modifiers, Locales>;
