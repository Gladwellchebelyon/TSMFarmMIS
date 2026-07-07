import { Router } from "express";
import {
  getUsers,
  createNewUser,
} from "../controllers/user.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { UserRole } from "../types/role";

const router = Router();

// View all users (Admin only)
router.get(
  "/",
  authenticate,
  authorize(UserRole.ADMIN),
  getUsers
);

// Create new staff (Admin only)
router.post(
  "/",
  authenticate,
  authorize(UserRole.ADMIN),
  createNewUser
);

export default router;
