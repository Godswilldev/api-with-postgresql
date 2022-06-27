import { Request, Response, NextFunction } from "express";
import { UserStore } from "../models/user.model";

const User = new UserStore();

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const createdUser = await User.createUser({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });
  res.status(201).json({
    data: {
      user: createdUser,
    },
  });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const logInUser = await User.login({
    email: req.body.email,
    password: req.body.password,
  });
  res.status(200).json({
    data: {
      user: logInUser,
    },
  });
};
