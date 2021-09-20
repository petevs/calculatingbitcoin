import React, { useState, useContext, useEffect } from "react";
import { Popover, MenuItem, Button } from "@material-ui/core";
import styled from "styled-components";
import { styles } from "styles/theme";
import { UserContext } from "state/contexts/UserContext";
import { updateSettings } from "state/actions/updateSettings";
import NavDropDown from "components/styledComponents/NavDropDown";
import NavMenuItem from "components/styledComponents/NavMenuItem";

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
      <NavDropDown
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
        <NavMenuItem
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
        </NavMenuItem>
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
      </NavDropDown>
    </>
  );
};

export default CurrencySelect;

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
