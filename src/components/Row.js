import React from 'react'
import styled from 'styled-components'

const Row = (props) => {

    const { item, itemClass } = props

    const columns = []

    for (const key in item) {
        columns.push(item[key])
    }

    return (
        <MyRow className={itemClass}>
            {columns.map(val => {
                return (<Cell className={itemClass}>
                    {val}
                </Cell>)
            })}
        </MyRow>
    )
}

export default Row

const MyRow = styled.div`
    display: grid;
    grid-template-columns: repeat(7,1fr);
    font-size: .75rem;

    &.header{
        width: 100%;
        color: rgb(99, 115, 129);
        font-weight: 600;
        // line-height: 1.5rem;
        border-radius: .5rem;
        text-align: center;
    }
`

const Cell = styled.div`
    // border: 1px solid #ccc;
    display: grid;
    align-content: center;
    justify-content: center;
    width: 100%;
    padding: .5rem 1rem;
    &.header {
        background-color: #F3F6F8;
        height: 100%;
    }
`