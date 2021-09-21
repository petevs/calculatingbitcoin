import React from 'react'
import styled from 'styled-components'
import { styles } from "styles/theme";

const MenuWrapper = ({children}) => {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
}

export default MenuWrapper

const Wrapper = styled.div`
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
