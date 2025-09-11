import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    companyLogo: {
      type: String, // image url
    },
    clientImage: {
      type: String, // image url
    },
    clientName: {
      type: String,
      required: true,
    },
    clientDesignation: {
      type: String,
    },
    clientFeedback: {
      type: String,
      required: true,
    },
    creatorInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Testimonial =
  mongoose.models.Testimonial ||
  mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;
