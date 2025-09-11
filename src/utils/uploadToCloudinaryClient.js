/**
 * Upload file directly to Cloudinary (Frontend side)
 * @param {File} file - File object (from input type="file")
 * @param {string} uploadPreset - Cloudinary unsigned preset name
 * @param {string} cloudName - Cloudinary cloud name
 * @returns {Promise<string>} - Returns uploaded image secure URL
 */
export async function uploadToCloudinaryClient(file) {
  if (!file) throw new Error("No file provided!");

  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET_NAME
  );

  // console.log(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Cloudinary upload failed!");
  }

  const data = await response.json();
  return data.secure_url; // uploaded image URL
}
