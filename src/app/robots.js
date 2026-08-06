import { SITE_URL } from "@/lib/seo/seo-utils";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/api/", "/login", "/register", "/reset-password", "/otp-verification"],
        crawlDelay: 1,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/dashboard/", "/api/", "/login", "/register", "/reset-password", "/otp-verification"],
      },
      {
        userAgent: "Yandex",
        allow: "/",
        disallow: ["/dashboard/", "/api/", "/login", "/register", "/reset-password", "/otp-verification"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/dashboard/", "/api/", "/login", "/register", "/reset-password", "/otp-verification"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
