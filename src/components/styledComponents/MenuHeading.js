import React from 'react'
import styled from 'styled-components'

const MenuHeading = styled.div`
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

export default MenuHeading