import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";

import {
  getALlWeapons,
  createWeapon,
  getOneWeapon,
  updateWeapon,
  deleteWeapon,
} from "../controllers/weapon.controller";
import { verifyUser } from "../controllers/auth.controller";

const weaponsRouter = Router();

weaponsRouter
  .route("/")
  .get(catchAsync(getALlWeapons))
  .post(verifyUser, catchAsync(createWeapon));

weaponsRouter
  .route("/:id")
  .get(catchAsync(getOneWeapon))
  .put(verifyUser, catchAsync(updateWeapon))
  .delete(verifyUser, catchAsync(deleteWeapon));

export default weaponsRouter;
