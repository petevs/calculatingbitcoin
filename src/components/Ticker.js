import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CurrentPrice from 'components/CurrentPrice';
import axios from 'axios'

const Ticker = () => {

    const [dateRange, setDateRange] = useState('24h')
    const [marketData, setMarketData] = useState(null)
    const [priceChange, setPriceChange] = useState(null)
    const [percentageChange, setPercentageChange] = useState(null)
    const [currency, setCurrency] = useState('cad')


    const dateSelectors = [
        { value: '1h' },
        { value: '24h' },
        { value: '7d' },
        { value: '30d' },
        { value: '60d' },
        { value: '200d' },
    ]


    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/bitcoin?localization=cad')
            .then(res => {
                const data = res.data.market_data
                setMarketData(data)
                setPercentageChange(data[`price_change_percentage_${dateRange}_in_currency`][currency])
            })
    }, [dateRange, currency])


    const handleDateChange = (e) => {
        setDateRange(e.target.value)
    }

    useEffect(() => {
        console.log(dateRange)
    }, [dateRange])

    const checkActive = (x) => {
        if (x === dateRange) {
            return 'active'
        }
    }

    if (!marketData) {
        return (<p>Loading...</p>)
    }

    return (
        <MyContainer >
            <Inner>
                <CurrentPrice
                    price={marketData.current_price.cad}
                    priceChange={priceChange}
                    percentageChange={percentageChange}
                />
                <TimeScale>
                    {dateSelectors.map((item) => {
                        return (
                            <button
                                value={item.value}
                                onClick={handleDateChange}
                                className={checkActive(item.value)}
                            >
                                {item.value}
                            </button>
                        )
                    })}
                </TimeScale>
            </Inner>
        </MyContainer>
    )
}

export default Ticker

const MyContainer = styled.div`
    border-bottom: 1px solid #E7ECF2;
    // background-color: #14161F;
    color: #555;
    padding: 0 1rem;
    & *{
        margin: 0;
    }
`

const Inner = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        justify-items: center;
        text-align: center;
        & div {
            justify-items: center;
        }
    }
`

const TimeScale = styled.div`
    display: grid;
    grid-auto-flow: column;
    gap: .25rem;
    border: 1px solid hsla(0,0%,100%,.12);
    border-radius: 5px;
    padding: .25rem;
    & button {
        text-transform: uppercase;
        // color: hsla(0,0%,100%,.5);
        background: none;
        border: none;
        height: 2rem;
        padding: 0 .5rem;
        font-size: .875rem;

        &.active {
            background-color: #F7931C;
            border: none;
            outline: none;
            border-radius: 3px;
            color: #fff;
        }
        &:hover {
            color: #F7931C;
        }
        &:focus{
            background-color: #F7931C;
            border: none;
            outline: none;
            border-radius: 3px;
            color: #fff;
        }
        cursor: pointer;
    }
    @media (max-width: 768px) {
        display: none;
    }
    
`