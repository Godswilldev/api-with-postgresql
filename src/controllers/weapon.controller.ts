import { Request, Response } from "express";
import { WeaponStore } from "../models/weapon.model";

const weapons = new WeaponStore();

export const getALlWeapons = async (_req: Request, res: Response) => {
  const result = await weapons.getAllWeapons();

  res.status(200).json({
    message: "success",
    data: {
      count: result.length,
      weapons: result,
    },
  });
};

export const createWeapon = async (req: Request, res: Response) => {
  const result = await weapons.createWeapon(req.body);

  res.status(201).json({
    message: "created successfully",
    data: {
      weapons: result,
    },
  });
};

export const getOneWeapon = async (req: Request, res: Response) => {
  const result = await weapons.getOneWeapon(+req.params.id);

  res.status(200).json({
    message: "successful",
    data: {
      weapons: result,
    },
  });
};

export const updateWeapon = async (req: Request, res: Response) => {
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
};

export const deleteWeapon = async (req: Request, res: Response) => {
  await weapons.deleteWeapon(+req.params.id);
  res.status(200).json({
    message: "Deleted successfully",
    data: null,
  });
};
