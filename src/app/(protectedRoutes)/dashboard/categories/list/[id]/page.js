import UpdateCategories from "@/components/dashboard/categories/UpdateCategories";
import React from "react";

const page = async ({ params }) => {
const {id} = await params
  return (
    <div>
      <UpdateCategories categoryId={id} />
    </div>
  );
};

export default page;
