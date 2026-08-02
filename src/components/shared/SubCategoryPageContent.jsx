import Hero from "./Hero";
import Breadcrumbs from "./Breadcrumbs";
import SubService from "./SubServices";
import { slugToTitle } from "@/lib/slug";

export default function SubCategoryPageContent({ data, slug }) {
  const breadcrumbItems = [];

  if (slug) {
    breadcrumbItems.push({
      label: slugToTitle(slug),
      href: `/home/${slug}`,
    });
  }

  if (data?.title) {
    breadcrumbItems.push({ label: data.title });
  }

  return (
    <>
      <Hero
        img={data?.bannerImg}
        info={{
          span: data?.span || undefined,
          title: data?.title || undefined,
          details: data?.description || undefined,
        }}
        secondaryHref="#services"
        secondaryLabel="View Solutions"
      />
      {breadcrumbItems.length > 0 && (
        <div className="border-b border-orange-100/60 bg-white/90 backdrop-blur-sm">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      )}
      {data?.subCategoryServices?.length > 0 && (
        <SubService services={data.subCategoryServices} />
      )}
    </>
  );
}
