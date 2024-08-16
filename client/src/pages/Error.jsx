import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import errorImg from "../assets/images/not-found.svg";

const Error = () => {
  const error = useRouteError();
  console.log(error);

  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={errorImg} alt="Error-not-found" />
          <h3>Ooh! page not found</h3>
          <p>we can't seem to find to the page you looking for.</p>
          <Link to="/dashboard">Back Home</Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>
        <h3>Something went wrong.</h3>
      </div>
    </Wrapper>
  );
};
export default Error;
