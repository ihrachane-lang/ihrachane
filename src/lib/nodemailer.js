import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  auth: {
    user: process.env.SMTP_GMAIL_USER,
    pass: process.env.SMTP_GMAIL_PASS,
  },
});

export const mailOptions = {
  from: process.env.SMTP_GMAIL_USER,
};
