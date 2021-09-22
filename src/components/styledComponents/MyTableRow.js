import { TableRow } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const MyTableRow = ({props, children}) => {
    return (
        <StyledTableRow
            {...props}
        >
            {children}
        </StyledTableRow>
    )
}

export default MyTableRow

const StyledTableRow = styled(TableRow)`
    & td {
        color: #fff;
        padding: 0 16px;
        border: none;
    }
`