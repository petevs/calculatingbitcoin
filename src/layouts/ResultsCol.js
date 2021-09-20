import React from "react";
import styled from "styled-components";

const ResultsCol = ({ children }) => {
  return (
    <Wrapper>
      <Header>
        <h2>Results</h2>
      </Header>
      {children}
    </Wrapper>
  );
};

export default ResultsCol;

const Wrapper = styled.div`
  box-shadow: 0 15px 35px 0 rgb(42 51 83 / 12%), 0 5px 15px rgb(0 0 0 / 6%);
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr;
  align-content: start;
  padding: 1rem;
  gap: 0.5rem;
  background-color: #212b36;
`;

const Header = styled.div`
  text-align: center;
  margin: 0 -1rem 1rem;
  border-bottom: 1px solid #ccc;
  font-size: 1.1rem;
  letter-spacing: -1px;
  color: #fff;
`;
