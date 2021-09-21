import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { styles } from 'styles/theme'

const SideBarItem = ({item}) => {
    return (
        <MyLink to={item.path}>
            <Heading>
                {item.icon}
                {item.title}
            </Heading>
        </MyLink>
    )
}

export default SideBarItem

const Heading = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: .5rem;
    font-size: .875rem;
    color: ${styles.fontColor};
    font-weight: 400;
    padding: 1rem 2rem;
    cursor: pointer;
    
    &:hover {
        background-color: ${styles.backgroundColorHover} !important;
    }
`
const MyLink = styled(Link)`
    text-decoration: none;
`