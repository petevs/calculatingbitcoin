import React from "react";
import styled from "styled-components";

const CardWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default CardWrapper;

const Wrapper = styled.div`
  display: grid;
  background-color: rgb(33, 43, 54);
  color: #fff;
  box-shadow: rgb(0 0 0 / 24%) 0px 0px 2px 0px,
    rgb(0 0 0 / 24%) 0px 16px 32px -4px;
  border-radius: 15px;
  padding: 2rem;
  max-width: 300px;
  justify-content: center;
  text-align: center;
  gap: 1rem;

  & a {
    color: white;
    text-decoration: none;
  }
`;
