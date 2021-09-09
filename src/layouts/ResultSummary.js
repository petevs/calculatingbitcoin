import React from 'react'
import styled from 'styled-components'

const ResultSummary = ({ children }) => {
    return (
        <Box>
            {children}
        </Box>
    )
}

export default ResultSummary

const Box = styled.div`
    display: grid;
    grid-auto-flow: row;
    gap: .5rem;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 1rem;
    margin: 1rem -1rem 0;
    text-align: center;
    // line-height: 1;

    p {
        font-size: .75rem;
        margin: 0;
        color: #54575a;
    }

    h3 {
        font-size: 1.5rem;
        margin: 0;
    }
`
