import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";

import {
  signup,
  login,
  getUsers,
  getUser,
  deleteUser,
  editUser,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.route("/users").get(getUsers);
userRouter.route("/login").post(catchAsync(login));
userRouter.route("/signup").post(catchAsync(signup));
userRouter.route("/users/:id").get(getUser).delete(deleteUser).put(editUser);

export default userRouter;
