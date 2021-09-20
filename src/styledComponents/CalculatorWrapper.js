import React from "react";
import styled from "styled-components";

const CalculatorWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default CalculatorWrapper;

const Wrapper = styled.div`
  padding: 2rem;
  & h2 {
    padding: 1rem 0;
  }
`;
