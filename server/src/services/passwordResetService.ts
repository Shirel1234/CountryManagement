import crypto from "crypto";
import bcrypt from 'bcryptjs';
import { User } from "../lib/models/userModel";
import { PasswordReset } from "../lib/models/passwordResetModel";
import nodemailer from "nodemailer";
import { IUser } from "../types/user";

// Create a transport for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

// Send password reset email
export const sendPasswordResetEmail = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("User not found");

  const resetTokenEntry = await createPasswordResetEntry(user);
  
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetTokenEntry.resetToken}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Password Reset Request",
    text: `You can reset your password using the following link: ${resetLink}`,
  };
  transporter.verify((error, success) => {
    if (error) {
      console.error(`החיבור לשרת נכשל: ${mailOptions.from} ${mailOptions.to} ${mailOptions.subject} ${mailOptions.text}`, error);
    } else {
      console.log("השרת מוכן לשלוח הודעות.");
    }
  });
  await transporter.sendMail(mailOptions);
};

// Create password reset entry in DB
const createPasswordResetEntry = async (user: IUser) => {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 3600000); 

  const passwordResetEntry = new PasswordReset({
    userId: user._id,
    resetToken,
    expiresAt,
  });

  await passwordResetEntry.save();

  return passwordResetEntry;
};

// Reset user password using token
export const resetPassword = async (token: string, newPassword: string) => {
  const passwordResetEntry = await PasswordReset.findOne({
    resetToken: token,
    expiresAt: { $gt: new Date() }, 
  }).populate("userId");

  if (!passwordResetEntry) throw new Error("Invalid or expired token");

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const user = await User.findById(passwordResetEntry.userId);

  if (!user) throw new Error("User not found");

  user.password = hashedPassword;
  await user.save();
  await PasswordReset.findByIdAndDelete(passwordResetEntry._id);
};
