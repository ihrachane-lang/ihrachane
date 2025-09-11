import cloudinary from "@/lib/cloudinary";

export async function uploadToCloudinary(file, folder = "categories") {
  if (!file || file.size === 0) return null;

  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
}
