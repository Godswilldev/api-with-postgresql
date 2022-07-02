import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";
import { verifyUser } from "../controllers/auth.controller";

import {
  getUsers,
  getUser,
  deleteUser,
  editUser,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.route("/").get(catchAsync(getUsers));
userRouter
  .route("/:id")
  .get(catchAsync(getUser))
  .delete(verifyUser, catchAsync(deleteUser))
  .put(verifyUser, catchAsync(editUser));

export default userRouter;
