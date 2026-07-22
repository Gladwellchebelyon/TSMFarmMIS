import { Request, Response } from "express";
import {
  getAllFarms,
  getFarmById,
  createFarm,
  updateFarm,
  toggleFarmStatus,
} from "../service/farm.service";

// Get all farms
export const getFarms = async (
  req: Request,
  res: Response
) => {
  try {
    const farms = await getAllFarms();

    res.status(200).json({
      message: "Farms retrieved successfully.",
      count: farms.length,
      farms,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Get one farm
export const getFarm = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const farm = await getFarmById(id);

    res.status(200).json({
      message: "Farm retrieved successfully.",
      farm,
    });
  } catch (error: any) {
    res.status(404).json({
      error: error.message,
    });
  }
};

// Create farm
export const createNewFarm = async (
  req: Request,
  res: Response
) => {
  try {
    const farm = await createFarm(req.body);

    res.status(201).json({
      message: "Farm created successfully.",
      farm,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// Update farm
export const updateExistingFarm = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const farm = await updateFarm(id, req.body);

    res.status(200).json({
      message: "Farm updated successfully.",
      farm,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// Activate / Deactivate farm
export const changeFarmStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const farm = await toggleFarmStatus(id);

    res.status(200).json({
      message: farm.isActive
        ? "Farm activated successfully."
        : "Farm deactivated successfully.",
      farm,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};
