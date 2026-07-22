import { Router } from "express";
import * as FarmController from "../controllers/farm.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { UserRole } from "../types/role";

const router = Router();

// Get all farms
router.get(
  "/",
  authenticate,
  authorize(UserRole.ADMIN),
  FarmController.getFarms
);

// Get one farm
router.get(
  "/:id",
  authenticate,
  authorize(UserRole.ADMIN),
  FarmController.getFarm
);

// Create farm

router.post(
    "/",
    (req, res, next) => {
      console.log("POST /api/farms route reached");
      next();
    },
    authenticate,
    authorize(UserRole.ADMIN),
    FarmController.createNewFarm
  );
// Update farm
router.put(
  "/:id",
  authenticate,
  authorize(UserRole.ADMIN),
  FarmController.updateExistingFarm
);

// Activate / Deactivate farm
router.patch(
  "/:id/status",
  authenticate,
  authorize(UserRole.ADMIN),
  FarmController.changeFarmStatus
);

export default router;
