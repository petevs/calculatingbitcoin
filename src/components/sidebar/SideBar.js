import React from "react";
import styled from "styled-components";
import { menuList } from "data/sidebar";
import SideBarMenu from "./SideBarMenu";
import Logo from "../Logo";
import ProfileCard from "../ProfileCard";
import { styles } from "styles/theme";
import { Drawer } from "@mui/material";

const SideBar = () => {


  return (
    <OuterDrawer
      anchor='left'
      open={true}
      variant='permanent'
    >
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
