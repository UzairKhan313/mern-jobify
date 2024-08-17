import { Router } from "express";
import { authorizePermissions } from "../middleware/authMiddleware.js";

const router = Router();

import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
} from "../controller/UserController.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import upload from "../middleware/multerMiddleware.js";

router.get("/current-user", getCurrentUser);
router.get(
  "/admin/app-stats",
  authorizePermissions("admin"),
  getApplicationStats
);
router.patch(
  "/update-user",
  upload.single("avatar"),
  validateUpdateUserInput,
  updateUser
);

export default router;
