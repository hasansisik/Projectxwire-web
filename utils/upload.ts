import axios from "axios";
import { server } from "@/config";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "gsgj4yt8";
const API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || "239216714229172";

/**
 * Uploads a file via backend multer endpoint to Cloudinary
 * Fallback to direct Cloudinary unsigned/preset upload if backend endpoint is unavailable
 */
export const uploadFileToCloudinary = async (
  file: File,
  folder: string = "projectxwire"
): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      `${server}/upload?folder=${encodeURIComponent(folder)}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data && response.data.url) {
      return response.data.url;
    }
    throw new Error(response.data?.message || "Upload failed");
  } catch (backendError: any) {
    console.warn("Backend upload error, trying direct Cloudinary upload...", backendError?.message);

    // Fallback direct upload to Cloudinary
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");
      formData.append("folder", folder);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.secure_url) {
        return data.secure_url;
      }
    } catch (directError) {
      console.error("Direct Cloudinary upload failed too:", directError);
    }

    throw backendError;
  }
};
