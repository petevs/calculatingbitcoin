import React from 'react'
import styled from 'styled-components'

const Card = ({ title, subtitle, description, img }) => {
    return (
        <Wrapper>
            <ImageBox>
                <img
                    src='https://images.unsplash.com/photo-1631102403791-8e33d9be6603?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'

                    alt='placeholder'
                />
            </ImageBox>
            <div>
                <h1>{title}</h1>
                <h4>{subtitle}</h4>
                <p>{description}</p>
            </div>
        </Wrapper>
    )
}

export default Card

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1rem;
    border: solid .1rem #E7ECF2;
    padding: 1rem;
`

const ImageBox = styled.div`
    display: grid;
    grid-template-columns: 150px;

    & img{
        width: 100%;
    }
`