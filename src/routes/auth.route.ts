import {
  login,
  signup,
  verifyUser,
  chckCredentials,
} from "../controllers/auth.controller";
import { catchAsync } from "../utils/catchAsync";
import { Router } from "express";

const authRouter = Router();

authRouter.route("/login").post(catchAsync(chckCredentials), catchAsync(login));
authRouter.route("/signup").post(catchAsync(signup));

export default authRouter;
