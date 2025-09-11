import UpdateSubCategory from "@/components/dashboard/categories/UpdateSubCategory";

const EditSubCategoryPage = async ({ params }) => {
  const { id } = await params;
  return (
    <div>
      <UpdateSubCategory subCatId={id} />
    </div>
  );
};

export default EditSubCategoryPage;
