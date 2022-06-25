import { NextFunction, Request, Response } from "express";
import { WeaponStore } from "../models/weapon.model";
import { catchAsync } from "../utils/catchAsync";

const weapons = new WeaponStore();

export const getALlWeapons = catchAsync(
  async (_req: Request, res: Response, next: NextFunction) => {
    const result = await weapons.getAllWeapons();
    res.status(200).json({
      message: "success",
      data: {
        count: result.length,
        weapons: result,
      },
    });
    next();
  }
);

export const createWeapon = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await weapons.createWeapon(req.body);
    res.status(201).json({
      message: "created successfully",
      data: {
        weapons: result,
      },
    });
    next();
  } catch (error) {
    throw new Error(`Cannot create weapons ${error}`);
  }
};

export const getOneWeapon = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await weapons.getOneWeapon(+req.params.id);
    res.status(200).json({
      message: "successful",
      data: {
        weapons: result,
      },
    });
    next();
  } catch (error) {
    throw new Error(`Cannot get weapon ${error}`);
  }
};
export const updateWeapon = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await weapons.updateWeapon({
      ...req.body,
      id: +req.params.id,
    });
    res.status(200).json({
      message: "updated successfully",
      data: {
        weapons: result,
      },
    });
    next();
  } catch (error) {
    throw new Error(`Cannot update weapon ${error}`);
  }
};

export const deleteWeapon = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await weapons.deleteWeapon(+req.params.id);
    res.status(200).json({
      message: "Deleted successfully",
      data: null,
    });
    next();
  } catch (error) {
    throw new Error(`Cannot delete weapon ${error}`);
  }
};
