import { Router } from "express";
import {
  getUsers,
  getUser,
  createNewUser,
  updateExistingUser,
  changeUserStatus,
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

// View single user (Admin only)
router.get(
  "/:id",
  authenticate,
  authorize(UserRole.ADMIN),
  getUser
);

// Create user (Admin only)
router.post(
  "/",
  authenticate,
  authorize(UserRole.ADMIN),
  createNewUser
);

// Update user (Admin only)
router.put(
  "/:id",
  authenticate,
  authorize(UserRole.ADMIN),
  updateExistingUser
);

// Activate / Deactivate user (Admin only)
router.patch(
  "/:id/status",
  authenticate,
  authorize(UserRole.ADMIN),
  changeUserStatus
);

export default router;
