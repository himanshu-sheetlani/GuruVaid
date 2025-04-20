import express from "express";
import { protectedRoute } from "../middlewares/auth.js";
import { predictMentalHealthScore } from "../controllers/risk.controller.js";

const riskRouter = express.Router();

riskRouter.get(
  "/predict-mental-health",
  protectedRoute,
  predictMentalHealthScore
);

export { riskRouter };
