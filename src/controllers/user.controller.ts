import { Request, Response, NextFunction } from "express";
import { UserStore } from "../models/user.model";

const User = new UserStore();

export const signup = async (req: Request, res: Response) => {
  const createdUser = await User.createUser({ ...req.body });
  res.status(201).json({
    data: {
      user: createdUser,
    },
  });
};

export const login = async (req: Request, res: Response) => {
  const logInUser = await User.login({ ...req.body });
  res.status(200).json({
    data: {
      user: logInUser,
    },
  });
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.getAllUsers();
  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
};

export const getUser = async (req: Request, res: Response) => {
  const user = await User.getUser(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};

export const editUser = async (req: Request, res: Response) => {
  const user = await User.editUser(req.params.id, { ...req.body });

  res.json({
    status: "Updated successfully",
    data: {
      user,
    },
  });
};

export const deleteUser = async (req: Request, res: Response) => {
  await User.deleteUser(req.params.id);

  res.json({
    status: "deleted successfully",
    data: null,
  });
};
