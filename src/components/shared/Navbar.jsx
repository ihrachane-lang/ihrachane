// components/Navbar.jsx
import dbConnect from "@/lib/mongodb";
import NavbarClient from "./NavbarClient";
import Category from "@/models/Category";

const staticMenus = [
  { url: "/", path: "Home" },
  { url: "/shipping-partners", path: "SHIPPING PARTNERS" },
];

const fetchCategories = async () => {
  try {
    await dbConnect();
    const categories = await Category.find({}, { name: 1, _id: 0 }).lean();
    if (!categories) {
      return [];
    }
    return categories.map((cat) => ({
      url: `/home/${cat.name.toLowerCase().replace(/\s+/g, "-")}`,
      path: cat.name,
    }));
  } catch {
    return [];
  }
};

export default async function Navbar() {
  const categories = await fetchCategories();
  const menus = [...staticMenus, ...categories];

  // Pass menus to client component
  return <NavbarClient menus={menus} />;
}
