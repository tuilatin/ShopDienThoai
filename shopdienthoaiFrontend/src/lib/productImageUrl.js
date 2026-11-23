const API_ORIGIN = new URL(import.meta.env.VITE_API_BASE_URL).origin;

export function getProductImageUrl(image) {
  if (!image) return "";

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  const filename = image.replace(/^\/+/, "");
  return `${API_ORIGIN}/uploads/${filename}`;
}
