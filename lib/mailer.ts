import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.eu', // ou smtp.zoho.com si tu n'es pas en Europe
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_USER,
    pass: process.env.ZOHO_PASS,
  },
});