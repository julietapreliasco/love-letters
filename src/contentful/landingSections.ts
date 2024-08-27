import { TypeLandingSectionSkeleton } from "./types";
import { Entry, Asset, UnresolvedLink, AssetLink } from "contentful";
import contentfulClient from "./contentfulClient";
import {
  ContentImage,
  parseContentfulContentImage,
} from "./parseContentfulImage";

export interface LandingSectionType {
  title: string;
  description: string;
  backgroundImage?: ContentImage | null;
  section: string;
}

function getFieldValue(
  field?: string | { [key: string]: string | undefined }
): string {
  if (typeof field === "string") {
    return field;
  } else if (field && typeof field === "object") {
    return Object.values(field)[0] || "";
  }
  return "";
}

export function parseContentfulLandingSection(
  landingSectionEntry?: Entry<TypeLandingSectionSkeleton>
): LandingSectionType | null {
  if (!landingSectionEntry) {
    return null;
  }

  const backgroundImageField = landingSectionEntry.fields.backgroundImage;

  const backgroundImage = backgroundImageField
    ? parseContentfulContentImage(
        backgroundImageField as
          | Asset<undefined, string>
          | { sys: AssetLink }
          | UnresolvedLink<"Asset">
      )
    : null;

  return {
    title: getFieldValue(landingSectionEntry.fields.title),
    description: getFieldValue(landingSectionEntry.fields.description),
    backgroundImage,
    section: getFieldValue(landingSectionEntry.fields.section),
  };
}

interface FetchOptions {
  preview: boolean;
  id?: string;
}

export async function fetchLandingSections({
  preview,
}: FetchOptions): Promise<LandingSectionType[]> {
  const contentful = contentfulClient({ preview });

  const sectionsResult = await contentful.getEntries<TypeLandingSectionSkeleton>({
    content_type: "landingSection",
    include: 2,
    order: ["fields.title"],
  });

  return sectionsResult.items.map(
    (sectionEntry) => parseContentfulLandingSection(sectionEntry) as LandingSectionType
  );
}

export async function fetchLandingSection({
  id,
  preview,
}: FetchOptions): Promise<LandingSectionType | null> {
  const contentful = contentfulClient({ preview });

  const sectionsResult = await contentful.getEntries<TypeLandingSectionSkeleton>({
    content_type: "landingSection",
    "sys.id": id,
    include: 2,
  });

  return parseContentfulLandingSection(sectionsResult.items[0]);
}
