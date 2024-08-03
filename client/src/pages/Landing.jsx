import styled from "styled-components";

const Landing = () => {
  return (
    <div>
      <h1>Landing</h1>
      <StyledButton>Click Me</StyledButton>
    </div>
  );
};

const StyledButton = styled.button`
  background-color: red;
  color: white;
`;
export default Landing;
