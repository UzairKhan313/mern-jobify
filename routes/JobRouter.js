import express from "express";
import {
  deleteJob,
  getAllJobs,
  getJob,
  updateJob,
} from "../controller/JobController";
import { validateJobInput } from "../middleware/validationMiddleware";

const router = express.Router();

router.route("/").get(getAllJobs).post(validateJobInput, createJob);
router
  .route("/:id")
  .get(getJob)
  .patch(validateJobInput, updateJob)
  .delete(deleteJob);

export default router;
