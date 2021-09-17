import React from "react";
import styled from "styled-components";

const CalcColumn = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default CalcColumn;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  background-color: #212b36;
  box-shadow: rgb(145 158 171 / 24%) 0px 0px 2px 0px,
    rgb(145 158 171 / 24%) 0px 16px 32px -4px;
  padding: 1rem;
  border-radius: 1rem;
`;
