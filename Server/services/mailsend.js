import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
export const sendMail = async (name, mobileno, email, message) => {
  try {
    // Create transporter for GSuite/Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    // Mail content
    const mailOptions = {
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TOWHOM, // send mail to yourself (the admin)
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h3>New Contact Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Mobile No:</strong> ${mobileno}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };
    // Send mail
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return true;
  } catch (error) {
    console.error("Email send failed:", error.message);
    return false;
  }
};

export const sendEmail = async ({
  to,
  RequestType,
  username,
  otp,
  resetLink,
}) => {
  try {
    let subject = "";
    let html = "";
    
    // 🔥 TEMPLATE SELECTION (like SMS switch)
    switch (RequestType.trim().toUpperCase()) {
      case "EMAIL_OTP": {
        subject = "Your Email Verification OTP";
        html = `<p>Dear ${username},</p>
                <p>Your 5-digit verification code is: <b>${otp}</b></p>
                <p>Please enter this code to verify your email.</p>
                <p>- Team</p>`;
        break;
      }
      case "RESET_LOGIN_PIN_LINK": {
        subject = "Reset Your Login Pin";
        html = `<p>Hello ${username},</p>
                <p>You requested to reset your login pin.</p>
                <p>Click the link below to set a new login pin:</p>
                <a href="${resetLink}" 
                  style="padding:10px 18px; background:#4CAF50; color:white; 
                          text-decoration:none; border-radius:5px;">
                  Reset Login Pin
                </a>
                <p>This link will expire in 10 minutes.</p>
                <p>If you did not request this, please ignore this email.</p>`;
        break;
      }      
      case "RESET_PASSWORD_LINK": {
        subject = "Reset Your Password";
        html = `<p>Hello ${username},</p>
                <p>You requested to reset your password.</p>
                <p>Click the link below to set a new password:</p>
                <a href="${resetLink}" 
                  style="padding:10px 18px; background:#4CAF50; color:white; 
                          text-decoration:none; border-radius:5px;">
                  Reset Password
                </a>
                <p>This link will expire in 10 minutes.</p>
                <p>If you did not request this, please ignore this email.</p>`;
        break;
      }
      case "VERIFY_EMAIL_LINK": {
        subject = "Verify Your email";
        html = `<p>Hello ${username},</p>
                <p>You are requested to verify your email.</p>
                <p>Click the link below to verify your email:</p>
                <a href="${resetLink}" 
                  style="padding:10px 18px; background:#4CAF50; color:white; 
                          text-decoration:none; border-radius:5px;">
                  Verify Email
                </a>
                <p>This link will expire in 10 minutes.</p>
                <p>If you did not request this, please ignore this email.</p>`;
        break;
      }
      default:
        return { success: false, error: "Invalid RequestType" };
    }
    // ✨ Create Email Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    // ✨ Mail details
    const mailOptions = {
      from: `"Support Team" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };
    // ✨ Send email
    const info = await transporter.sendMail(mailOptions);
    return { success: true, response: info.response };
  } catch (error) {
    return { success: false, error: error.message || error };
  }
};
