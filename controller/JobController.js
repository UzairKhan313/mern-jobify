import { StatusCodes } from "http-status-codes";

import Job from "../models/JobModel.js";

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(200).json({ jobs });
};

export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  // if (!job) {
  //   throw new NotFoundError(`no job with id : ${id}`);
  //   // return res.status(404).json({ msg: `no job with id ${id}` });
  // }
  res.status(200).json({ job });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);

  // if (!removedJob) {
  //   // return res.status(404).json({ msg: `no job with id ${id}` });
  //   throw new NotFoundError(`no job with id : ${id}`);
  // }
  res.status(200).json({ job: removedJob });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  // if (!updatedJob) {
  //   // return res.status(404).json({ msg: `no job with id ${id}` });
  //   throw new NotFoundError(`no job with id : ${id}`);
  // }

  res.status(200).json({ job: updatedJob });
};
