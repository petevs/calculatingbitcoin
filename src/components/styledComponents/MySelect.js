import { Select } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const MySelect = ({props, children}) => {
    return (
        <StyledSelect {...props}>
            {children}
        </StyledSelect>
    )
}

export default MySelect

const StyledSelect = styled(Select)`
    color: #fff;
`