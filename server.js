import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";

// Setting path to the dotenv file.
dotenv.config();

const app = express();

// For parsing json data.
app.use(express.json());

// Fon environment varaible.
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.listen(5100, () => {
  console.log("Server is Runining on port : " + 5100);
});
