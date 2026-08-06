import Hero from "./Hero";
import Breadcrumbs from "./Breadcrumbs";
import Service from "../sourcing/Service";
import { slugToTitle } from "@/lib/slug";

export default function CategoryPageContent({ data, slug }) {
  const categoryName =
    data?.mainBannerHeader || slugToTitle(slug);

  return (
    <>
      <Hero
        img={data?.bannerImg}
        info={{
          span: data?.mainBannerSpan,
          title: data?.mainBannerHeader,
          details: data?.mainBannerDescription,
        }}
        secondaryHref="#categories"
        secondaryLabel="Browse Categories"
      />
      <div className="border-b border-orange-100/60 bg-white/90 backdrop-blur-sm">
        <Breadcrumbs items={[{ label: categoryName }]} />
      </div>
      {data?.subCategories?.length > 0 && (
        <Service
          subCategories={data.subCategories}
          contentSideImg={data?.contentSideImg}
          slug={slug}
        />
      )}
    </>
  );
}
