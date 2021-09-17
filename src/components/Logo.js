import React from 'react'
import styled from 'styled-components'

const Logo = () => {
    return (
        <MyLogo>
            <Image src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579" alt='bitcoin logo' />
            <Headline>Calculating Bitcoin</Headline>
        </MyLogo>
    )
}

export default Logo

const MyLogo = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    justify-items: start;
    align-items: center;
    letter-spacing: -.5px;
    font-size:  .75rem;
    margin: 1.5rem;
    cursor: pointer;
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
    font-size: 1.25rem;
    text-transform: capitalize;
    color: #555;
`