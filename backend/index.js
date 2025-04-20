import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import logger from "./src/utils/logger.js";

import { connectDb } from "./src/db/connect.js";

// Express app
const app = express();

// Frontend URL
const FRONTEND_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5173"
    : process.env.FRONTEND_URL;

// Middlewares
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Logger for api's
const morganFormat = ":method :url :status :response-time ms";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// Port
const PORT = process.env.PORT || 4000;

// App routes
import { authRouter } from "./src/routes/auth.route.js";
import {dataIntakeRouter} from "./src/routes/dataIntake.route.js"
import {riskRouter} from "./src/routes/risk.route.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/data",dataIntakeRouter);
app.use("/api/v1/prediction",riskRouter);

// App started
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
