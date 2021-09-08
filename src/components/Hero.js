import React from 'react'
import styled from 'styled-components'

const Hero = ({ title, subtitle }) => {
    return (
        <Wrapper>
            <h2>{title}</h2>
            <h4>{subtitle}</h4>
        </Wrapper>
    )
}

export default Hero

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    text-align: center;
`