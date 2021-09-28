import { MenuItem } from "@mui/material";
import styled from "styled-components";
import { styles } from "styles/theme";


const NavMenuItem = styled(MenuItem)`
  &.MuiMenuItem-root {
    padding: 0.5rem 1rem;
    &:hover {
      background-color: ${styles.backgroundColorHover} !important;
    }
  }
`;

export default NavMenuItem;