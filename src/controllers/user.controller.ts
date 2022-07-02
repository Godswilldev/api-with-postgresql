import { Request, Response } from "express";
import { UserStore } from "../models/user.model";
import dotenv from "dotenv";
dotenv.config();

const User = new UserStore();

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
  const { firstname, email, password, lastname } = req.body;
  const user = await User.editUser(req.params.id, {
    firstname,
    email,
    password,
    lastname,
  });

  return res.status(200).json({
    status: "Updated successfully",
    data: {
      user,
    },
  });
};

export const deleteUser = async (req: Request, res: Response) => {
  const user = await User.deleteUser(req.params.id);

  res.json({
    status: "deleted successfully",
    data: user,
  });
};
