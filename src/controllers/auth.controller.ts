import { UserStore } from "../models/user.model";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

const User = new UserStore();

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];
    jwt.verify(token ? token : "", process.env.JWT_TOKEN_SECRET || "secret");
    next();
  } catch (error) {
    return res.status(401).json({
      error,
    });
  }
};

export const signup = async (req: Request, res: Response) => {
  const { firstname, email, password, lastname } = req.body;

  const createdUser = await User.createUser({
    firstname,
    email,
    password,
    lastname,
  });

  const token = jwt.sign(
    { user: createdUser },
    process.env.JWT_TOKEN_SECRET || "secret",
    { expiresIn: "10d" }
  );

  return res.status(201).json({
    status: "Signup Successful",
    token,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const logInUser = await User.login({ email, password });

  res.status(200).json({
    data: {
      user: logInUser,
    },
  });
};
