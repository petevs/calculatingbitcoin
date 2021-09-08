import React from 'react'
import styled from 'styled-components'

const PageWrapper = ({ children }) => {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
}

export default PageWrapper

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    padding: 1rem;
`