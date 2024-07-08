const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PW,
  },
});

const sendResetPasswordEmail = async (email, token) => {
  const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
  const mailOptions = {
    from: auth.user,
    to: email,
    subject: 'Reset Password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = { sendResetPasswordEmail };
