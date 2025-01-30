import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt"; 
import { IUser } from "../../types/user";

// Define the User schema
const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  profileImage: { type: String, required: false },
  password: { type: String, required: true },
  accessLevel: { type: Number, required: true, enum: [1, 2, 3], default: 2 },
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  
  const saltRounds = 10;
  if (typeof this.password !== 'string') {
    throw new Error('Password must be a string');
  }
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

export const User = mongoose.model<IUser>("User", UserSchema);