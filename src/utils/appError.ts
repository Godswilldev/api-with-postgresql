export class AppError extends Error {
  public readonly status: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string | undefined, statusCode: number) {
    super(message);

    // Object.setPrototypeOf(this, new.target.prototype);
    // this.status = args.status || "Error";
    this.statusCode = statusCode;
    this.status = `${this.statusCode}`.startsWith("4") ? "Failed" : "Error";
    this.isOperational = true;
    // this.isOperational = args.isOperational !== undefined && args.isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}
