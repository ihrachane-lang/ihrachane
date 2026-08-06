import Hero from "../shared/Hero";
import { getHomeHero } from "@/lib/data/public-data";
import { slugToTitle } from "@/lib/slug";

export default async function HomeHeroSection({ slug = "home" }) {
  const data = await getHomeHero(slug);

  return (
    <Hero
      img={data?.image}
      info={{
        span: slug === "home" ? "Global Sourcing Partner" : slugToTitle(slug),
        title: data?.title,
        details: data?.description,
      }}
    />
  );
}
