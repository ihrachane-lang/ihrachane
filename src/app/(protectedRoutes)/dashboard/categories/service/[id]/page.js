import UpdateSubCategoryService from "@/components/dashboard/categories/UpdateSubCategoryService";

const EditServicePage = async ({ params }) => {
  const { id } = await params;
  return (
    <div>
      <UpdateSubCategoryService serviceId={id} />
    </div>
  );
};

export default EditServicePage;
