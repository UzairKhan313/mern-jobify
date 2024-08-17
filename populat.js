import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import User from "./models/UserModel.js";
import Job from "./models/JobModel.js";

try {
  // connecting to the data base.
  await mongoose.connect(process.env.MONGO_URL);

  // finding user with email.
  const user = await User.findOne({ email: "test@test.com" });

  // Parsing JSON to array.
  const jsonJobs = JSON.parse(
    await readFile(new URL("./utils/mockData.json", import.meta.url))
  );

  //   adding createdBy to array list
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id };
  });

  // Deleting all jobs that are associated with that test user.
  await Job.deleteMany({ createdBy: user._id });

  // adding job in the database.
  await Job.create(jobs);
  console.log("Success!!!");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
