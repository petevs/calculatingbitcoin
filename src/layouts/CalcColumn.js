import React from 'react'
import styled from 'styled-components'

const CalcColumn = ({ children }) => {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
}

export default CalcColumn

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;
`