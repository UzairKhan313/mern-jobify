import React from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAllJobsContext } from "../pages/AllJobs";

const PageBtnContainer = () => {
  const navigate = useNavigate();
  const { search, pathname } = useLocation();
  const {
    data: { numOfPages, currentPage },
  } = useAllJobsContext();

  //Creating array from the length of the no of pages.
  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prePage = currentPage - 1;
          if (prePage < 1) {
            prePage = numOfPages;
          }
          handlePageChange(prePage);
        }}
      >
        <HiChevronDoubleLeft />
        Prev
      </button>
      <div className="btn-conatainer">
        {pages.map((num) => {
          return (
            <button
              className={`btn page-btn ${currentPage === num && "active"}`}
              key={num}
              onClick={() => handlePageChange(num)}
            >
              {num}
            </button>
          );
        })}
      </div>
      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numOfPages) {
            prePage = 1;
          }
          handlePageChange(nextPage);
        }}
      >
        Next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
