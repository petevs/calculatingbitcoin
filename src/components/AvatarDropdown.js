import React, { useState, useContext } from "react";
import NavDropDown from "components/styledComponents/NavDropDown";
import { Avatar, Button, MenuItem } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import styled from "styled-components";
import { styles } from "styles/theme";
import { Link, useHistory } from "react-router-dom";

import { AuthContext } from "state/contexts/Auth";
import { auth } from "firebase";

const AvatarDropdown = () => {
  const history = useHistory();

  const { user } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <MyAvatar onClick={handleClick} />
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
        <MenuWrapper>
          <Link to="/user">
            <Heading>
              <PersonIcon />
              Profile
            </Heading>
          </Link>
          <Link to="/settings">
            <Heading>
              <SettingsIcon />
              Settings
            </Heading>
          </Link>
          {!user.uid ? (
            <LinkButton to="/user/login">Login</LinkButton>
          ) : (
            <button
              onClick={() => auth.signOut().then(() => history.push("/"))}
            >
              Logout
            </button>
          )}
        </MenuWrapper>
      </NavDropDown>
    </>
  );
};

export default AvatarDropdown;

const MyAvatar = styled(Avatar)`
  cursor: pointer;
`;

const MenuWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  min-width: 200px;

  & a {
    text-decoration: none;
  }
  & div {
    padding: 0.5rem;
    &:hover {
      background-color: ${styles.backgroundColorHover};
    }
  }
  & button {
    border: 1px solid #fff;
    padding: 0.5rem;
    width: 75%;
    margin: 0.5rem 0;
    border-radius: 0.5rem;
    justify-self: center;
    background-color: transparent;
    color: #fff;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    &:hover {
      background-color: ${styles.backgroundColorHover};
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

const LinkButton = styled(Link)`
  border: 1px solid #fff;
  padding: 0.5rem;
  width: 75%;
  margin: 0.5rem 0;
  border-radius: 0.5rem;
  justify-self: center;
  background-color: transparent;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  &:hover {
    background-color: ${styles.backgroundColorHover};
  }
`;
