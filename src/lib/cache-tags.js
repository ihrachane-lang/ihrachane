export const CACHE_TAGS = {
  categories: "categories",
  categoryNames: "category-names",
  subCategories: "sub-categories",
  testimonials: "testimonials",
  clients: "clients",
  partners: "partners",
  services: "services",
  homeHero: "home-hero",
  companyDetails: "company-details",
  socialLinks: "social-links",
};

export function categoryTag(slug) {
  return `category-${slug}`;
}

export function subCategoryTag(id) {
  return `sub-category-${id}`;
}

export function homeHeroTag(slug) {
  return `home-hero-${slug}`;
}
