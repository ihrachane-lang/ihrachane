export const clientSearchableFields = ["name"];
export const clientPopulateFields = [
  {
    path: "creatorInfo",
    select: "-password -email",
  },
];
export const clientFilterFields = [];
