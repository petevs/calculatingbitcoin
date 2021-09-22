import React from 'react'
import styled from 'styled-components'
import { TextField } from '@mui/material'

const MyTextField = (props) => {
    return (
        <StyledField {...props} autoComplete="off"/>
    )
}

export default MyTextField

const StyledField = styled(TextField)`
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

