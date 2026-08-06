import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import {
  resetPasswordTemplate,
  verifyEmailTemplate1,
} from "./allTemplates/emailTemplates";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

function getMailConfig() {
  const user = process.env.SMTP_GMAIL_USER?.trim();
  // Gmail displays app passwords in groups; whitespace is not part of the
  // password and is a common source of deployment-only authentication errors.
  const pass = process.env.SMTP_GMAIL_PASS?.replace(/\s/g, "");

  if (!user || !pass) {
    throw new Error(
      "Email is not configured. Set SMTP_GMAIL_USER and SMTP_GMAIL_PASS in Vercel Production environment variables.",
    );
  }

  return { user, pass };
}

function createTransporter() {
  const { user, pass } = getMailConfig();
  const port = Number(process.env.SMTP_PORT || 587);

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    // Port 587 uses STARTTLS and is generally more reliable from serverless
    // providers than an implicit-TLS SMTP connection on port 465.
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user, pass },
    connectionTimeout: 10000,
    greetingTimeout: 5000,
    socketTimeout: 20_000,
  });
}

export const sendEmail = async (name, email, emailType) => {
  try {
    const { user: from } = getMailConfig();
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
        Number(process.env.HASH_SALT_ROUND),
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

    const transporter = createTransporter();
    const result = await transporter.sendMail({
      from: `"Ihrachane Support" <${from}>`,
      to: toEmail.trim(),
      subject,
      html: htmlContent,
    });

    if (!result.messageId) {
      throw new Error("Email provider did not accept the message.");
    }

    return {
      success: true,
      message: "Please check your email!!",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Email send error:", message);
    return { success: false, message };
  }
};
