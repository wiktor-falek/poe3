import nodemailer from "nodemailer";
import dotenv from "dotenv";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = (to: string, subject: string, text: string, html?: string) => {
  let mailOptions = { to, subject, text, html };
  transporter.sendMail(mailOptions, (err: Error | null, info: SMTPTransport.SentMessageInfo) => {
    if (err) {
      console.log("Failed to send confirmation email");
      return;
    }
  });
};
