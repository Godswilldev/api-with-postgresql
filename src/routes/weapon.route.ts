import { Router } from "express";

import {
  getALlWeapons,
  createWeapon,
  getOneWeapon,
  updateWeapon,
  deleteWeapon,
} from "../controllers/weapon.controller";

const weaponsRouter = Router();

weaponsRouter.route("/").get(getALlWeapons).post(createWeapon);
weaponsRouter
  .route("/:id")
  .get(getOneWeapon)
  .put(updateWeapon)
  .delete(deleteWeapon);

export default weaponsRouter;
