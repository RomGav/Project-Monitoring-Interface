import express from "express";
import { register, login, logout, validate } from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { onlyDevelopers } from "../middlewares/developerOnlyMiddleware.js";

const router = express.Router();

router.post("/register", isAuthenticated, onlyDevelopers, register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/validate", isAuthenticated, validate);

export default router