import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: "perryjaymes99@gmail.com",
    pass: "khgkhwcnawtrbxvt",
  }
});

export default transporter;
