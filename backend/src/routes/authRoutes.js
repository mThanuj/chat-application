import { Router } from "express";
import { signup, login, logout,refreshAccessToken } from "../controllers/authController.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.post("/refreshToken",refreshAccessToken);
export default router;
