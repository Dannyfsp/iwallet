const nodemailer = require("nodemailer");

const sendEMail = async (subject, text, html) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SMTP_HOST,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  try {
    await transporter.sendMail({
      from: `iWallet 😊 <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL,
      subject,
      text,
      html,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEMail;
