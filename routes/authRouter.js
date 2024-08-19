import { Router } from "express";
import rateLimit from "express-rate-limit";
import { register, login, logout } from "../controller/authController.js";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middleware/validationMiddleware.js";
const router = Router();

const apiReteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minuets
  max: 15, // maximum request in 15 minutes.
  message: { msg: "IP Rate Exceeded. Pleasae try again after 15 minutes." },
});

router.post("/register", apiReteLimiter, validateRegisterInput, register);
router.post("/login", apiReteLimiter, validateLoginInput, login);
router.get("/logout", logout);

export default router;
