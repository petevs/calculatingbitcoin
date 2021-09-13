import React from 'react'
import styled from 'styled-components'

const Row = (props) => {

    const { item } = props

    const columns = []

    for (const key in item) {
        columns.push(item[key])
    }

    return (
        <MyRow>
            {columns.map(val => {
                return (<Cell>
                    {val}
                </Cell>)
            })}
        </MyRow>
    )
}

export default Row

const MyRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    text-align: center;
    font-size: .75rem;
`

const Cell = styled.div`
    border: 1px solid #ccc;
    padding: .5rem 1rem;
`