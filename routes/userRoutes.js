import { Router } from "express";

const router = Router();

import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
} from "../controller/UserController.js";

router.get("/current-user", getCurrentUser);
router.get("/admin/app-stats", getApplicationStats);
router.patch("/update-user", updateUser);

export default router;
