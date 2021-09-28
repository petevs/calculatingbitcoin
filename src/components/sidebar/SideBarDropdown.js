import React from "react";
import styled from "styled-components";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SubMenuItem from "./SubMenuItem";
import { styles } from "styles/theme";

const SideBarDropdown = ({ item }) => {
  return (
    <MyAccordion>
      <MyAccordionSummary expandIcon={<ExpandMoreIcon />}>
        <MenuHeading>
          {item.icon}
          <span>{item.title}</span>
        </MenuHeading>
      </MyAccordionSummary>

      <MyAccordionDetails>
        <MyList>
          {item.subMenu.map((subMenuItem) => {
            return <SubMenuItem key={subMenuItem.title} item={{ ...subMenuItem }} />;
          })}
        </MyList>
      </MyAccordionDetails>
    </MyAccordion>
  );
};

export default SideBarDropdown;

const MenuHeading = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: rgb(145, 158, 171);
  font-weight: 400;
  padding: 0 1rem;
`;

const MyAccordion = styled(Accordion)`
  box-shadow: none !important;

  &.Mui-expanded {
    margin: 0 !important;
  }
  &:before {
    background-color: transparent !important;
  }
`;

const MyAccordionSummary = styled(AccordionSummary)`
  background-color: ${styles.backgroundColor} !important;
  &.Mui-expanded {
    min-height: 0 !important;
  }
  &:hover {
    background-color: ${styles.backgroundColorHover} !important;
  }
  & span {
    color: ${styles.fontColor};
  }

  .MuiAccordionSummary-content.Mui-expanded {
    margin: 0;
  }
`;

const MyAccordionDetails = styled(AccordionDetails)`
  background-color: ${styles.backgroundColor} !important;
`;

const MyList = styled.ul`
  color: rgb(99, 115, 129);
  padding-left: 2.5rem;
  font-size: 0.875rem;

  & li {
    padding: 0.5rem 0;
  }

  & a {
    text-decoration: none;
    color: inherit;
  }
`;
