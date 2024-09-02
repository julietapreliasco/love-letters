export const extractVideoId = (url: string): string | null => {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/
  );
  return match ? match[1] : null;
};
