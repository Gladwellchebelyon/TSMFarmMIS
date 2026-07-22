import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import farmRoutes from "./routes/farm.routes";

import { authenticate, AuthRequest } from "./middleware/auth.middleware";
import { authorize } from "./middleware/role.middleware";
import { UserRole } from "./types/role";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Three Sisters FarmMIS API",
    status: "Running",
  });
});

// =======================
// API Routes
// =======================

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/farms", farmRoutes);

// =======================
// Protected Routes
// =======================

// Logged-in users
app.get("/api/profile", authenticate, (req: AuthRequest, res) => {
  res.status(200).json({
    message: "Access granted!",
    user: req.user,
  });
});

// Admin only
app.get(
  "/api/admin",
  authenticate,
  authorize(UserRole.ADMIN),
  (req: AuthRequest, res) => {
    res.status(200).json({
      message: "Welcome Admin!",
      user: req.user,
    });
  }
);

export default app;
