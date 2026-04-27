import { BaseUrl, ImageUrl } from "@/controller/common";
import axios from "axios";

export async function getActivity() {
  try {
    const response = await axios.get(
      `${BaseUrl}/api/service/rest/utility/getAllActivities`
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching activity data:", error);
    return [];
  }
}

export async function getVendors(slug) {
  try {
    const response = await axios.get(
      `${ImageUrl}/api/service/rest/vendor/getVendorsBySlug?offset=0&limit=1&vendorSlug=${slug}&status=ACTIVE`
    );    
    const data = response.data;

    return data;
  } catch (error) {
    console.error("Error fetching activity data:", error);
    return [];
  }
}
export async function getVendorImage(VendorId) {
  try {
    const response = await axios.get(
      `${ImageUrl}/api/service/rest/photos/getVendorImageByKey?vendorId=${VendorId}`
    );
    console.log("response", response);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching vendor image:", error);
    return [];
  }
}

export async function getVendorGalleryImage(imageKey) {
  try {
    const response = await axios.get(
      `${ImageUrl}/api/service/rest/photos/getVendorGalleryImagesByKey?KEY=${imageKey}`
    );
    console.log("response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching gallery image:",
      error.message,
      error.response?.data
    );
    return null;
  }
}

export default function Layout({ children }) {
  return <>{children}</>;
}
