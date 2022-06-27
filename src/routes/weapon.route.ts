import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";

import {
  getALlWeapons,
  createWeapon,
  getOneWeapon,
  updateWeapon,
  deleteWeapon,
} from "../controllers/weapon.controller";

const weaponsRouter = Router();

weaponsRouter
  .route("/")
  .get(catchAsync(getALlWeapons))
  .post(catchAsync(createWeapon));

weaponsRouter
  .route("/:id")
  .get(catchAsync(getOneWeapon))
  .put(catchAsync(updateWeapon))
  .delete(catchAsync(deleteWeapon));

export default weaponsRouter;
