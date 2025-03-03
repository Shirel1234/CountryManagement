import { Response } from "express";
import mongoose from "mongoose";
import { HTTP_STATUS_CODES } from "../constants";

// Helper to handle MongoDB validation errors and duplicate key errors
export const handleValidationError = (error: any, res: Response, message: string) => {
  if (error instanceof mongoose.Error.ValidationError) {
    const validationErrors = Object.values(error.errors).map(
      (err: any) => err.message
    );
    res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message, validationErrors });
  } else if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
      message: `Duplicate value for field: '${field}'`,
      error: error.keyValue,
    });
  } else {
    res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message, error: error.message || error });
  }
};
