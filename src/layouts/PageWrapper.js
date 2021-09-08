import React from 'react'
import styled from 'styled-components'

const PageWrapper = ({ children }) => {
    return (
        <Wrapper>
            <InnerWrapper>
                {children}
            </InnerWrapper>
        </Wrapper>
    )
}

export default PageWrapper

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    padding: 1rem;
    justify-items: center;
`

const InnerWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    max-width: 960px;
    gap: 1rem;
`