import React from 'react'
import styled from 'styled-components'

const SummaryRow = ({children}) => {


    const Wrapper= styled.div`
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        padding: 1rem 0 1rem;
        `;

    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
}

export default SummaryRow
