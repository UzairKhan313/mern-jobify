import React, { createContext, useContext } from "react";

import { SearchContainer, JobContainer } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/jobs");
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

// Crating job context.
const AllJobsContext = createContext();

const AllJobs = () => {
  const data = useLoaderData();

  return (
    <AllJobsContext.Provider value={{ data }}>
      <SearchContainer />
      <JobContainer />
    </AllJobsContext.Provider>
  );
};

export default AllJobs;

export const useAllJobsContext = () => {
  return useContext(AllJobsContext);
};
