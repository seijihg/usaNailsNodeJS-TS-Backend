import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  pool: true,
  host: "mail.supremecluster.com",
  port: 465,
  secure: true, // use TLS
  auth: {
    user: "no-reply@usa-nails.co.uk",
    pass: "Sw72n9nhSF",
  },
});
