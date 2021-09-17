import React from "react";
import Hero from "components/Hero";
import styled from "styled-components";

const CalculatorPage = ({ title, subtitle, children }) => {
  return (
    <Wrapper>
      <Hero title={title} subtitle={subtitle} />
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
