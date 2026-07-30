import mongoose from "mongoose";
import "@/models/Category";
import "@/models/SubCategory";
import "@/models/Client";
import "@/models/CompanyDetails";
import "@/models/ContactForm";
import "@/models/Partner";
import "@/models/Service";
import "@/models/SocialLink";
import "@/models/SubCategoryService";
import "@/models/Testimonial";
import "@/models/User";

//solved some problems by importing these models 


let isConnected = false;

const dbConnect = async () => {
  if (isConnected) return;
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in environment variables (.env)");
    }
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "ihrfaset",
    });
    isConnected = conn.connections[0].readyState;
    // console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error(`MongoDB connection failed: ${error.message}`);
  }
};

export default dbConnect;
