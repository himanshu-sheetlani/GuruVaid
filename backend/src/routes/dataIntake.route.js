import express from "express";
import { protectedRoute } from "../middlewares/auth.js";
import { uploadHealthData,getSmartWatchData } from "../controllers/dataIntake.controller.js";
const dataIntakeRouter = express.Router();

dataIntakeRouter.post("/upload", protectedRoute, uploadHealthData);
dataIntakeRouter.get('/smartwatch-user', getSmartWatchData);

export { dataIntakeRouter };
