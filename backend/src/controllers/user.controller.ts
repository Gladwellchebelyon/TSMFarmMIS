import { Request, Response } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  toggleUserStatus,
} from "../service/user.service";

// Get all users
export const getUsers = async (
  req: Request,
  res: Response
) => {
  try {
    const users = await getAllUsers();

    res.status(200).json({
      message: "Users retrieved successfully.",
      count: users.length,
      users,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Get one user
export const getUser = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const user = await getUserById(id);

    res.status(200).json({
      message: "User retrieved successfully.",
      user,
    });
  } catch (error: any) {
    res.status(404).json({
      error: error.message,
    });
  }
};

// Create user
export const createNewUser = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await createUser(req.body);

    res.status(201).json({
      message: "User created successfully.",
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// Update user
export const updateExistingUser = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const user = await updateUser(id, req.body);

    res.status(200).json({
      message: "User updated successfully.",
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// Activate / Deactivate user
export const changeUserStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const user = await toggleUserStatus(id);

    res.status(200).json({
      message: user.isActive
        ? "User activated successfully."
        : "User deactivated successfully.",
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};
