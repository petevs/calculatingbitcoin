import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "state/contexts/UserContext";
import styled from "styled-components";
import CurrencySelect from "./CurrencySelect";
import { numberWithCommas } from "utils/numberFormatting";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AvatarDropdown from "components/AvatarDropdown";


const Nav = () => {
  const { settings, marketData } = useContext(UserContext);

  const price = marketData.data.current_price[settings.currency];
  const percentageChange =
    marketData.data.price_change_percentage_24h_in_currency[settings.currency];

  const changeInPrice = Math.round(
    price - price * (1 - percentageChange / 100)
  );

  const [direction, setDirection] = useState();

  useEffect(() => {
    if (changeInPrice < 0) {
      setDirection("neg");
    } else {
      setDirection("pos");
    }
  }, [settings, changeInPrice]);

  return (
    <NavBar>
      <Menu>
        <ColOne>
          <h2>
            ${numberWithCommas(price)}
            <span className={direction}>
              {direction === "pos" ? (
                <TrendingUpIcon fontSize="inherit" />
              ) : (
                <TrendingDownIcon fontSize="inherit" />
              )}
              {`${numberWithCommas(changeInPrice)} (${percentageChange.toFixed(
                2
              )}%)`}
            </span>
          </h2>
        </ColOne>
        <CurrencySelect />
        <AvatarDropdown />
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
  //   border-bottom: 1px solid #e7ecf2;
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

const ColOne = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-self: start;
  & span {
    & svg {
      margin-right: 0.25rem;
    }
    font-size: 0.75rem;
    padding-left: 0.5rem;
    color: #408e36;
    &.neg {
      color: #f72e2f;
    }
  }
`;