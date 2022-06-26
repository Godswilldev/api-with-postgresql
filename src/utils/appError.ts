export class AppError extends Error {
  public readonly status: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string | undefined, statusCode: number) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = statusCode;
    this.status = `${this.statusCode}`.startsWith("4") ? "Failed" : "Error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// const name = new AppError("Invalid greg", 400);
// console.log(name.message);
// console.log(name.statusCode);
// console.log(name.status);
// console.log(name.name);
