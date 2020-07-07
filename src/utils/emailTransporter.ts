import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  pool: true,
  host: "mail.supremecluster.com",
  port: 465,
  secure: true, // use TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
