import React from 'react'
import styled from 'styled-components'

const CalcContainer = ({ children }) => {
    return (
        <Container>
            <Wrapper>
                {children}
            </Wrapper>
        </Container>
    )
}

export default CalcContainer

const Container = styled.div`
    display: grid;
    grid-template-columns: minmax(auto, 960px);
    justify-content: center;
    gap: 2rem;
    padding-bottom: 2rem;
`

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    align-items: start;
`