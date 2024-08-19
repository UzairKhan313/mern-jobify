import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();
  return <h4>There was as an Error.</h4>;
};

export default ErrorElement;
