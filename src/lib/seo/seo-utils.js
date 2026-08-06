export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.ihrachane.com";

export const BRAND_NAME = "IHRACHANE";

export const TWITTER_HANDLE = "@ihrachane";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo/siteLogo/logo.svg`;

export function clampTitle(title, fallback) {
  const base = (title || fallback || "").trim();
  if (!base) return `${BRAND_NAME}`;
  const suffix = ` | ${BRAND_NAME}`;
  const max = 60;
  if (base.length + suffix.length <= max) return `${base}${suffix}`;
  return base.slice(0, max - 3) + "...";
}

export function clampDescription(description, fallback) {
  const base = (description || fallback || "").replace(/\s+/g, " ").trim();
  if (!base) return "";
  const max = 160;
  if (base.length <= max) return base;
  return base.slice(0, max - 3) + "...";
}

export function buildOgImages(primaryUrl, alt) {
  const url = primaryUrl || DEFAULT_OG_IMAGE;
  if (!url) return undefined;
  const absoluteUrl = url.startsWith("http") ? url : `${SITE_URL}${url}`;
  return [
    {
      url: absoluteUrl,
      width: 1200,
      height: 630,
      alt: alt ? `${alt} | ${BRAND_NAME}` : `${BRAND_NAME}`,
      type: url.toLowerCase().endsWith(".svg") ? "image/svg+xml" : undefined,
    },
  ];
}

export function absoluteUrl(path = "/") {
  if (!path) return SITE_URL;
  if (path.startsWith("http")) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean}`;
}

export async function warmupPublicRoute(...paths) {
  if (!process.env.NEXT_PUBLIC_SITE_URL) return;
  const urls = paths
    .map((p) => absoluteUrl(p))
    .filter(Boolean);
  const tasks = urls.map(async (url) => {
    try {
      await fetch(url, {
        method: "HEAD",
        next: { revalidate: 0 },
        signal: AbortSignal.timeout(3000),
      });
    } catch (_err) {
      // swallow — best effort pre-render warmup
    }
  });
  await Promise.all(tasks);
}

export async function pingGoogleSitemap() {
  try {
    await fetch(
      `https://www.google.com/ping?sitemap=${encodeURIComponent(
        `${SITE_URL}/sitemap.xml`
      )}`,
      {
        method: "GET",
        signal: AbortSignal.timeout(3000),
      }
    );
  } catch (_err) {
    // silent — non-critical
  }
}
