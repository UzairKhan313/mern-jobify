import "express-async-errors";
import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import { authenticateUser } from "./middleware/authMiddleware.js";
import errorHandlerMiddleware from "./middleware/ErrorHandler.js";

import authRouter from "./routes/authRouter.js";
import jobRouter from "./routes/JobRouter.js";
import userRouter from "./routes/userRoutes.js";

// Setting path to the dotenv file.
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// For parsing json data.
app.use(express.json());
// Cookie parser.
app.use(cookieParser());

// Fon environment varaible.
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/job", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);

// Not found Routes Error.
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

//Error Handler Middlewar.
app.use(errorHandlerMiddleware);

try {
  mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(
      `server running and connected to Database on http://localhost:${port}`
    );
  });
} catch (error) {
  console.log(error);
  console.log("falid to connect to the data base.");
  process.exit(1);
}
