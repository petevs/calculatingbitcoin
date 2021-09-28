import { Popover } from "@material-ui/core";
import styled from "styled-components";

const NavDropDown = (props) => {
  //   const { anchorEl, open, handleClose } = props;

  return (
    <MyMenu {...props}>
      <span className="topArrow"></span>
      {props.children}
    </MyMenu>
  );
};

export default NavDropDown;

const MyMenu = styled(Popover)`
  & span.topArrow {
    top: -7px;
    z-index: 1;
    width: 12px;
    right: 20px;
    height: 12px;
    content: "";
    position: absolute;
    border-radius: 0px 0px 4px;
    transform: rotate(-135deg);
    background: rgb(33, 43, 54);
    border-right: 1px solid rgba(145, 158, 171, 0.12);
    border-bottom: 1px solid rgba(145, 158, 171, 0.12);
  }

  & .MuiPopover-paper {
    background-color: rgb(33, 43, 54);
    color: rgb(255, 255, 255);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 8px;
    background-image: none;
    position: absolute;
    min-width: 16px;
    min-height: 16px;
    max-width: calc(100% - 32px);
    max-height: calc(100% - 32px);
    outline: 0px;
    margin-top: 12px;
    margin-left: 4px;
    overflow: inherit;
    box-shadow: rgb(0 0 0 / 24%) 0px 0px 2px 0px,
      rgb(0 0 0 / 24%) 0px 20px 40px -4px;
    border: 1px solid rgba(145, 158, 171, 0.08);
    // width: 200px;
    padding-top: 8px;
    padding-bottom: 8px;
  }
`;
