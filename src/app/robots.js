export default function robots() {
  const baseUrl = "https://www.ihrachane.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/",
          "/dashboard/*",
          "/api/",
          "/api/*",
          "/login",
          "/register",
          "/reset-password",
          "/otp-verification",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/dashboard/",
          "/dashboard/*",
          "/api/",
          "/api/*",
          "/login",
          "/register",
          "/reset-password",
          "/otp-verification",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
