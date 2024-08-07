const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PW,
  },
});

const sendEmail = async (email, token, service) => {
    if (service === 'reset-password') {
        sendResetPasswordEmail(email, token);
    } else if (service === 'confirm-email'){
        sendConfirmationEmail(email, token);
    } else {
        throw new Error('Invalid service');
    }
};

const sendConfirmationEmail = async (email, token) => {
    const confirmationLink = `http://localhost:5000/api/auth/confirm-email?token=${token}`;
    const mailOptions = {
        to: email,
        subject: 'Confirm Email',
        html: `<p>Click <a href="${confirmationLink}">here</a> to confirm your email</p>`,
    };
    await transporter.sendMail(mailOptions);
};

const sendResetPasswordEmail = async (email, token) => {
    const resetLink = `http://localhost:5000/api/auth/reset-password?token=${token}`;
    const mailOptions = {
        to: email,
        subject: 'Reset Password',
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
    };
    await transporter.sendMail(mailOptions);
    }

module.exports = { sendEmail };
