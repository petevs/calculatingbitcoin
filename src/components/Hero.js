import React from 'react'
import styled from 'styled-components'

const Hero = ({ title, subtitle }) => {
    return (
        <Wrapper>
            <Headline>{title}</Headline>
            <h2>{subtitle}</h2>
        </Wrapper>
    )
}

export default Hero

const Wrapper = styled.div`
    display: grid;
    min-height: 300px;
    grid-template-columns: 1fr;
    justify-content: center;
    align-content: center;
    text-align: center;
`

const Headline = styled.h1`
    font-size: 3.2rem;
`