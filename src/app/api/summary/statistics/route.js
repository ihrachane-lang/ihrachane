import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Client from "@/models/Client";
import Partner from "@/models/Partner";
import Service from "@/models/Service";
import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";
import Testimonial from "@/models/Testimonial";
import SourcingRequestForm from "@/models/SourcingRequestForm";
import ContactForm from "@/models/ContactForm";

export async function GET() {
  try {
    await dbConnect();

    // Get counts from different collections
    const [users, clients, partners, services, categories, subCategories, testimonials, sourcingRequests, contactMessages] = await Promise.all([
      User.countDocuments(),
      Client.countDocuments(),
      Partner.countDocuments(),
      Service.countDocuments(),
      Category.countDocuments(),
      SubCategory.countDocuments(),
      Testimonial.countDocuments(),
      SourcingRequestForm.countDocuments(),
      ContactForm.countDocuments()
    ]);

    // Get sourcing requests by status
    const [pendingSourcingRequests, inProgressSourcingRequests, doneSourcingRequests, cancelledSourcingRequests] = await Promise.all([
      SourcingRequestForm.countDocuments({ "productRequirements.status": "pending" }),
      SourcingRequestForm.countDocuments({ "productRequirements.status": "in-progress" }),
      SourcingRequestForm.countDocuments({ "productRequirements.status": "done" }),
      SourcingRequestForm.countDocuments({ "productRequirements.status": "cancel" })
    ]);

    // Get recent sourcing requests
    const recentSourcingRequests = await SourcingRequestForm.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email company country phone productRequirements.status createdAt");

    // Get recent contact messages
    const recentContactMessages = await ContactForm.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email message createdAt");

    // Calculate monthly sourcing requests for the last 6 months
    const today = new Date();
    const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 5, 1);
    
    const monthlyStats = [];
    for (let i = 0; i < 6; i++) {
      const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const nextMonth = new Date(today.getFullYear(), today.getMonth() - i + 1, 0);
      
      const count = await SourcingRequestForm.countDocuments({
        createdAt: { $gte: month, $lte: nextMonth }
      });
      
      monthlyStats.unshift({
        month: month.toLocaleString('default', { month: 'short' }),
        count
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        counts: {
          users,
          clients,
          partners,
          services,
          categories,
          subCategories,
          testimonials,
          sourcingRequests,
          contactMessages
        },
        sourcingRequestsByStatus: {
          pending: pendingSourcingRequests,
          inProgress: inProgressSourcingRequests,
          done: doneSourcingRequests,
          cancelled: cancelledSourcingRequests
        },
        recentSourcingRequests,
        recentContactMessages,
        monthlyStats
      }
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}