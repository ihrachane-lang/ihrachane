import mongoose from "mongoose";

const productRequirementsSchema = new mongoose.Schema(
  {
    expectedQuantity: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    budgetRange: {
      type: String,
      required: true,
    },
    requiredTimeline: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "cancel", "done", "in-progress"],
      default: "pending",
    },
  },
  {
    _id: false,
    versionKey: false,
  }
);

const sourcingRequestFormSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    preferredContactMethod: {
      type: String,
      required: true,
    },
    productRequirements: productRequirementsSchema,
  },
  { timestamps: true }
);

const SourcingRequestForm =
  mongoose.models.SourcingRequestForm ||
  mongoose.model("SourcingRequestForm", sourcingRequestFormSchema);

export default SourcingRequestForm;
