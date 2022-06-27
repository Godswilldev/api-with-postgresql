import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";
import { signup, login } from "../controllers/user.controller";

const userRouter = Router();

userRouter.route("/signup").post(catchAsync(signup));
userRouter.route("/login").post(catchAsync(login));

export default userRouter;
