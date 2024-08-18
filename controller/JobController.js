import day from "dayjs";
import { StatusCodes } from "http-status-codes";

import Job from "../models/JobModel.js";
import mongoose from "mongoose";

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const getAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (req.user.role === "admin") {
    delete queryObject.createdBy;
  }

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }

  if (jobStatus && jobStatus !== "all") {
    queryObject.jobStatus = jobStatus;
  }

  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  const sortOption = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const sortKey = sortOption[sort] || sortOption.newest;

  // Setup Pagination.
  const page = Number(req.query.page) || 1;
  const itemPerPage = Number(req.query.limit) || 10;

  const skip = (page - 1) * itemPerPage;

  const totalJobs = await Job.countDocuments(queryObject);
  const jobs = await Job.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(itemPerPage);

  const numOfPages = Math.ceil(totalJobs / itemPerPage);

  res.status(200).json({ jobs, totalJobs, numOfPages, currentPage: page });
};

export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  res.status(200).json({ job });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);
  res.status(200).json({ job: removedJob });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json({ job: updatedJob });
};

export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } }, // Getting all the job of the speciffic user.
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } }, // Getting all the job Status group by jobStatus.
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } }, // Getting all the job of the speciffic user.
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      }, // Getting application couunt base on the year and month.
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } }, // sorting on base of _id field that we create just above pipline.

    { $limit: 6 }, //limiting the results.
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse();

  // converting monthlyApplication to  monthlyApplications = [
  //   {
  //     date: "May 23",
  //     count: 12,
  //   },
  // ];
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
