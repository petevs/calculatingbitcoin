import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { numberWithCommas } from 'utils/numberFormatting'

const Nav = () => {

    const [marketStats, setMarketStats] = useState(null)

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/bitcoin?localization=cad')
            .then(res => {
                const data = res.data.market_data
                setMarketStats(data)
            })
    }, [])


    return (
        <NavBar>
            <Logo>
                <Image src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579" alt='bitcoin logo' />
                <Headline>Calculating Bitcoin</Headline>
            </Logo>
            <Menu>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/calculators'>Calculators</NavLink>
                {marketStats && <p>${numberWithCommas(marketStats.current_price.cad)}</p>}
            </Menu>
        </NavBar>
    )
}

export default Nav

const NavBar = styled.div`
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    padding: 1rem;
    background-color: #fff;
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
    gap: 1rem;
    align-items: center;
`


const NavLink = styled(Link)`
    text-decoration: none;
    color: inherit;

`

const Logo = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    justify-items: start;
    align-items: center;
    letter-spacing: -1px;
    font-size:  .75rem;
`

const Image = styled.img`
    width: 25px;
    justify-self: end;
    box-shadow: 2px 3px 3px rgba(0,0,0,0.3);
    border-radius: 50%;
`

const Headline = styled.h1`
    padding-left: .5rem;
    // text-shadow: 2px 3px 3px rgba(0,0,0,0.3);
`