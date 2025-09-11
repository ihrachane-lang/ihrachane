export const serviceSearchableFields = ["title"];
export const servicePopulateFields = [
  {
    path: "creatorInfo",
    select: "-password -email",
  },
];
export const serviceFilterFields = [];
