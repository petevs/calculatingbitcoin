import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { MarketDataContext } from "state/contexts/MarketData";
import { UserContext } from "state/contexts/UserContext";
import { updateSettings } from "state/actions/updateSettings";
import styled from "styled-components";
import CurrencySelect from "./CurrencySelect";

const Nav = () => {
  const { marketData } = useContext(MarketDataContext);
  const { settings, settingsDispatch } = useContext(UserContext);

  const handleSettingsChange = (e) => {
    const payload = {
      name: e.target.name,
      value: e.target.value,
    };
    settingsDispatch(updateSettings(payload));
  };

  return (
    <NavBar>
      <Menu>
        <select
          name="currency"
          value={settings.currency}
          onChange={handleSettingsChange}
        >
          <option value="cad">CAD</option>
          <option value="usd">USD</option>
        </select>
        <CurrencySelect />
        <Link to="/user">
          <ProfileImage src="https://avatars.githubusercontent.com/u/23281466?v=4" />
        </Link>
      </Menu>
    </NavBar>
  );
};

export default Nav;

const NavBar = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-content: center;
  padding: 1rem;
  background-color: #161c24;
  color: #002237;
  font-weight: 600;
  height: 100%;
  border-bottom: 1px solid #e7ecf2;
  @media (max-width: 768px) {
    justify-content: center;
    justify-items: center;
    grid-template-columns: 1fr;
    padding: 1rem;
  }
  & h2 {
    color: #fff;
  }
`;

const Menu = styled.div`
  display: grid;
  grid-template-columns: 1fr 40px 40px;
  justify-items: center;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
const ProfileImage = styled.img`
  width: 100%;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    transition: all 0.2s ease-in-out;
    transform: scale(1.1);
  }
`;
