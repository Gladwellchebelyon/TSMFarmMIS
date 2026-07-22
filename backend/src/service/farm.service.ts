import prisma from "../lib/prisma";
import { CreateFarmDTO, UpdateFarmDTO } from "../types/farm.types";

// Get all farms
export const getAllFarms = async () => {
  return await prisma.farm.findMany({
    include: {
      manager: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// Get one farm
export const getFarmById = async (id: number) => {
  const farm = await prisma.farm.findUnique({
    where: { id },
    include: {
      manager: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  });

  if (!farm) {
    throw new Error("Farm not found.");
  }

  return farm;
};

// Create farm
export const createFarm = async (data: CreateFarmDTO) => {
  const existingFarm = await prisma.farm.findUnique({
    where: {
      name: data.name,
    },
  });

  if (existingFarm) {
    throw new Error("Farm already exists.");
  }

  // Ensure manager exists
  const manager = await prisma.user.findUnique({
    where: {
      id: data.managerId,
    },
  });

  if (!manager) {
    throw new Error("Manager not found.");
  }

  return await prisma.farm.create({
    data,
    include: {
      manager: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  });
};

// Update farm
export const updateFarm = async (
  id: number,
  data: UpdateFarmDTO
) => {
  const existingFarm = await prisma.farm.findUnique({
    where: { id },
  });

  if (!existingFarm) {
    throw new Error("Farm not found.");
  }

  return await prisma.farm.update({
    where: { id },
    data,
    include: {
      manager: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  });
};

// Activate / Deactivate farm
export const toggleFarmStatus = async (id: number) => {
  const farm = await prisma.farm.findUnique({
    where: { id },
  });

  if (!farm) {
    throw new Error("Farm not found.");
  }

  return await prisma.farm.update({
    where: { id },
    data: {
      isActive: !farm.isActive,
    },
    include: {
      manager: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  });
};
