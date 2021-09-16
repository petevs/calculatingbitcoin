import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CalculateIcon from '@mui/icons-material/Calculate';


const SideBarMenu = ({item}) => {

    return (
        <MyAccordion>
        <MyAccordionSummary
            expandIcon={<ExpandMoreIcon />}
        >
            <MenuHeading>
                {/* {item.icon} */}
                {/* <span>{item.title}</span> */}
            </MenuHeading>
        </MyAccordionSummary>
            <AccordionDetails>
                <MyList>
                        <li>
                            <Link to='/calculators/hello'>
                                Sell and Buy Back
                            </Link>
                        </li>
                    <li>
                        <Link to='/calculators/dca'>
                            Dollar Cost Average
                        </Link></li>
                </MyList>
            </AccordionDetails>
    </MyAccordion>
    )
}

export default SideBarMenu

const MenuHeading = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: .5rem;
    font-size: .875rem;
    color: rgb(99, 115, 129);
    font-weight: 400;
    padding: 0 1rem;

`

const MyAccordion = styled(Accordion)`
    box-shadow: none !important;

    &.Mui-expanded {
        margin: 0 !important;
    }
    &:before {
        background-color: transparent !important;
    }
`

const MyAccordionSummary = styled(AccordionSummary)`
    &.Mui-expanded{
        min-height: 0 !important;
    }
    &:hover {
        background-color: #F7F7F8 !important;
    }
`

const MyList = styled.ul`
    color: rgb(99, 115, 129);
    padding-left: 2.5rem;
    font-size: .875rem;

    & li {
        padding: .5rem 0;
    }

    & a {
        text-decoration: none;
        color: inherit;
    }
`