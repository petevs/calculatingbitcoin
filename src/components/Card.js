import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Card = ({ title, subtitle, description, img, path }) => {
    return (
        <CardLink to={path}>
            <Wrapper>
                <ImageBox>
                    <img
                        src={img}
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
    @media only screen and (max-width: 600px) {
        grid-template-columns: 1fr;
        justify-items: center;
        text-align: center;
    }
`

const CardLink = styled(Link)`
    color: inherit;
    text-decoration: none;
`

const ImageBox = styled.div`
    display: grid;
    grid-template-columns: 150px;
    @media only screen and (max-width: 600px) {
        grid-template-columns: 1fr;
    }


    & img{
        width: 100%;
    }
`