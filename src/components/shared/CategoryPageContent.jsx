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
      <div className="border-b border-[#E2E8F0] bg-white">
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
