import { Request, Response } from "express";
import { getAllUsers, createUser } from "../service/user.service";

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
