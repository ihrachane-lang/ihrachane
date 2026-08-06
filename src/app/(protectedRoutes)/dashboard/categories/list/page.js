"use client";
import CategoriesDataTable from "@/components/dashboard/categories/CategoriesDataTable";
import { useRouter } from "next/navigation";

const CategoryListPage = () => {
  const router = useRouter();
  return (
    <div className='space-y-6'>
      <div className='bg-white rounded-lg shadow p-6'>
        <div className='flex justify-between items-center py-3 border-b mb-6'>
          <div>
            <h1 className='text-xl font-bold text-gray-800'>Dynamic Service Pages</h1>
            <p className='text-xs text-gray-500'>Create and manage custom service pages that appear in the public Navbar</p>
          </div>
          <button
            onClick={() => router.push("/dashboard/categories/list/create-new")}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-b from-[#19203c] via-[#3b3b5f] to-[#1e1e30] focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer">
            + Create New Dynamic Page
          </button>
        </div>
        <CategoriesDataTable />
      </div>
    </div>
  );
};

export default CategoryListPage;
