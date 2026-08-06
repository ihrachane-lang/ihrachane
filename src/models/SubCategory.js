import { Schema, models, model } from "mongoose";
import { slugify } from "@/lib/slug";

const subCategorySchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, sparse: true },
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

subCategorySchema.pre("save", async function (next) {
  if (!this.slug || this.isModified("title")) {
    this.slug = slugify(this.title);
  }
  next();
});

subCategorySchema.index(
  { selectedCategory: 1, slug: 1 },
  { unique: true, partialFilterExpression: { slug: { $exists: true } } }
);

const SubCategory =
  models.SubCategory || model("SubCategory", subCategorySchema);
export default SubCategory;
