import { Schema, models, model } from "mongoose";
import { slugify } from "@/lib/slug";

const blogPostSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    coverImage: { type: String, required: true },
    category: {
      type: String,
      default: "General",
      trim: true,
      index: true,
    },
    tags: [{ type: String, trim: true }],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    authorName: {
      type: String,
      default: "IHRACHANE Team",
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    readTimeMinutes: {
      type: Number,
      default: 5,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    seo: {
      metaTitle: { type: String, trim: true },
      metaDescription: { type: String, trim: true },
      keywords: [{ type: String, trim: true }],
      ogImage: { type: String, trim: true },
      canonicalUrl: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

blogPostSchema.pre("save", async function (next) {
  if (!this.slug || this.isModified("title")) {
    this.slug = slugify(this.title);
  }
  if (this.status === "published" && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

blogPostSchema.index(
  { slug: 1 },
  { unique: true, partialFilterExpression: { slug: { $exists: true } } }
);

const BlogPost = models.BlogPost || model("BlogPost", blogPostSchema);
export default BlogPost;
