import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import {
  resetPasswordTemplate,
  verifyEmailTemplate1,
} from "./allTemplates/emailTemplates";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_GMAIL_USER,
    pass: process.env.SMTP_GMAIL_PASS,
  },
});

export const sendEmail = async (name, email, emailType) => {
  try {
    let hashedToken = "";
    let subject = "";
    let htmlContent = "";
    const toEmail = email;

    if (emailType === "verify-email" || emailType === "reset-password") {
      // 🔢 6-digit decimal random number generate
      const rawCode = Math.floor(100000 + Math.random() * 900000).toString();

      // 🔐 Hash the code
      hashedToken = await bcrypt.hash(
        rawCode,
        Number(process.env.HASH_SALT_ROUND)
      );

      await dbConnect();

      const updateField =
        emailType === "verify-email"
          ? {
              verifyToken: hashedToken,
              verifyTokenExpire: Date.now() + 60 * 60 * 1000,
            }
          : {
              resetToken: hashedToken,
              resetTokenExpire: Date.now() + 60 * 60 * 1000,
            };

      await User.findOneAndUpdate({ email }, updateField);

      subject =
        emailType === "verify-email"
          ? "Verify Your Email"
          : "Reset Your Password";
      htmlContent =
        emailType === "verify-email"
          ? verifyEmailTemplate1(name, email, rawCode)
          : resetPasswordTemplate(name, email, rawCode);
    } else {
      throw new Error("Invalid email type or missing data.");
    }

    await transporter.sendMail({
      from: `"Ihrachane Support" <${process.env.SMTP_GMAIL_USER}>`,
      to: toEmail,
      subject,
      html: htmlContent,
    });

    return {
      success: true,
      message: "Please check your email!!",
    };
  } catch (error) {
    console.error("Email send error:", error);
    return error instanceof Error ? error.message : "Unknown error occurred";
  }
};
