import { Response } from "express";
import mongoose from "mongoose";

// Helper to handle MongoDB validation errors and duplicate key errors
export const handleValidationError = (error: any, res: Response, message: string) => {
  if (error instanceof mongoose.Error.ValidationError) {
    const validationErrors = Object.values(error.errors).map(
      (err: any) => err.message
    );
    res.status(400).json({ message, validationErrors });
  } else if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    res.status(400).json({
      message: `Duplicate value for field: '${field}'`,
      error: error.keyValue,
    });
  } else {
    res.status(500).json({ message, error: error.message || error });
  }
};
