import React from 'react'
import styled from 'styled-components'
import { numberWithCommas } from 'utils/numberFormatting'

const Row = (props) => {

    const { item, itemClass } = props

    const columns = []

    for (const key in item) {

        let valClass
        let theItem = item[key]

        if (key === 'roi') {
            let newVal = theItem.substring(0, theItem.length - 1)
            newVal = Number(newVal)
            if(newVal < 0) {
                valClass = 'neg'
            }
            else {
                valClass = 'pos'
            }
        }

        if (key.match(/^(price|value|totalInvested)$/)) {
            theItem = `$${numberWithCommas(theItem)}`
        }

        columns.push({
            val: theItem,
            valClass: valClass
        })
    }

    

    return (
        <MyRow className={itemClass}>
            {columns.map((newItem) => {
                return (<Cell className={`${itemClass} ${newItem.valClass}`}>
                    {newItem.val}
                </Cell>)
            })}
        </MyRow>
    )
}

export default Row

const MyRow = styled.div`
    display: grid;
    grid-template-columns: repeat(8,1fr);
    font-size: .85rem;

    &.header{
        width: 100%;
        color: rgb(99, 115, 129);
        font-weight: 600;
        // line-height: 1.5rem;
        border-radius: .5rem;
    }
`

const Cell = styled.div`
    // border: 1px solid #ccc;
    display: grid;
    align-content: center;
    justify-content: start;
    width: 100%;
    padding: .5rem 1rem;
    &.header {
        background-color: #F3F6F8;
        height: 100%;

        &:first-of-type {
            border-radius: .5rem 0 0 .5rem;
        }
        &:last-of-type {
            border-radius: 0 .5rem .5rem 0;
        }
    }
    &.neg{
        color: rgb(183, 33, 54);
    }
    &.pos{
        color: rgb(34, 154, 22);
    }

`