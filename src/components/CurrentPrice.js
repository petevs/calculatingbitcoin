import React from 'react'
import NumberFormat from 'react-number-format'
import styled from 'styled-components'

const CurrentPrice = ({ price, priceChange, percentageChange, currency }) => {


    const changeClass = () => {
        if (priceChange < 0) {
            return { class: 'neg', prefix: '' }
        } else {
            return { class: '', prefix: '+' }
        }
    }

    return (
        <PriceDetails>
            <Subhead>
                Current Bitcoin Price ({currency})
            </Subhead>
            <h1>
                <NumberFormat
                    value={price}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                />
            </h1>
            <Change>
                <h5 className={changeClass().class}>
                    <NumberFormat
                        value={priceChange}
                        displayType={'text'}
                        thousandSeparator={true}
                        decimalScale={0}
                        prefix={`${changeClass().prefix}$`}
                    />
                </h5>
                <h5 className={changeClass().class}>
                    (<NumberFormat
                        value={percentageChange}
                        displayType={'text'}
                        decimalScale={2}
                        suffix={'%'}
                    />)
                </h5>
            </Change>
        </PriceDetails>
    )
}

export default CurrentPrice


const PriceDetails = styled.div`
    display: grid;
    grid-auto-flow: row;
    justify-content: start;
    align-items: baseline;
    gap: 0;
    @media (min-width: 768px) {
        padding: .5rem 1rem .5rem 0;
        border-right: 1px solid #E7ECF2;
    } 
    padding: 1rem 1rem;
    & h1 {
        font-size: 2.4rem;
    }
    & h4 {
        color: #F7931C;
    }
    & h5 {
        font-size: 1rem;
        color: #4caf50;
        &.neg {
            // background-color: rgba(244, 67, 54, 0.08);
            color: #FA4336;
        }
        margin-top: -.25rem;
    }
    `

const Subhead = styled.h6`
    font-size: .75rem;
    text-transform: uppercase;
    color: #787b86;
    font-weight: 400;
    padding-top: .5rem;
`


// const Currency = styled.span`
//     font-size: 1rem;
//     padding-left: .15rem;
// `

const Change = styled.div`
    display: grid;
    grid-auto-flow: column;
    justify-content: start;
    gap: .15rem;
`