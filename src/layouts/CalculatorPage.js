import React from "react";
import styled from "styled-components";

const CalculatorPage = ({ title, subtitle, children }) => {
  return (
    <Wrapper>
      <TitleBox>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </TitleBox>
      {children}
    </Wrapper>
  );
};

export default CalculatorPage;

const Wrapper = styled.div`
  padding: 2rem;
  & h2 {
    padding: 1rem 0;
  }
`;

const TitleBox = styled.div`
  padding: 0 0 1rem 0;
`;
