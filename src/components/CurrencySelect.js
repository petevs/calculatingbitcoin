import React, { useState, useContext, useEffect } from "react";
import { Popover, MenuItem, Button } from "@material-ui/core";
import styled from "styled-components";
import { styles } from "styles/theme";
import { UserContext } from "state/contexts/UserContext";
import { updateSettings } from "state/actions/updateSettings";

const CurrencySelect = () => {
  const { settings, settingsDispatch } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSettingsChange = (event) => {
    const { name, myValue } = event.currentTarget.dataset;
    const payload = {
      name: name,
      value: myValue,
    };
    settingsDispatch(updateSettings(payload));
    handleClose();
  };

  const [menuImage, setMenuImage] = useState("");

  useEffect(() => {
    if (settings.currency === "cad") {
      setMenuImage("https://cdn.countryflags.com/thumbs/canada/flag-800.png");
    } else {
      setMenuImage(
        "https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png"
      );
    }
  }, [settings.currency]);

  return (
    <>
      <Image onClick={handleClick} src={menuImage} />
      <MyMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <span className="topArrow"></span>
        <MyMenuItem
          data-name="currency"
          data-my-value="cad"
          onClick={(event) => handleSettingsChange(event)}
        >
          <Heading>
            <img
              src="https://cdn.countryflags.com/thumbs/canada/flag-800.png"
              alt="canada flag"
            />
            CAD
          </Heading>
        </MyMenuItem>
        <MyMenuItem
          data-name="currency"
          data-my-value="usd"
          onClick={(event) => handleSettingsChange(event)}
        >
          <Heading>
            <img
              src="https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png"
              alt="us flag"
            />
            USD
          </Heading>
        </MyMenuItem>
      </MyMenu>
    </>
  );
};

export default CurrencySelect;

const MyButton = styled(Button)`
  height: 100%;
`;

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

const Image = styled.img`
  border-radius: 0;
  width: 100%;
  height: auto;
  cursor: pointer;
  &:hover {
    transition: all 0.2s ease-in-out;
    transform: scale(1.1);
  }
`;

const MyMenuItem = styled(MenuItem)`
  &.MuiMenuItem-root {
    padding: 0.5rem 1rem;
    &:hover {
      background-color: ${styles.backgroundColorHover} !important;
    }
  }
`;

const Heading = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  min-width: 150px;
  gap: 1.5rem;
  font-size: 0.875rem;
  color: rgb(255, 255, 255);
  font-weight: 400;
  cursor: pointer;

  & img {
    width: 30px;
  }
`;
