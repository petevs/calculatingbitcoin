import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CalculateIcon from '@mui/icons-material/Calculate';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SideBar = () => {
    return (
        <MyDrawer>
            <Logo>
                <Image src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579" alt='bitcoin logo' />
                <Headline>Calculating Bitcoin</Headline>
            </Logo>
            <ProfileCard>
                <ProfileImage src='https://res.cloudinary.com/minimal-ui/image/upload/v1614655910/upload_minimal/avatar/minimal_avatar.jpg' />
                <div>
                    <h5>User Name</h5>
                    <h6>Some Text</h6>
                </div>
            </ProfileCard>
            <Heading>
                        <BusinessCenterIcon />
                        <span>Portfolio</span>
                    </Heading>
            <Heading>
                        <QueryStatsIcon />
                        <span>Current Market</span>
                    </Heading>
            <MyAccordion>
                <MyAccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <MenuHeading>
                        <CalculateIcon />
                        <span>Calculators</span>
                    </MenuHeading>
                </MyAccordionSummary>
                    <AccordionDetails>
                        <MyList>
                                <li>
                                    <Link to='/calculators/hello'>
                                        Sell and Buy Back
                                    </Link>
                                </li>
                            <li>                                <Link to='/calculators/dca'>
                                    Dollar Cost Average
                                </Link></li>
                        </MyList>
                    </AccordionDetails>
            </MyAccordion>
            <Heading>
                        <PersonIcon />
                        <span>Profile</span>
                    </Heading>
            <Heading>
                        <SettingsIcon />
                        <span>Settings</span>
                    </Heading>
        </MyDrawer>
    )
}

export default SideBar

const MyDrawer = styled.div`
    display: grid;
    align-content: start;
    gap: 0rem;
    border-right: 1px solid rgba(145, 158, 171, 0.24);
    background-color: #fff;
    grid-area: sidecar;

    // & h3{
    //     text-transform: uppercase;
    //     font-size: .75rem;
    //     color: rgb(33, 43, 54);
    // }
`

const ProfileCard = styled.div`
    display: grid;
    grid-template-columns: 40px 1fr;
    grid-template-rows: 40px;
    background-color: #F2F3F5;
    border-radius: 1rem;
    padding: 1rem;
    gap: 1rem;
    align-items: center;
    margin: 1rem;
`

const ProfileImage = styled.img`
    width: 100%;
    border-radius: 50%;
`

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

const Logo = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    justify-items: start;
    align-items: center;
    letter-spacing: -1px;
    font-size:  .75rem;
    margin: 1.5rem;
`

const Image = styled.img`
    width: 20px;
    justify-self: end;
    box-shadow: 2px 3px 3px rgba(0,0,0,0.3);
    border-radius: 50%;
`

const Headline = styled.h1`
    padding-left: .5rem;
    // text-shadow: 2px 3px 3px rgba(0,0,0,0.3);
    font-size: 1rem;
    text-transform: uppercase;
    color: rgba(0,0,0,0.85);
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