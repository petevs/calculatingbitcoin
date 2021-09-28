import { TableHead } from '@mui/material'
import styled from 'styled-components'



const MyTableHead = styled(TableHead)`

    & th {
        color: #fff;
        background-color: #333d48;
        border-bottom: none;
        padding: 8px 16px;
        text-transform: uppercase;
        &:first-of-type {
            border-radius: 0.5rem 0 0 0.5rem;
        }
        &:last-of-type {
            border-radius: 0 0.5rem 0.5rem 0;
        }
    }
`

export default MyTableHead