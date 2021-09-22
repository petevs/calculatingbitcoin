import React from 'react'
import styled from 'styled-components'
import { TextField } from '@mui/material'


const MyTextField = styled(TextField).attrs({
  autoComplete: "off"
})`
  & .MuiFormLabel-root {
    color: #fff !important;
  }

  & .MuiInputBase-root {
    color: #fff !important;
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: #fff !important;
  }

  & ::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }
`;

export default MyTextField

