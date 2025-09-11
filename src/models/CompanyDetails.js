import mongoose from "mongoose";

const companyDetailsSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    whatsAppNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

const CompanyDetails =
  mongoose.models.CompanyDetails ||
  mongoose.model("CompanyDetails", companyDetailsSchema);
export default CompanyDetails;
