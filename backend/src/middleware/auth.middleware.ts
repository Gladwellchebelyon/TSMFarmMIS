import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    role: string;
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  console.log("Authorization Header:", JSON.stringify(authHeader));

  if (!authHeader) {
    return res.status(401).json({
      error: "Access denied. No token provided.",
    });
  }

  if (!authHeader.startsWith("Bearer")) {
    return res.status(401).json({
      error: "Invalid authorization format.",
    });
  }

  const parts = authHeader.split(" ");

  console.log("Parts:", parts);
  console.log("Parts Length:", parts.length);

  const token = parts.filter((part) => part.trim() !== "").pop();

  console.log("Extracted Token:", token);

  if (!token) {
    return res.status(401).json({
      error: "Invalid token.",
    });
  }

  try {
    const decoded = verifyToken(token) as {
      id: number;
      role: string;
    };

    console.log("Decoded Token:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);

    return res.status(401).json({
      error: "Invalid or expired token.",
    });
  }
};
