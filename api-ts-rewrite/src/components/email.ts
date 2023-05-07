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

export const sendConfirmationEmail = (
  to: string,
  subject: string,
  text: string
) => {
  let mailOptions = { to, subject, text };
  transporter.sendMail(
    mailOptions,
    (err: Error | null, info: SMTPTransport.SentMessageInfo) => {
      if (err) {
        console.log(err);
        return;
      }
    }
  );
};
