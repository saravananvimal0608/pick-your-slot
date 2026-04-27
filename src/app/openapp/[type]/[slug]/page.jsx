"use client";
import React, { useEffect } from "react";
import CryptoJS from "crypto-js";

export default function Page({ params }) {
  const { type, slug } = params;
  useEffect(() => {
    if (typeof window === "undefined") return;

    const getMobileOS = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;

      if (/android/i.test(userAgent)) {
        return "Android";
      }

      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
      }

      return "Other";
    };
    const os = getMobileOS();

    //Dont change the secretKey if you change in web also change in mobile app and admin web
    const secretKey = "tamilagavettrikazhagam";
    const encryptedParam = params?.slug;

    const decodedCiphertext = decodeURIComponent(encryptedParam);

    const bytes = CryptoJS.AES.decrypt(decodedCiphertext, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    if (originalText && originalText !== "undefined") {
      const appDeepLink =
        type === "Vendor"
          ? `pickyourslot://${type}/${originalText}/1`
          : `pickyourslot://${type}/${originalText}`;
      const fallbackLink =
        os === "Android"
          ? "https://play.google.com/store/apps/details?id=com.pyscustomer"
          : os === "iOS"
          ? "https://apps.apple.com/in/app/pick-your-slot/id1614806838"
          : "https://pickyourslot.com";

      window.location.href = appDeepLink;

      setTimeout(() => {
        window.location.href = fallbackLink;
      }, 3000);
    } else {
      window.location.href = "https://pickyourslot.com";
    }
  }, [slug]);

  return null;
}
