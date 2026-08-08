import NavbarClient from "./NavbarClient";
import { getCategoryNames } from "@/lib/data/public-data";

const staticMenus = [
  { url: "/", path: "Home" },
  { url: "/shipping-partners", path: "Shipping Partners" },
  { url: "/blog", path: "Blog" },
];

export default async function Navbar() {
  const categories = await getCategoryNames();
  const categoryMenus = categories.map((cat) => ({
    url: `/${cat.slug || cat.name.toLowerCase().replace(/\s+/g, "-")}`,
    path: cat.name,
  }));
  const menus = [...staticMenus, ...categoryMenus];

  return <NavbarClient menus={menus} />;
}
