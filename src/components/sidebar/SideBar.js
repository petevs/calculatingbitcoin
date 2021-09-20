import React from "react";
import styled from "styled-components";
import { menuList } from "data/sidebar";
import SideBarMenu from "./SideBarMenu";
import Logo from "../Logo";
import ProfileCard from "../ProfileCard";
import { styles } from "styles/theme";

const SideBar = () => {
  return (
    <MyDrawer>
      <Logo />
      <ProfileCard
        name="Pete"
        img="https://avatars.githubusercontent.com/u/23281466?v=4"
      />
      {menuList.map((item) => {
        return <SideBarMenu item={{ ...item }} />;
      })}
    </MyDrawer>
  );
};

export default SideBar;

const MyDrawer = styled.div`
  display: grid;
  align-content: start;
  gap: 0rem;
  border-right: 1px solid rgba(145, 158, 171, 0.24);
  background-color: ${styles.backgroundColor};
  grid-area: sidecar;

  //   @media (max-width: 1024px) {
  //     display: none;
  //   }
`;
