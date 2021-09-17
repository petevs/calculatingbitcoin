import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SubMenuItem = ({ item }) => {
  return (
    <ListItem>
      <Link to={item.path}>{item.title}</Link>
    </ListItem>
  );
};

export default SubMenuItem;

const ListItem = styled.li`
  &:hover {
    color: #fff;
  }
`;
