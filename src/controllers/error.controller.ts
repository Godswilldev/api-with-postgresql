import { AppError } from "./../utils/appError";
import { ErrorRequestHandler } from "express";

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) =>
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
  });
