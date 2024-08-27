import { Asset, AssetLink, UnresolvedLink } from "contentful";

function getAssetUrl(
  field?:
    | Asset<undefined, string>
    | UnresolvedLink<"Asset">
    | {
        [key: string]:
          | Asset<undefined, string>
          | UnresolvedLink<"Asset">
          | undefined;
      }
): string {
  if (!field) {
    return "";
  }

  if ("sys" in field && "fields" in field) {
    const asset = field as Asset<undefined, string>;
    const file = asset.fields.file;
    return file && typeof file.url === "string" ? file.url : "";
  } else if ("sys" in field && "linkType" in field) {
    return "";
  } else if (typeof field === "object") {
    const urls = Object.values(field).map(getAssetUrl);
    return urls.find((url) => url !== "") || "";
  }

  return "";
}

export interface ContentImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export function parseContentfulContentImage(
  asset?:
    | Asset<undefined, string>
    | { sys: AssetLink }
    | UnresolvedLink<"Asset">
): ContentImage | null {
  if (!asset) {
    return null;
  }

  if ("fields" in asset) {
    const file = asset.fields.file;

    const description = asset.fields.description;
    const alt = typeof description === "string" ? description : "";

    return {
      src: getAssetUrl(asset),
      alt,
      width: file?.details?.image?.width ?? 0,
      height: file?.details?.image?.height ?? 0,
    };
  } else if ("sys" in asset && asset.sys.linkType === "Asset") {
    return null;
  } else if (typeof asset === "object") {
    const images = Object.values(asset).map((field) =>
      parseContentfulContentImage(
        field as unknown as
          | Asset<undefined, string>
          | { sys: AssetLink }
          | UnresolvedLink<"Asset">
      )
    );
    return images.find((image) => image !== null) || null;
  }

  return null;
}
