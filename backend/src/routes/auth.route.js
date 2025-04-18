import express from "express";
import { signup, logout, checkAuth } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middlewares/auth.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.get("/logout", logout);
authRouter.get("/check-auth", protectedRoute, checkAuth);

export { authRouter };
