"use client";
import SubCategoriesDataTable from "@/components/dashboard/categories/SubCategoriesDataTable";
import { useRouter } from "next/navigation";

const SubCategoryPageList = () => {
  const router = useRouter();
  return (
    <div className='space-y-6'>
      <div className='bg-white rounded-lg shadow p-6'>
        <div className='flex justify-between items-center py-3 border-b mb-6'>
          <div>
            <h1 className='text-xl font-bold text-gray-800'>Page Sub-Categories (Page Sections)</h1>
            <p className='text-xs text-gray-500'>Manage sub-category sections assigned under custom dynamic pages</p>
          </div>
          <button
            onClick={() =>
              router.push("/dashboard/categories/sub-list/create-new")
            }
            className='text-sm bg-gradient-to-b from-[#19203c] via-[#3b3b5f] to-[#1e1e30] text-white font-semibold px-4 py-2 rounded-lg cursor-pointer'>
            + Add Page Sub-Category
          </button>
        </div>
        <SubCategoriesDataTable />
      </div>
    </div>
  );
};

export default SubCategoryPageList;
