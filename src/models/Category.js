import { Schema, models, model } from "mongoose";
import { slugify } from "@/lib/slug";

const categorySchema = new Schema(
  {
    name: { type: String, required: true, index: true },
    slug: { type: String, sparse: true },
    bannerImg: { type: String, required: true },
    contentSideImg: { type: String },
    contentTitle: { type: String, required: true },
    mainBannerSpan: { type: String },
    mainBannerHeader: { type: String },
    mainBannerDescription: { type: String },
    subCategories: [
      {
        type: Schema.Types.ObjectId,
        ref: "SubCategory",
        required: true,
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

categorySchema.pre("save", async function (next) {
  if (!this.slug || this.isModified("name")) {
    this.slug = slugify(this.name);
  }
  next();
});

categorySchema.index(
  { slug: 1 },
  { unique: true, partialFilterExpression: { slug: { $exists: true } } }
);

const Category = models.Category || model("Category", categorySchema);
export default Category;
