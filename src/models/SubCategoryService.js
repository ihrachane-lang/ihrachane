import mongoose from "mongoose";

const subCategoryServiceSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
    },
    selectedSubCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    bannerImg: {
      type: String,
    },
    description: {
      type: String,
    },
    creatorInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const SubCategoryService =
  mongoose.models.SubCategoryService ||
  mongoose.model("SubCategoryService", subCategoryServiceSchema);

export default SubCategoryService;
