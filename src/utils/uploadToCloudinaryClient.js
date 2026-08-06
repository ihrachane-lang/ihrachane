/**
 * Upload file directly to Cloudinary (Frontend side)
 * @param {File} file - File object (from input type="file")
 * @param {string} uploadPreset - Cloudinary unsigned preset name
 * @param {string} cloudName - Cloudinary cloud name
 * @returns {Promise<string>} - Returns uploaded image secure URL
 */
export async function uploadToCloudinaryClient(file) {
  if (!file) throw new Error("No file provided!");

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET_NAME;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary cloud name or upload preset is missing in .env variables!");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("❌ Cloudinary upload error payload:", data);
    throw new Error(data?.error?.message || "Cloudinary upload failed!");
  }

  return data.secure_url; // uploaded image URL
}
