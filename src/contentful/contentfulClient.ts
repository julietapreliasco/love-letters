import { createClient } from "contentful";

const {
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_PREVIEW_ACCESS_TOKEN,
} = process.env;

if (!CONTENTFUL_SPACE_ID) {
  throw new Error(
    "CONTENTFUL_SPACE_ID is not defined in environment variables."
  );
}
if (!CONTENTFUL_ACCESS_TOKEN) {
  throw new Error(
    "CONTENTFUL_ACCESS_TOKEN is not defined in environment variables."
  );
}
if (!CONTENTFUL_PREVIEW_ACCESS_TOKEN) {
  throw new Error(
    "CONTENTFUL_PREVIEW_ACCESS_TOKEN is not defined in environment variables."
  );
}

const client = createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
});

const previewClient = createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  host: "preview.contentful.com",
});

export default function contentfulClient({ preview = false }) {
  return preview ? previewClient : client;
}
