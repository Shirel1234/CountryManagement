import { Response } from "express";
import mongoose from "mongoose";

// Helper to handle MongoDB validation errors
export const handleValidationError = (error: any, res: Response, message: string) => {
  if (error instanceof mongoose.Error.ValidationError) {
    const validationErrors = Object.values(error.errors).map(
      (err: any) => err.message
    );
    res.status(400).json({ message, validationErrors });
  } else {
    res.status(500).json({ message, error });
  }
};
