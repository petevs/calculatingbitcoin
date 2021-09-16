import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const SideBarHeading = ({item}) => {

    if (item.subMenu) {
        return(
            <>
            <MyAccordion>
                <MyAccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <MenuHeading>
                        {item.icon}
                        <span>{item.title}</span>
                    </MenuHeading>
                </MyAccordionSummary>
                <AccordionDetails>
                    <MyList>
                        {item.subMenu.map(subMenuItem => {
                            return(
                                <li>
                                    <Link to={subMenuItem.path}>
                                        {subMenuItem.title}
                                    </Link>
                                </li>
                            )
                        })}
                    </MyList>
                </AccordionDetails>
                </MyAccordion>
            </>
        )
    }


    return (
        <Heading>
            {item.icon}
            <p>{item.title}</p>
        </Heading>
    )
}

export default SideBarHeading

const Heading = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: .5rem;
    font-size: .875rem;
    color: rgb(99, 115, 129);
    font-weight: 400;
    padding: 1rem 2rem;
    cursor: pointer;
    
    &:hover {
        background-color: #F7F7F8 !important;
    }
`

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