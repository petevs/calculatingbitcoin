import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Card = ({ title, subtitle, description, img, path }) => {
    return (
        <CardLink to={path}>
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
        </CardLink>
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

const CardLink = styled(Link)`
    color: inherit;
    text-decoration: none;
`

const ImageBox = styled.div`
    display: grid;
    grid-template-columns: 150px;

    & img{
        width: 100%;
    }
`