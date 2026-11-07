import apiClient from "./apiClient";

export async function deleteUnattachedProductImage(imageUrl) {
  if (!imageUrl) {
    return;
  }
  await apiClient.delete("/sanpham/upload-image", {
    params: { url: imageUrl },
  });
}
