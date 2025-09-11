// models/SubCategory.js
import { Schema, models, model } from "mongoose";

const subCategorySchema = new Schema(
  {
    title: { type: String, required: true },
    selectedCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    bannerImg: { type: String },
    description: { type: String },
    subCategoryServices: [
      {
        type: Schema.Types.ObjectId,
        ref: "SubCategoryService",
      },
    ],
    creatorInfo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const SubCategory =
  models.SubCategory || model("SubCategory", subCategorySchema);
export default SubCategory;
