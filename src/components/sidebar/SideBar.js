import React, { useState } from "react";
import styled from "styled-components";
import { menuList } from "data/sidebar";
import SideBarMenu from "./SideBarMenu";
import Logo from "../Logo";
import ProfileCard from "../ProfileCard";
import { styles } from "styles/theme";
import { ClickAwayListener, Drawer } from "@mui/material";
import { StyledButton } from "components/styledComponents/Button";

const SideBar = () => {

  const [open, setOpen] = useState(true)

  const handelDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => [
    setOpen(false)
  ]

  return (
    <OuterDrawer
        anchor='left'
        open={open}
        variant='permanent'
      >
    <ClickAwayListener onClickAway={handleDrawerClose}>
        <InnerDrawer>
          <Logo />
          <ProfileCard
            name="Pete"
            img="https://avatars.githubusercontent.com/u/23281466?v=4"
          />
          {menuList.map((item) => {
            return <SideBarMenu key={item.title} item={{ ...item }} />;
          })}
        </InnerDrawer>
    </ClickAwayListener>
      </OuterDrawer>
  );
};

export default SideBar;

const OuterDrawer = styled(Drawer)`
  grid-area: sidecar;
  & .MuiPaper-root {
    background-color: ${styles.backgroundColor};
    border-right: 1px solid rgba(145, 158, 171, 0.24);
  }
`


const InnerDrawer = styled.div`
  display: grid;
  align-content: start;
  gap: 0rem;
  grid-area: sidecar;
`;
