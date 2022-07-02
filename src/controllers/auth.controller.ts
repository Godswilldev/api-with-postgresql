import { UsersModelProps, UserStore } from "../models/user.model";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { AppError } from "../utils/appError";
dotenv.config();

const { PEPPER, JWT_TOKEN_SECRET } = process.env;

const User = new UserStore();

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];
    jwt.verify(token ? token : "", JWT_TOKEN_SECRET || "secret");
    next();
  } catch (error) {
    return next(new AppError(`${error}`, 401));
  }
};

const signJwT = (user: UsersModelProps[]) =>
  jwt.sign({ user }, JWT_TOKEN_SECRET || "secret", {
    expiresIn: "10d",
  });

export const signup = async (req: Request, res: Response) => {
  const { firstname, email, password, lastname } = req.body;

  const createdUser = await User.createUser({
    firstname,
    email,
    password,
    lastname,
  });

  const token = signJwT(createdUser);

  return res.status(201).json({
    status: "Signup Successful",
    token,
  });
};

export const chckCredentials = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const pepper = PEPPER !== undefined ? PEPPER : "";

  const { email, password } = req.body;
  const result = await User.login({ email, password });

  if (result.rowCount === 0) {
    return next(new AppError("Email not found in the database", 400));
  }
  // meaning email was found in the database
  const validUser = result.rows[0];

  // check if password is valid
  const validPassword = await bcrypt.compare(
    password + pepper,
    validUser.password
  );

  return validPassword ? next() : next(new AppError("Incorrect password", 400));
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const logInUser = await User.login({ email, password });

  const token = signJwT(logInUser.rows);

  res.status(200).json({
    status: "Logged In successfully",
    token,
  });
};
