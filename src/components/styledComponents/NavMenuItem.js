import React from "react";
import { MenuItem } from "@mui/material";
import styled from "styled-components";
import { styles } from "styles/theme";

const NavMenuItem = (props) => {
  return <MyMenuItem {...props}>{props.children}</MyMenuItem>;
};

export default NavMenuItem;

const MyMenuItem = styled(MenuItem)`
  &.MuiMenuItem-root {
    padding: 0.5rem 1rem;
    &:hover {
      background-color: ${styles.backgroundColorHover} !important;
    }
  }
`;
