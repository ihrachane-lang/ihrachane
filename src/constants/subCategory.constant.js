export const subCategorySearchableFields = ["title"];
export const subCategoryPopulateFields = [
  "selectedCategory",
  "subCategoryServices",
  {
    path: "creatorInfo",
    select: "-password -email",
  },
];
export const subCategoryFilterFields = [];
