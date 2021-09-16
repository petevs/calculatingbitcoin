import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MarketDataContext } from 'state/contexts/MarketData'
import styled from 'styled-components'

const Nav = () => {

    const { marketData } = useContext(MarketDataContext)

    console.log(marketData)

    return (
        <NavBar>
            <Menu>
                <ProfileImage className='square' src='https://cdn.countryflags.com/thumbs/canada/flag-800.png' />
                <ProfileImage src='https://avatars.githubusercontent.com/u/23281466?v=4' />
                {/* <NavLink to='/'>Home</NavLink>
                <NavLink to='/calculators'>Calculators</NavLink> */}
            </Menu>
        </NavBar>
    )
}

export default Nav

const NavBar = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    padding: 1rem;
    background-color: #161C24;
    color: #002237;
    font-weight: 600;
    border-bottom: 1px solid #E7ECF2;
    @media (max-width: 768px) {
        justify-content: center;
        justify-items: center;
        grid-template-columns: 1fr;
        padding: 1rem;
    }
`

const Menu = styled.div`
    display: grid;
    grid-auto-flow: column;
    justify-content: end;
    gap: 1.5rem;
    align-items: center;
`


const NavLink = styled(Link)`
    text-decoration: none;
    color: inherit;

`
const ProfileImage = styled.img`
    width: 40px;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
        transition: all .2s ease-in-out;
        transform: scale(1.1);
    }
    &.square {
        border-radius: 0;
        width: 30px;
    }
`

