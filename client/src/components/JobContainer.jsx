import React from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllJobsContext } from "../pages/AllJobs";
import Job from "./Job";
// import PageBtnContainer from "./PageBtnContainer";
import PageBtnContainerComplex from "./PageBtnContainerComplex";

const JobContainer = () => {
  const { data } = useAllJobsContext();
  const { jobs, totalJobs, numOfPages } = data;

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No Jobs to display....</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} Found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {/* {numOfPages > 1 && <PageBtnContainer />} */}
      {numOfPages > 1 && <PageBtnContainerComplex />}
    </Wrapper>
  );
};

export default JobContainer;
