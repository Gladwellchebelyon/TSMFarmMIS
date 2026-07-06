import { Request, Response } from "express";
import { registerUser, loginUser } from "../service/auth.service";

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await registerUser(req.body);

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

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await loginUser(req.body);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({
      error: error.message,
    });
  }
};
